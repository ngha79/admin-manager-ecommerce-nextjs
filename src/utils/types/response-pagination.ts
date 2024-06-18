export interface IResponsePagination {
  data: any[];
  lastPage: number;
  prevPage: number | null;
  nextPage: number | null;
  curPage?: number;
}
