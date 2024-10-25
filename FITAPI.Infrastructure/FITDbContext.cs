using FITAPI.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FITAPI.Infrastructure;

public class FITDbContext : IdentityDbContext<MyUser>
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