import { Injectable } from '@angular/core';
import { ErrorResponse } from '../models/error';
import { FakeResponse } from '../models/response';

@Injectable()
export class ErrorService {
  private errors: ErrorResponse[] = [];

  constructor() {
  }

  lastErrors(count: number): ErrorResponse[] {
    const msgsLength = this.errors.length;
    return count > msgsLength ? this.errors
      : this.errors.slice(msgsLength - count, msgsLength);
  }

  addError(error: FakeResponse): void {
    this.errors.push(...error.errors);
  }
}
