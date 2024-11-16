using FITAPI.Domain.Constants;
using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FITAPI.Infrastructure.Configurations.Database;

public class CommentsConfiguration : IEntityTypeConfiguration<Comments>
{
    public void Configure(EntityTypeBuilder<Comments> builder)
    {
        builder.ToTable(nameof(Comments).ToLower(), schema: AppConstants.DatabaseConstants.FitapiSchema);
        
        builder.HasKey(x => x.Id);
        
        builder
            .Property(x => x.Content)
            .IsRequired();
        
        builder
            .HasOne(x => x.User)
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);
        
        builder
            .HasOne(x => x.Post)
            .WithMany()
            .HasForeignKey(x => x.PostId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Restrict);
    }
}