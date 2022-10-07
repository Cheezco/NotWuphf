using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NotWuphfAPI.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Infrastructure
{
    public static class Dependencies
    {
        public static void ConfigureServices(IConfiguration configuration, IServiceCollection services)
        {
            var useOnlyInMemoryDatabase = false;
            if (configuration["useOnlyInMemoryDatabase"] is not null)
            {
                useOnlyInMemoryDatabase = bool.Parse(configuration["useOnlyInMemoryDatabase"]);
            }

            if (useOnlyInMemoryDatabase)
            {
                services.AddDbContext<MainContext>(x =>
                    x.UseInMemoryDatabase("Main"));
            }
            else
            {
                throw new NotImplementedException();
            }
        }
    }
}
