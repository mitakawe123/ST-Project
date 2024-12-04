using System.ComponentModel.DataAnnotations.Schema;
using FITAPI.Domain.Constants.Enums;

namespace FITAPI.Domain.Models;

public class Sleep
{
    public long Id { get; init; }
    
    public DateTime LoggedAt{ get; init; } = DateTime.UtcNow;
    
    public double Hours { get; init; }
    
    public int SleepTypeId { get; init; }

    [NotMapped]
    public SleepType SleepType
    {
        get => (SleepType) SleepTypeId;
        init => SleepTypeId = (int)value;
    }
    
    public string UserId { get; init; }
    
    public virtual MyUser User { get; init; }
}