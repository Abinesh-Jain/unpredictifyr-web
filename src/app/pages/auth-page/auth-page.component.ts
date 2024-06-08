import { Component, OnDestroy } from '@angular/core';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PicsumDirective } from '../../directives/picsum/picsum.directive';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [NgbNavModule, PicsumDirective, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [NgbNavConfig],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnDestroy {

  subscriptions: Subscription[] = [];

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(config: NgbNavConfig, private authService: AuthService, private toastService: ToastService) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.subscriptions.push(this.authService.login(email, password).subscribe(
        {
          next: (res) => this.onLoginSuccess(res),
          error: (err) => this.onLoginError(err)
        }
      ));
    }
  }

  onLoginSuccess(response: any) {
    const { message, detail } = response;
    this.toastService.show(message);
    for (const [key, value] of Object.entries(detail)) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  onLoginError(err: any) {
    console.error(err);
    this.toastService.show(err['error']['message']);
  }

  signUp() {
    if (this.signUpForm.valid) {
      const { name, email, password, confirmPassword } = this.signUpForm.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      this.subscriptions.push(this.authService.signUp(name, email, password).subscribe({
        next: (res) => this.onSignUpSuccess(res),
        error: (err) => this.onSignUpError(err)
      }));
    }
  }

  onSignUpSuccess(response: any) {

  }

  onSignUpError(err: any) {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
