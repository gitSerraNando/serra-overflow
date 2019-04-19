import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import { User } from './user.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public usersUrl: string;
  public currentUser?: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.usersUrl = urljoin(environment.apiUrl, 'auth');
    if (this.isLoggedIn()) {
      const { userId, email, firstName, lastName } = JSON.parse(
        localStorage.getItem('user')
      );
      this.currentUser = new User(email, null, firstName, lastName, userId);
    }
  }
  public signup(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(urljoin(this.usersUrl, 'signup'), body, { headers })
      .map((response: HttpResponse<User>) => {
        this.login(response);
        return response;
      })
      .catch((error: HttpResponse<User>) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  public signin(user: User): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post(urljoin(this.usersUrl, 'signin'), body, { headers })
      .map((response: HttpResponse<User>) => {
        this.login(response);
        return response;
      })
      .catch((error: HttpResponse<User>) => {
        console.log(error);
        return Observable.throw(error);
      });
  }

  public login: any = ({ token, userId, firstName, lastName, email }) => {
    this.currentUser = new User(email, null, firstName, lastName, userId);
    localStorage.setItem('token', token);
    localStorage.setItem(
      'user',
      JSON.stringify({ userId, firstName, lastName, email })
    );
    this.router.navigateByUrl('/');
  }

  public isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  public logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/signin');
  }
  public showError(message) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const {
      error: { name },
      message
    } = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error. Inténtalo nuevamente');
    }
    this.logout();
  }
}
