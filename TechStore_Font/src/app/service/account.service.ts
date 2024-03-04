import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userId: string | null = null;
  private userIdClient: string | null = null;
  private role: string | null = null;


  constructor(private http: HttpClient) {
  }
  signIn(Account: any) {
    return this.http.post<any>(baseUrl + "Account/LoginAdmin", Account)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }


  isLoggedIn(): void {
    localStorage.removeItem('token');
  }

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(): string | null {
    return this.userId;
  }

  setRole(role: string): void {
    this.role = role;
  }

  getRole(): string | null {
    return this.role;
  }
  //Client
  signUp(Account: any) {
    return this.http.post<any>(baseUrl + "Account/RegisterClient", Account)
  }

  signInClient(Account: any) {
    return this.http.post<any>(baseUrl + "Account/Login", Account)
  }

  storeTokenClient(tokenValue: string) {
    localStorage.setItem('tokenClient', tokenValue)
  }

  getTokenClient() {
    return localStorage.getItem('tokenClient')
  }

  setUserIdClient(userId: string): void {
    this.userIdClient = userId;
  }

  getUserIdClient(): string | null {
    return this.userIdClient;
  }
  isLoggedInClient(): void {
    localStorage.removeItem('tokenClient');
  }
}
