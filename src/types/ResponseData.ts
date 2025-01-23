export default interface ResponseData<T> {
  ok: boolean;
  message: string;
  data?: T;
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}
