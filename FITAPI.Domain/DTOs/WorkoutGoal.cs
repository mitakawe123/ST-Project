using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Domain.DTOs
{
    public record WorkoutGoal(string GoalName, string GoalDescripiton, ushort GoalSets, ushort GoalReps, ushort GoalWeight)
    {
        public string GoalName { get; set; }
        public string GoalDescription { get; set; }
        public ushort GoalSets { get; set; }
        public ushort GoalReps { get; set; }
        public ushort GoalWeight { get; set; }

    }
}
