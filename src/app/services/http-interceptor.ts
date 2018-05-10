import { Injectable} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';


@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService,
    private notificationService: NotificationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const users = [
      {login : 'test@gmail.com', password: 'testtest'},
      {login : 'test2@gmail.com', password: 'aaaaaaaa'},
    ];

    return Observable.of(null).mergeMap(() => {
      if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
        const filteredUsers = users.filter(user => {
          return user.login === request.body.login && user.password === request.body.password;
        });

        if (filteredUsers.length) {
          const user = filteredUsers[0];
          const body = {
            login: user.login,
          };
          return Observable.of({ status: 200, body: body });
        } else {
          const error = {
            success: false,
            results: [],
            errors: [
              { code: 400, message: 'Username or password is incorrect'}
            ]
        };
          this.errorService.addError(error);
          this.notificationService.notify('error', this.errorService.lastErrors(2));
          return Observable.throw(error);
        }
      }
      return next.handle(request);

    });
  }
}
export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: CustomHttpInterceptor,
  multi: true
};

