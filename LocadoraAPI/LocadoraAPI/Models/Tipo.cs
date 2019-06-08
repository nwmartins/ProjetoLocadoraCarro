using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace LocadoraAPI.Models
{
    public partial class Tipo
    {
        public Tipo()
        {
            Veiculo = new HashSet<Veiculo>();
        }

        public int Id { get; set; }
        public string Descricao { get; set; }
        public short QtRodas { get; set; }
        [JsonIgnore]
        public ICollection<Veiculo> Veiculo { get; set; }
    }
}
