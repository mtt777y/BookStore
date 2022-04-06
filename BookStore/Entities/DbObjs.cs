using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Entities
{
    public abstract class DbObjs
    {
        public int Id { get; set; }

        [MaxLength(200), Required]
        public string? Name { get; set; }
    }

    public class Role : DbObjs
    {

    }

    public class User : DbObjs
    {
        [Required]
        public string? Password { get; set; }

        [Required]
        public Role? Role { get; set; }
    }

    public class Book : DbObjs
    {
        public string? Password { get; set; }
        public string? ISBN { get; set; }
        public string? Author { get; set; }
        public string? Genre { get; set; }

        public virtual ICollection<Order>? Orders { get; set; }
    }

    public class Order : DbObjs
    {
        public DateTime? OrderDate { get; set; }

        public User? User { get; set; }

        public virtual ICollection<Book>? Books { get; set; }
    }

    //public class BooksOfOrder
    //{
    //    public int Id { get; set; }

    //    public Order? BookId { get; set; }

    //    public Book? OrderId { get; set; }
    //}
}
