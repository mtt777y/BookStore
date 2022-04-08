using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookStore;
using BookStore.Entities;
using NLog;
using BookStore.Controllers.Abstract;
using Microsoft.AspNetCore.Authorization;
using ILogger = NLog.ILogger;

namespace BookStore.Controllers
{
    [Authorize]
    public class StorageDataController : AbstractController<StorageData>
    {
        public StorageDataController(DbSets dbSets, ILogger logger) : base(dbSets, logger)
        {
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetEntities()
        {
            var smth = _context.Set<StorageData>().Include(x => x.Book);
            return await smth.ToListAsync();
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<object>> PostStorageData([FromBody] StorageDataset data)
        {
            StorageData entity = new() { Qty = data.Qty, Name = "Storage", Book = _context.Set<Book>().Find(data.Book) };

            _context.Set<StorageData>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntity", new { id = entity.Id }, new { id = entity.Id});
        }
    }

    public class StorageDataset
    {
        public int Qty { get; set; }
        public int Book { get; set; }
    }
}
