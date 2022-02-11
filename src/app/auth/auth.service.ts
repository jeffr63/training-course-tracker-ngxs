import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

class AuthToken {
  token: string;
  role: string;
  id: number;
  expires: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin = false;
  public isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password }).pipe(
      map((response) => {
        // login successful if there's a jwt token in the response and if that token is valid
        if (response && response.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          const expire = Date.now() + 3600000;
          const auth: AuthToken = {
            token: response.accessToken,
            role: response.user.role,
            id: response.user.id,
            expires: expire,
          };
          localStorage.setItem('tct_auth', JSON.stringify(auth));
          this.isAuthenticated = true;
          this.isAdmin = response.user.role === 'admin' ? true : false;
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('tct_auth');
    this.isAuthenticated = false;
    this.isAdmin = false;
  }

  checkLogin() {
    let auth: AuthToken = JSON.parse(localStorage.getItem('tct_auth'));
    if (!auth) return;

    let now = Date.now();
    if (auth.expires > now) {
      this.isAuthenticated = true;
      this.isAdmin = auth.role === 'admin' ? true : false;
      // keep logged in for another hour
      auth.expires = now + 3600000;
      localStorage.setItem('tct_auth', JSON.stringify(auth));
    } else {
      this.logout();
    }
  }
}
