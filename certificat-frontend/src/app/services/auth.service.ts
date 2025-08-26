import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor() {
    const saved = localStorage.getItem('loggedIn');
    this.loggedIn = saved === 'true';
  }

  login() {
    this.loggedIn = true;
    localStorage.setItem('loggedIn', 'true');
  }

  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
    //return this.loggedIn;
  }
}
