export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: any;

  constructor(status: number, message: string, code?: string, errors?: any) {
    super(message);
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}
