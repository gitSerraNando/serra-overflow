import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin-screen',
  templateUrl: './signin-screen.component.html',
  styleUrls: ['./signin-screen.component.sass']
})
export class SigninScreenComponent implements OnInit {
  public signinForm: FormGroup;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        // Validators.email
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ]),
      password: new FormControl(null, Validators.required)
    });
  }

  public onSubmit() {
    if (this.signinForm.valid) {
      const { email, password } = this.signinForm.value;
      const user = new User(email, password);
      this.authService
        .signin(user)
        .subscribe(this.authService.login, this.authService.handleError);
    }
  }
}
