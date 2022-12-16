export default interface PaginationHeader {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  previousPageLink: string | undefined;
  nextPageLink: string | undefined;
}
