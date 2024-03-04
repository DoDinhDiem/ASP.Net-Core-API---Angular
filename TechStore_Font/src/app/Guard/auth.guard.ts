import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../service/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private accountService: AccountService
  ) { }

  canActivate(route: any): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken?.UserId;
      const userRoles = decodedToken['role'];
      const requiredRole = route.data['Nhân viên'];
      this.accountService.setUserId(userId);
      this.accountService.setRole(userRoles);


      if (userRoles && (userRoles.includes(requiredRole) || userRoles.includes('Admin'))) {
        return true;
      } else {
        alert("Bạn không có quyền vào trang này!");
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
