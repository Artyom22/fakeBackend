import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

   login(data: { login: string, password: string }): Promise<any> {
    return this.http.post('http://localhost:4200/api/authenticate', data).toPromise();
  }
}
