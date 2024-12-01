using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using FITAPI.Domain.DTOs;

namespace FITAPI.Domain.Models
{
    public class Foods
    {
        public long Id { get; init; }
        
        public DateTime LogedAt { get; init; } = DateTime.UtcNow;

        public string UserFoodsJson { get; init; } = string.Empty;

        [NotMapped]
        public ICollection<FoodDto> UserFoods 
        { 
            get =>
                string.IsNullOrEmpty(UserFoodsJson) 
                    ? []
                    : JsonSerializer.Deserialize<List<FoodDto>>(UserFoodsJson) ?? [];
            init => UserFoodsJson = JsonSerializer.Serialize(value);
        }
        
        public required string UserId { get; init; }

        public virtual MyUser User { get; init; }
    }
}