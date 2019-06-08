using System;
using System.Collections.Generic;

namespace LocadoraAPI.Models
{
    public partial class Locacao
    {
        public int Id { get; set; }
        public int IdCliente { get; set; }
        public int IdVeiculo { get; set; }
        public decimal Valor { get; set; }
        public DateTime? DtLocacao { get; set; }
        public DateTime? DtEntrega { get; set; }

        public Cliente IdClienteNavigation { get; set; }
        public Veiculo IdVeiculoNavigation { get; set; }
    }
}
