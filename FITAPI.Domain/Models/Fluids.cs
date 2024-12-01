using System.ComponentModel.DataAnnotations.Schema;
using FITAPI.Domain.Constants.Enums;

namespace FITAPI.Domain.Models;

public class Fluids
{
    public long Id { get; init; }
    
    public DateTime LoggedAt { get; init; } = DateTime.UtcNow;
    
    public double Amount { get; init; }
    
    public int FluidTypeId { get; init; }

    [NotMapped]
    public FluidType FluidType
    {
        get => (FluidType)FluidTypeId; 
        init => FluidTypeId = (int)value;
    }
    
    public string UserId { get; init; }
    
    public virtual MyUser User { get; init; }
}