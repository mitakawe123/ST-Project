export interface Food {
	food_name: string;
	brand_name: string;
	serving_qty: number;
	serving_weight_grams: number;
	nf_calories: number;
	nf_total_fat: number;
	nf_saturated_fat: number;
	nf_cholesterol: number;
	nf_sodium: number;
	nf_total_carbohydrate: number;
	nf_dietary_fiber: number;
	nf_sugars: number;
	nf_protein: number;
	nf_potassium: number;
	photo: FoodSearchPhotoResponse;
}

interface FoodSearchPhotoResponse {
	thumb: string;
	highres: string;
}
