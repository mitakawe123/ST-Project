using System.Text.Json.Serialization;

namespace FITAPI.Domain.DTOs;

public record FoodDto
{
    [JsonPropertyName("food_name")]
    public string FoodName { get; init; } = default!;
    
    [JsonPropertyName("brand_name")]
    public string BrandName { get; init; } = default!;
    
    [JsonPropertyName("serving_qty")]
    public int ServingQty { get; init; }
    
    [JsonPropertyName("serving_weight_grams")]
    public double ServingWeightGrams { get; init; }
    
    [JsonPropertyName("nf_calories")]
    public double NfCalories { get; init; }
    
    [JsonPropertyName("nf_total_fat")]
    public double NfTotalFat { get; init; }
    
    [JsonPropertyName("nf_saturated_fat")]
    public double NfSaturatedFat { get; init; }
    
    [JsonPropertyName("nf_cholesterol")]
    public double NfCholesterol { get; init; }
    
    [JsonPropertyName("nf_sodium")]
    public double Sodium { get; init; }

    [JsonPropertyName("nf_total_carbohydrate")]
    public double TotalCarbohydrate { get; init; }

    [JsonPropertyName("nf_dietary_fiber")]
    public double DietaryFiber { get; init; }

    [JsonPropertyName("nf_sugars")]
    public double Sugars { get; init; }

    [JsonPropertyName("nf_protein")]
    public double Protein { get; init; }

    [JsonPropertyName("nf_potassium")]
    public double Potassium { get; init; }
    
    public FoodSearchPhotoResponse Photo { get; init; } = default!;
}

public record FoodSearchPhotoResponse
{
    public string Thumb { get; init; } = default!;
    
    public string Highres { get; init; } = default!;
}