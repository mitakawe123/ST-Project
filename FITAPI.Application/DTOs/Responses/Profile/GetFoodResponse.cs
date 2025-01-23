using FITAPI.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.DTOs.Responses.Profile;

public record GetFoodResponse(DateTime LoggedAt,
    ICollection<FoodDto> Foods);

public record GetFoodDto(long Id,
    DateTime LoggedAt,
    ICollection<FoodDto> UserFoods);
