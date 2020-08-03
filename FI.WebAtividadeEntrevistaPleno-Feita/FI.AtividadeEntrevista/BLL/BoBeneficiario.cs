using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FI.AtividadeEntrevista.BLL
{
    public class BoBeneficiario
    {
        /// <summary>
        /// Inclui um novo Beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de Beneficiario</param>
        public long Incluir(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario bnf = new DAL.DaoBeneficiario();
            return bnf.Incluir(beneficiario);
        }

        /// <summary>
        /// Altera um beneficiario
        /// </summary>
        /// <param name="beneficiario">Objeto de beneficiario</param>
        public void Alterar(DML.Beneficiario beneficiario)
        {
            DAL.DaoBeneficiario bnf = new DAL.DaoBeneficiario();
            bnf.Alterar(beneficiario);
        }

        /// <summary>
        /// Consulta o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public DML.Beneficiario Consultar(long id)
        {
            DAL.DaoBeneficiario bnf = new DAL.DaoBeneficiario();
            return bnf.Consultar(id);
        }

        /// <summary>
        /// Excluir o beneficiario pelo id
        /// </summary>
        /// <param name="id">id do beneficiario</param>
        /// <returns></returns>
        public void Excluir(long id)
        {
            DAL.DaoBeneficiario bnf = new DAL.DaoBeneficiario();
            bnf.Excluir(id);
        }

        /// <summary>
        /// Lista os beneficiario
        /// </summary>
        public List<DML.Beneficiario> Listar(long IdCliente)
        {
            DAL.DaoBeneficiario bnf = new DAL.DaoBeneficiario();
            return bnf.Listar(IdCliente);
        }

        /// <summary>
        /// VerificaExistencia
        /// </summary>
        /// <param name="CPF"> do beneficiario </param>
        /// <returns></returns>
        public bool VerificarExistencia(string CPF, long idCliente)
        {
            DAL.DaoBeneficiario bnf = new DAL.DaoBeneficiario();
            return bnf.VerificarExistencia(CPF,idCliente);
        }
    }
}
