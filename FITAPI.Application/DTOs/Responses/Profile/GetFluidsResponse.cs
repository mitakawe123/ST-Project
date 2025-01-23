using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FITAPI.Application.DTOs.Responses.Profile;

public record GetFluidsResponse(
    DateTime LoggedAt,
    ICollection<Fluid> Fluids);

public record Fluid(
    long Id,
    double Amount,
    int FluidTypeId);
