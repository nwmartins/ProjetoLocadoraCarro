using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace LocadoraAPI.Models
{
    public partial class locVeiculosContext : DbContext
    {
        public locVeiculosContext()
        {
        }

        public locVeiculosContext(DbContextOptions<locVeiculosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<Locacao> Locacao { get; set; }
        public virtual DbSet<Marca> Marca { get; set; }
        public virtual DbSet<Tipo> Tipo { get; set; }
        public virtual DbSet<Veiculo> Veiculo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Server=localhost;Database=locVeiculos;Port=5432;User Id=postgres;Password=postgres;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.ToTable("cliente");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Cpf)
                    .IsRequired()
                    .HasColumnName("cpf")
                    .HasMaxLength(11);

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasMaxLength(60);

                entity.Property(e => e.Endereco)
                    .HasColumnName("endereco")
                    .HasMaxLength(100);

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasColumnName("nome")
                    .HasMaxLength(100);

                entity.Property(e => e.Rg)
                    .IsRequired()
                    .HasColumnName("rg")
                    .HasMaxLength(20);

                entity.Property(e => e.Telefone)
                    .HasColumnName("telefone")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Locacao>(entity =>
            {
                entity.ToTable("locacao");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DtEntrega)
                    .HasColumnName("dt_entrega")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.DtLocacao)
                    .HasColumnName("dt_locacao")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.IdCliente).HasColumnName("id_cliente");

                entity.Property(e => e.IdVeiculo).HasColumnName("id_veiculo");

                entity.Property(e => e.Valor)
                    .HasColumnName("valor")
                    .HasColumnType("numeric(15,2)");

                entity.HasOne(d => d.IdClienteNavigation)
                    .WithMany(p => p.Locacao)
                    .HasForeignKey(d => d.IdCliente)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("locacao_id_cliente_fkey");

                entity.HasOne(d => d.IdVeiculoNavigation)
                    .WithMany(p => p.Locacao)
                    .HasForeignKey(d => d.IdVeiculo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("locacao_id_veiculo_fkey");
            });

            modelBuilder.Entity<Marca>(entity =>
            {
                entity.ToTable("marca");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(60);
            });

            modelBuilder.Entity<Tipo>(entity =>
            {
                entity.ToTable("tipo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(100);

                entity.Property(e => e.QtRodas).HasColumnName("qt_rodas");
            });

            modelBuilder.Entity<Veiculo>(entity =>
            {
                entity.ToTable("veiculo");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Ano).HasColumnName("ano");

                entity.Property(e => e.Chassi)
                    .IsRequired()
                    .HasColumnName("chassi")
                    .HasMaxLength(17);

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasColumnName("descricao")
                    .HasMaxLength(100);

                entity.Property(e => e.IdMarca).HasColumnName("id_marca");

                entity.Property(e => e.IdTipo).HasColumnName("id_tipo");

                entity.Property(e => e.Placa)
                    .IsRequired()
                    .HasColumnName("placa")
                    .HasMaxLength(7);

                entity.HasOne(d => d.IdMarcaNavigation)
                    .WithMany(p => p.Veiculo)
                    .HasForeignKey(d => d.IdMarca)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("veiculo_id_marca_fkey");

                entity.HasOne(d => d.IdTipoNavigation)
                    .WithMany(p => p.Veiculo)
                    .HasForeignKey(d => d.IdTipo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("veiculo_id_tipo_fkey");
            });
        }
    }
}
