using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;

namespace WebApplication2.Data;

public class E2SContext : DbContext{
    public E2SContext(DbContextOptions<E2SContext> options)
        : base(options){
    }

    public virtual DbSet<User> Users{ get; set; } = null!;
    public virtual DbSet<Authority> Authorities{ get;set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<User>().ToTable("Users")
            .HasOne(a => a.Authority)
            .WithOne()
            .HasForeignKey<User>(x => x.AuthorityId);

        modelBuilder.Entity<Authority>().ToTable("Authorities");
    }
}
