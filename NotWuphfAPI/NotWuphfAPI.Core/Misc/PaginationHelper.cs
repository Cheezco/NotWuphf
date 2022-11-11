using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotWuphfAPI.Core.Misc
{
    public static class PaginationHelper
    {
        public const int DefaultPage = 1;
        public const int DefaultPageSize = 5;
        private const int MaxPageSize = 10;

        public static int CalculateTake(int pageSize)
        {
            var size = CalculatePageSize(pageSize);

            return size <= 0 ? DefaultPage : size;
        }

        public static int CalculateSkip(int pageSize, int page)
        {
            page = page <= 0 ? DefaultPage : page;

            return CalculateTake(pageSize) * (page - 1);
        }

        public static int GetCurrentPage(int totalPages, int page)
        {
            if (page <= 0)
            {
                return DefaultPage;
            }

            return page > totalPages ? totalPages : page;
        }

        public static bool HasNextPage(int totalPages, int currentPage) => currentPage < totalPages;
        
        public static bool HasPreviousPage(int totalPages, int currentPage) => currentPage > 1;

        public static int CalculatePageSize(int pageSize) => Math.Clamp(pageSize, 0, MaxPageSize);
        
        public static int CalculateTotalPages(int pageSize, int elementCount) => (int)Math.Ceiling((double)elementCount / pageSize);
    }
}
