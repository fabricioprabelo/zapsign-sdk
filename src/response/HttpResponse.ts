export type HttpResponse<T = any> = {
  status: number;
  response: T;
};
