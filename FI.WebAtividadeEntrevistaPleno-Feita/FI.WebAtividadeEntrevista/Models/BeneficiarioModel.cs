using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebAtividadeEntrevista.Models.Validations;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Beneficiario
    /// </summary>
    public class BeneficiarioModel
    {
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// Cpf
        /// </summary>
        [Required]
        [CpfValidation(ErrorMessage = "CPF Invalido")]
        public string Cpf { get; set; }

        /// <summary>
        /// IdCliente
        /// </summary>
        [Required]
        public long IdCliente { get; set; }

    }
}
