import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'serra-overflow';

  constructor(private authService: AuthService) {}

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public fullname() {
    return this.authService.currentUser.fullName();
  }

  public logout() {
    this.authService.logout();
  }
}
