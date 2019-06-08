﻿using System;
using System.Collections.Generic;

namespace LocadoraAPI.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Locacao = new HashSet<Locacao>();
        }

        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cpf { get; set; }
        public string Rg { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Endereco { get; set; }

        public ICollection<Locacao> Locacao { get; set; }
    }
}
