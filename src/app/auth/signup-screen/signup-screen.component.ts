import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup-screen',
  templateUrl: './signup-screen.component.html',
  styleUrls: ['./signup-screen.component.sass']
})
export class SignupScreenComponent implements OnInit {
  public signupForm: FormGroup;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
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
    if (this.signupForm.valid) {
      const { firstName, lastName, email, password } = this.signupForm.value;
      const user = new User(email, password, firstName, lastName);
      this.authService
        .signup(user)
        .subscribe(this.authService.login, this.authService.handleError);
    }
  }
}
