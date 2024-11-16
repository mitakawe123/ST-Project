﻿using Microsoft.AspNetCore.Identity;

namespace FITAPI.Domain.Models;

public class MyUser : IdentityUser
{
    public string? AvatarImg { get; init; }
}