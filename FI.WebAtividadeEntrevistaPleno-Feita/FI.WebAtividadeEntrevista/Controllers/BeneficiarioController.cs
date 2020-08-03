using FI.AtividadeEntrevista.BLL;
using FI.AtividadeEntrevista.DML;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;
using WebAtividadeEntrevista.Models;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        // GET: Beneficiario
        public ActionResult Index()
        {
            return View();
        }

        // GET: Beneficiario/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Beneficiario/Create
        public ActionResult Incluir()
        {
            return View();
        }

        // POST: Beneficiario/Create
        [HttpPost]
        public JsonResult Incluir(BeneficiarioModel model)
        {
            BoBeneficiario bob = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {   
                if (bob.VerificarExistencia(model.Cpf, model.IdCliente))
                {
                    Response.StatusCode = 400;
                    return Json("CPF já cadastrado");
                }

                model.Id = bob.Incluir(new Beneficiario() 
                {
                    Nome = model.Nome,
                    Cpf = model.Cpf,
                    IdCliente = model.IdCliente
                });

                return Json("Beneficiario cadastrado com sucesso");
            }
            
        }

        // GET: Beneficiario/Edit/5
        public JsonResult Alterar(BeneficiarioModel model)
        {
            BoBeneficiario bob = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                bob.Alterar(new FI.AtividadeEntrevista.DML.Beneficiario()
                {
                    Id = model.Id,
                    Nome = model.Nome,
                    Cpf = model.Cpf
                });

                return Json("Beneficiario alterado com sucesso");
            }
        }

        // POST: Beneficiario/Edit/5
        [HttpGet]
        public ActionResult Alterar(long id)
        {
            BoBeneficiario bob = new BoBeneficiario();
            Beneficiario beneficiario = bob.Consultar(id);
            Models.BeneficiarioModel model = null;

            if (beneficiario != null)
            {
                model = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Nome = beneficiario.Nome,
                    Cpf = beneficiario.Cpf
                };
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult Lista(long IdCliente)
        {
            BoBeneficiario bob = new BoBeneficiario();
            List<BeneficiarioModel> beneficiarioModels = new List<BeneficiarioModel>();
            List<Beneficiario> beneficiarios = bob.Listar(IdCliente);

            foreach (Beneficiario beneficiario in beneficiarios)
            {
                BeneficiarioModel beneficiarioModel = new BeneficiarioModel()
                {
                    Id = beneficiario.Id,
                    Nome = beneficiario.Nome,
                    Cpf = beneficiario.Cpf
                };
                beneficiarioModels.Add(beneficiarioModel);
            }

            return Json(beneficiarioModels);
        }

        
        // POST: Beneficiario/Delete/5
        [HttpDelete]
        public JsonResult Deletar(long id)
        {
            BoBeneficiario bob = new BoBeneficiario();
            bob.Excluir(id);

            return Json("Exxluido! com sucesso");
        }
    }
}
