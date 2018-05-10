import { ErrorResponse } from './error';

export interface FakeResponse {
  success: boolean;
  results: any[];
  errors: ErrorResponse[];
}
