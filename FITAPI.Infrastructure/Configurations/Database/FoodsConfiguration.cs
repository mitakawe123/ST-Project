using FITAPI.Domain.Constants;
using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FITAPI.Infrastructure.Configurations.Database;

public class FoodsConfiguration : IEntityTypeConfiguration<Foods>
{
    public void Configure(EntityTypeBuilder<Foods> builder)
    {
        builder.ToTable(nameof(Foods).ToLower(), schema: AppConstants.Database.Schema);
        
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.LoggedAt);
        
        builder.Property(f => f.UserFoodsJson)
            .HasColumnType("jsonb")
            .HasDefaultValue(string.Empty); 
        
        builder
            .HasOne(f => f.User)
            .WithMany()
            .HasForeignKey(f => f.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}