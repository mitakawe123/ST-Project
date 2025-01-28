using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Infrastructure;

public class FitDbContext : IdentityDbContext<MyUser>
{
    public DbSet<Workouts> Workouts { get; init; }
    
    public DbSet<WorkoutGoals> WorkoutGoals { get; init; }

    public DbSet<Posts> Posts { get; init; }

    public DbSet<MyUser> Users { get; init; }

    public DbSet<Comments> Comments { get; init; }
    
    public DbSet<Foods> Foods { get; init; }
    
    public DbSet<Fluids> Fluids { get; init; }
    
    public DbSet<Sleep> Sleep { get; init; }

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
        //modelBuilder.Entity<WorkoutGoals>()
        //       .HasOne(wg => wg.User)  
        //       .WithMany(u => u.WorkoutGoals)  
        //       .HasForeignKey(wg => wg.UserId);  
    }


}