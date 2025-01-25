using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.DTOs.Requests.Profile
{
    public record LoggedFoodByDateRequest([FromQuery] string Email, [FromQuery] DateTime? Date = null);
}