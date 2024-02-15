export class ApiResponse {
  constructor(
    public statusCode: number,
    public data: object,
    public message: string = "Success",
    public success?: boolean
  ) {
    (this.statusCode = statusCode),
      (this.data = data),
      (this.message = message);
    this.success = statusCode < 400;
  }
}
