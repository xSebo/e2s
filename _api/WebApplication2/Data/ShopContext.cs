using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

namespace WebApplication2.Data;

public class ShopContext : DbContext{
    public ShopContext(DbContextOptions<ShopContext> options)
        : base(options){
    }

    public virtual DbSet<Customer> Customers{ get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<Customer>().ToTable("Customers");
    }
}
