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
            public string Name { get; set; }
        }

        public class User : DbObjs
        {
            [Required]
            public DateTime DateBirth { get; set; }
        }

        public class Book : DbObjs
    {
            [Required]
            public Owner Owner { get; set; }

            public float Weight { get; set; }

            public float Growth { get; set; }

            public float Leght { get; set; }
        }

        public class Owner : DbObjs
    {
        }
}
