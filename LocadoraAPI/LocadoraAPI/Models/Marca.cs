using System;
using System.Collections.Generic;

namespace LocadoraAPI.Models
{
    public partial class Marca
    {
        public Marca()
        {
            Veiculo = new HashSet<Veiculo>();
        }

        public int Id { get; set; }
        public string Descricao { get; set; }

        public ICollection<Veiculo> Veiculo { get; set; }
    }
}
