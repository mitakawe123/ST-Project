using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Infrastructure;

public class FitDbContext : IdentityDbContext<MyUser>
{
    public DbSet<Workouts> Workouts { get; init; }

    public FitDbContext()
    {
    }

    public FitDbContext(DbContextOptions<FitDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfigurationsFromAssembly(typeof(FitDbContext).Assembly);
    }
}