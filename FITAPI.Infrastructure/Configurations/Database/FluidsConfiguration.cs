using FITAPI.Domain.Constants;
using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FITAPI.Infrastructure.Configurations.Database;

public class FluidsConfiguration : IEntityTypeConfiguration<Fluids>
{
    public void Configure(EntityTypeBuilder<Fluids> builder)
    {
        builder.ToTable(nameof(Fluids).ToLower(), schema: AppConstants.DatabaseConstants.FitapiSchema);
        
        builder.HasKey(x => x.Id);

        builder.HasIndex(x => x.LoggedAt);
        
        builder
            .HasOne(f => f.User)
            .WithMany()
            .HasForeignKey(f => f.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
    }
}