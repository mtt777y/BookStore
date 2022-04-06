using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BookStore.Entities;

namespace BookStore
{
    public class DbSets : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder contextOptionsBuilder)
        {
            contextOptionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS;DataBase = Dogs; User ID=sa;Password=sa;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            //base.OnConfiguring(contextOptionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // использование Fluent API
            //modelBuilder.Entity<Word>().HasIndex(u => u.Value).IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
