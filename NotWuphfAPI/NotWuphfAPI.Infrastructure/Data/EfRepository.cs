using Ardalis.Specification;
using Ardalis.Specification.EntityFrameworkCore;
using NotWuphfAPI.Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Infrastructure.Data
{
    public class EfRepository<T> : RepositoryBase<T>, IRepository<T> where T : class
    {
        public EfRepository(MainContext dbContext) : base(dbContext)
        {

        }
    }
}
