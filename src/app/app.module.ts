import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, appComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { fakeBackendProvider } from './services/http-interceptor';
import { NotificationService } from './services/notification.service';
import { ErrorService } from './services/error.service';
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    appComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    NotificationService,
    AuthService,
    ErrorService,
    fakeBackendProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
