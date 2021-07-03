import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  private isAuthenticated: boolean = false;
  authStatusListener = new Subject<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.token = localStorage.getItem('token') || null;
  }

  get Token() {
    return this.token;
  }

  get IsAuthenticated(): boolean {
    if (this.token) {
      this.authStatusListener.next(true);
      return true;
    }
    return false;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    this.http
      .post('http://localhost:3000/api/user/signup', authData)
      .subscribe();
  }

  loginUser(username: string, password: string) {
    const authData: AuthData = { username: username, password: password };
    this.http
      .post<{ token: string }>('http://localhost:3000/api/user/login', authData)
      .subscribe((res) => {
        this.token = res.token;
        if (this.token) {
          localStorage.setItem('token', this.token);
          this.authStatusListener.next(true);
          this.router.navigate([`/`], { relativeTo: this.route });
        }
      });
  }

  logout() {
    this.token = null;
    localStorage.clear();
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate([`/`], { relativeTo: this.route });
  }
}
