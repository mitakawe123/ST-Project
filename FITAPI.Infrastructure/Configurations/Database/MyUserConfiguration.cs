using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FITAPI.Infrastructure.Configurations.Database;

public class MyUserConfiguration : IEntityTypeConfiguration<MyUser>
{
    public void Configure(EntityTypeBuilder<MyUser> builder)
    {
        builder
            .HasIndex(x => x.Email)
            .HasMethod("hash");
    }
}