using Microsoft.EntityFrameworkCore;

namespace FITAPI.Infrastructure;

public class FITDbContext : DbContext
{
    public FITDbContext()
    {
    }

    public FITDbContext(DbContextOptions<FITDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        //Add config here
        base.OnModelCreating(modelBuilder);
    }
}