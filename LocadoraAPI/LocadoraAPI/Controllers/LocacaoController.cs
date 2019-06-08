using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LocadoraAPI.Models;

namespace LocadoraAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocacaoController : ControllerBase
    {
        private readonly locVeiculosContext _context;

        public LocacaoController(locVeiculosContext context)
        {
            _context = context;
        }

        // GET: api/Locacao
        [HttpGet]
        public IEnumerable<Locacao> GetLocacao()
        {
            return _context.Locacao;
        }

        // GET: api/Locacao/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var locacao = await _context.Locacao.FindAsync(id);

            if (locacao == null)
            {
                return NotFound();
            }

            return Ok(locacao);
        }

        // PUT: api/Locacao/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocacao([FromRoute] int id, [FromBody] Locacao locacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != locacao.Id)
            {
                return BadRequest();
            }

            _context.Entry(locacao).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocacaoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(locacao);
        }

        // POST: api/Locacao
        [HttpPost]
        public async Task<IActionResult> PostLocacao([FromBody] Locacao locacao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Locacao.Add(locacao);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocacao", new { id = locacao.Id }, locacao);
        }

        // DELETE: api/Locacao/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocacao([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var locacao = await _context.Locacao.FindAsync(id);
            if (locacao == null)
            {
                return NotFound();
            }

            _context.Locacao.Remove(locacao);
            await _context.SaveChangesAsync();

            return Ok(locacao);
        }

        private bool LocacaoExists(int id)
        {
            return _context.Locacao.Any(e => e.Id == id);
        }
    }
}