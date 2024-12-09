export default interface ResponseData {
  ok: boolean;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  pagination: {
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
  };
}
