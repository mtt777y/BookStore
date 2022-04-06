using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NLog;
using Microsoft.AspNetCore.Authorization;
using BookStore.Entities;
using ILogger = NLog.ILogger;

namespace BookStore.Controllers.Abstract
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AbstractController<T> : ControllerBase where T : DbObjs, new()
    {
        protected DbSets _context;
        protected ILogger _logger;

        public AbstractController(DbSets dbSets, ILogger logger)
        {
            _context = dbSets;
            _logger = logger;
            _logger.Info("Controller running....");
        }

        // GET: api/....
        [HttpGet]
        public async Task<ActionResult<IEnumerable<T>>> GetEntities()
        {
            return await _context.Set<T>().ToListAsync();
        }

        // GET: api/..../5
        [HttpGet("{id}")]
        public async Task<ActionResult<T>> GetEntity(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);

            if (entity == null)
            {
                return NotFound();
            }

            return entity;
        }

        // POST: api/Countries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<T>> PostCountry([FromBody] string entityName)
        {

            T entity = new T() { Name = entityName };

            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntity", new { id = entity.Id }, entity);
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null)
            {
                return NotFound();
            }

            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

}

