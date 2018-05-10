import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ]
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  login: FormControl;
  password: FormControl;
  notifications;
  successObj;

  constructor(private auth: AuthService, private ntfctService: NotificationService) {
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
    this.ntfctService.notification$.subscribe((data) => {
      this.notifications = data;
    });
  }

  createFormControls(): void {
    this.login = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(8),
      Validators.required
    ]);
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      login: this.login,
      password: this.password
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.successObj = await this.auth.login(this.loginForm.value);
    }
  }

}
