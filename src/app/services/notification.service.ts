import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ErrorResponse } from '../models/error';

@Injectable()
export class NotificationService {
  notification$ = new Subject();

  constructor() {
  }

  notify(eventType: string, messages: ErrorResponse[]): void {
    this.notification$.next({
      type: eventType,
      messages: messages,
    });
  }

}
