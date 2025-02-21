export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message || 'Can not authorize user');
    this.name = 'UnauthorizedError';
  }
}