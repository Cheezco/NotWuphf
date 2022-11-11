﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NotWuphfAPI.Infrastructure.Data;
using NotWuphfAPI.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using NotWuphfAPI.Core.Auth;
using NotWuphfAPI.Core.Auth.Model;

namespace NotWuphfAPI.Infrastructure
{
    public static class Dependencies
    {
        public static void ConfigureServices(IConfiguration configuration, IServiceCollection services)
        {
            var useOnlyInMemoryDatabase = false;
            if (configuration["useOnlyInMemoryDatabase"] is not null)
            {
                useOnlyInMemoryDatabase = bool.Parse(configuration["useOnlyInMemoryDatabase"] ?? "false");
            }

            if (useOnlyInMemoryDatabase)
            {
                services.AddDbContext<MainContext>(x =>
                    x.UseInMemoryDatabase("Main"));
            }
            else
            {
                services.AddDbContext<MainContext>(x =>
                     x.UseNpgsql(@"Host=localhost;Username=postgres;Password=root;Database=postgres"));
            }

            services
                .AddScoped(typeof(IRepository<>), typeof(EfRepository<>))
                .AddTransient<IJwtTokenService, JwtTokenService>()
                .AddScoped<AuthDbSeeder>()
                .AddSingleton<IAuthorizationHandler, ResourceOwnerAuthorizationHandler>();

            services.AddAuthorization(options =>
            {
                options.AddPolicy(PolicyNames.ResourceOwner,
                    policy => policy.Requirements.Add(new ResourceOwnerRequirement()));
            });


            services
                .AddIdentity<WuphfUser, IdentityRole>()
                .AddEntityFrameworkStores<MainContext>()
                .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters.ValidAudience = configuration["jwt:ValidAudience"];
                    options.TokenValidationParameters.ValidIssuer = configuration["jwt:ValidIssuer"];
                    options.TokenValidationParameters.IssuerSigningKey =
                        new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["jwt:Secret"]));
                });
        }
    }
}
