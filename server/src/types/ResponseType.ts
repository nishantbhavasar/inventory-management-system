export interface ResponseType<T = any> {
  message: string;
  success: boolean;
  data: T;
  statusCode: number;
}
