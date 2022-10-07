using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Misc
{
    public class PaginationHelper
    {
        public const int DefaultPage = 1;
        public const int DefaultPageSize = 10;

        public static int CalculateTake(int pageSize)
        {
            return pageSize <= 0 ? DefaultPageSize : pageSize;
        }

        public static int CalculateSkip(int pageSize, int page)
        {
            page = page <= 0 ? DefaultPage : page;

            return CalculateTake(pageSize) * (page - 1);
        }
    }
}
