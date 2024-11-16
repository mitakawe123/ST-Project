using FITAPI.Application.Constants;
using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FITAPI.Infrastructure.Configurations.Database;

public class PostsConfiguration : IEntityTypeConfiguration<Posts>
{
    public void Configure(EntityTypeBuilder<Posts> builder)
    {
        builder.ToTable(nameof(Posts).ToLower(), schema: AppConstants.DatabaseConstants.FitapiSchema);
        
        builder.HasKey(x => x.Id);
        
        builder
            .Property(x => x.Content)
            .IsRequired();
        
        builder
            .Property(x => x.Likes)
            .IsRequired();
        
        builder
            .HasOne(p => p.User) 
            .WithMany()           
            .HasForeignKey(p => p.UserId)
            .IsRequired()         
            .OnDelete(DeleteBehavior.Cascade); 
        
        builder
            .HasMany(p => p.Comments)       
            .WithOne(c => c.Post)   
            .HasForeignKey(c => c.PostId)    
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade); 
    }
}