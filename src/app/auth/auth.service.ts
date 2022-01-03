import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { UserRequest } from './user-request.model';
import { User } from './user.model';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;
  constructor(private http: HttpClient, private router: Router) {}
  signUp(user: UserRequest) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDfxyw5WYuKOEEa309GL9TsBL4916U1E64',
      { email: user.email, password: user.password, returnSecureToken: true }
    );
  }
  signIn(user: UserRequest) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDfxyw5WYuKOEEa309GL9TsBL4916U1E64',
        { email: user.email, password: user.password, returnSecureToken: true }
      )
      .pipe(
        tap((resData) => {
          const expirationDate = new Date(
            new Date().getTime() + +resData.expiresIn * 1000
          );
          const user = new User(
            resData.email,
            resData.localId,
            resData.idToken,
            expirationDate
          );
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
          this.autoLogout(+resData.expiresIn * 1000);
        })
      );
  }
  autoLogin() {
    const userFromLocal: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userFromLocal) {
      return;
    }
    const willSend = new User(
      userFromLocal.email,
      userFromLocal.id,
      userFromLocal._token,
      new Date(userFromLocal._tokenExpirationDate)
    );
    if (willSend.token) {
      this.user.next(willSend);
    }
    const timer =
      new Date(userFromLocal._tokenExpirationDate).getTime() -
      new Date().getTime();
    this.autoLogout(timer);
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('user');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
}
