using Microsoft.EntityFrameworkCore;
using WebApplication2.Models;
using WebApplication2.Repos;

namespace WebApplication2.Data;

public class E2SContext : DbContext{
    public E2SContext(DbContextOptions<E2SContext> options)
        : base(options){
    }

    public virtual DbSet<User> Users{ get; set; } = null!;
    public virtual DbSet<Authority> Authorities{ get;set; } = null!;
    public virtual DbSet<UserToken> UserTokens{ get; set; } = null!;

    public virtual DbSet<BlacklistToken> BlacklistTokens { get; set; } = null!;
    public virtual DbSet<Organisation> Organisations{ get; set; } = null!;
    public virtual DbSet<EmailLink> EmailLinks{ get; set; } = null!;
    public virtual DbSet<PowerData> PowerDatas{ get; set; } = null!;
    public virtual DbSet<Insight> Insights{ get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<User>().ToTable("users");
        modelBuilder.Entity<Authority>().ToTable("authorities");
        modelBuilder.Entity<UserToken>().ToTable("usertokens");
        modelBuilder.Entity<Organisation>().ToTable("organisations");
        modelBuilder.Entity<PowerData>().ToTable("powerdata");
        modelBuilder.Entity<Insight>().ToTable("insights");
    }
}
