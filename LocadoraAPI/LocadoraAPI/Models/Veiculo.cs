using System;
using System.Collections.Generic;

namespace LocadoraAPI.Models
{
    public partial class Veiculo
    {
        public Veiculo()
        {
            Locacao = new HashSet<Locacao>();
        }

        public int Id { get; set; }
        public string Descricao { get; set; }
        public string Placa { get; set; }
        public string Chassi { get; set; }
        public int IdTipo { get; set; }
        public int IdMarca { get; set; }
        public int Ano { get; set; }

        public Marca IdMarcaNavigation { get; set; }
        public Tipo IdTipoNavigation { get; set; }
        public ICollection<Locacao> Locacao { get; set; }
    }
}
