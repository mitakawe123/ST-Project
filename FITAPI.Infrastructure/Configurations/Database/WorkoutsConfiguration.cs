using FITAPI.Domain.Constants;
using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FITAPI.Infrastructure.Configurations.Database;

public class WorkoutsConfiguration : IEntityTypeConfiguration<Workouts>
{
    public void Configure(EntityTypeBuilder<Workouts> builder)
    {
        builder.ToTable(nameof(Workouts).ToLower(), schema: AppConstants.Database.Schema);

        builder.HasKey(w => w.Id); 

        builder
            .Property(w => w.Name)
            .IsRequired();
        
        builder
            .Property(w => w.Description)
            .IsRequired();

        builder
            .Property(w => w.ExercisesJson)
            .HasColumnName("Exercises")
            .HasColumnType("jsonb"); 

        builder
            .HasOne(w => w.User) 
            .WithMany()           
            .HasForeignKey(w => w.UserId)
            .IsRequired()         
            .OnDelete(DeleteBehavior.Cascade); 
    }
}