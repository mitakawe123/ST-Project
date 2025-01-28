using FITAPI.Domain.Constants;
using FITAPI.Domain.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Infrastructure.Configurations.Database
{


    public class WorkoutGoalsConfiguration : IEntityTypeConfiguration<WorkoutGoals>
    {
        public void Configure(EntityTypeBuilder<WorkoutGoals> builder)
        {
            builder.ToTable(nameof(WorkoutGoals).ToLower(), schema: AppConstants.Database.Schema);

            builder.HasKey(w => w.Id);

            builder
                .Property(w => w.GoalName)
                .IsRequired();

            builder
                .Property(w => w.GoalDescription)
                .IsRequired();

            builder
                .Property(w => w.GoalsJson)
                .HasColumnName("Goals")
                .HasColumnType("jsonb");

            builder
                .HasOne(w => w.User)
                .WithMany()
                .HasForeignKey(w => w.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}

