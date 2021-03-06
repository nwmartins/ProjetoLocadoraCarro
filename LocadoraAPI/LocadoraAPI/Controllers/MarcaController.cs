﻿using System;
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
    public class MarcaController : ControllerBase
    {
        private readonly locVeiculosContext _context;

        public MarcaController(locVeiculosContext context)
        {
            _context = context;
        }

        // GET: api/Marca
        [HttpGet]
        public IEnumerable<Marca> GetMarca()
        {
            return _context.Marca;
        }

        // GET: api/Marca/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMarca([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var marca = await _context.Marca.FindAsync(id);

            if (marca == null)
            {
                return NotFound();
            }

            return Ok(marca);
        }

        // PUT: api/Marca/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMarca([FromRoute] int id, [FromBody] Marca marca)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != marca.Id)
            {
                return BadRequest();
            }

            _context.Entry(marca).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MarcaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(marca);
        }

        // POST: api/Marca
        [HttpPost]
        public async Task<IActionResult> PostMarca([FromBody] Marca marca)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Marca.Add(marca);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMarca", new { id = marca.Id }, marca);
        }

        // DELETE: api/Marca/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMarca([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var marca = await _context.Marca.FindAsync(id);
            if (marca == null)
            {
                return NotFound();
            }

            _context.Marca.Remove(marca);
            await _context.SaveChangesAsync();

            return Ok(marca);
        }

        private bool MarcaExists(int id)
        {
            return _context.Marca.Any(e => e.Id == id);
        }
    }
}