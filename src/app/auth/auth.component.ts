import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserRequest } from './user-request.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  loginMode: boolean = true;
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ]),
    });
  }
  switchMode() {
    this.loginMode = !this.loginMode;
  }
  onSubmit() {
    const user: UserRequest = {
      email: this.authForm.get('email').value,
      password: this.authForm.get('password').value,
    };
    if (this.loginMode) {
      this.isLoading = true;
      this.authService.signIn(user).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.isLoading = true;
      this.authService.signUp(user).subscribe(
        (responseData) => {
          console.log(responseData);
          this.isLoading = false;
          this.loginMode = true;
        },
        (error) => {
          this.errorMessage = error.error.error.message;
          console.log(error.error.error.message);
          this.isLoading = false;
        }
      );
    }
    this.authForm.reset();
  }
}
