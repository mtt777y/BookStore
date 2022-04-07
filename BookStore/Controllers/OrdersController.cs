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
    public class OrdersController : AbstractController<Order>
    {
        public OrdersController(DbSets dbSets, ILogger logger) : base(dbSets, logger)
        {
        }

        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetEntities()
        {
            var smth = _context.Set<Order>().Include(x => x.User).Include(x => x.Books).Select(x => new { x.OrderDate, x.User, x.Books.Count, x.Id });
            return await smth.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<object>> PostBook([FromBody] OrderData data)
        {
            List<Book> tmpBook = new List<Book>();
            foreach (int pk in data.Books)
            {
                tmpBook.Add(_context.Set<Book>().Find(pk));
            }

            Order entity = new() { OrderDate = DateTime.Now, Books = tmpBook, Name = "Book Order", User = _context.Set<User>().Where(r => r.Name == data.Username).FirstOrDefault() };

            _context.Set<Order>().Add(entity);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEntity", new { id = entity.Id }, new { id = entity.Id, entity.OrderDate, entity.User, entity.Books.Count });
        }
    }

    public class OrderData
    {
        public List<int> Books { get; set; }
        public string Username { get; set; }
    }

    //public class OrderTransferData
    //{
    //    public DateTime OrderDate { get; set; }
    //    public int Id { get; set; }
    //    public User User { get; set; }
    //    public int BookCount { get; set; }
    //}
}