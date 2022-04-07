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
    
    public class BooksController : AbstractController<Book>
    {
        public BooksController(DbSets dbSets, ILogger logger) : base(dbSets, logger)
        {
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<object>> PostBook([FromBody] BookData data)
        {

            Book entity = new() { Name = data.EntityName, Genre = data.BookGenre, Author = data.BookAuthor, ISBN = data.BookISBN };

            _context.Set<Book>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntity", new { id = entity.Id }, entity);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetEntities()
        {
            return await _context.Set<Book>().ToListAsync();
        }
    }

    public class BookData
    {
        public string EntityName { get; set; }
        public string BookGenre { get; set; }
        public string BookAuthor { get; set; }
        public string BookISBN { get; set; }
    }
}