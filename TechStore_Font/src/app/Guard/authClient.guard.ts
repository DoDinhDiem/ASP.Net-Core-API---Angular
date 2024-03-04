import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../service/account.service';

@Injectable({
    providedIn: 'root',
})
export class AuthClientGuard {
    constructor(
        private router: Router,
        private jwtHelper: JwtHelperService,
        private accountService: AccountService
    ) { }

    canActivate(route: any): boolean {
        const token = localStorage.getItem('tokenClient');

        if (token && !this.jwtHelper.isTokenExpired(token)) {
            const decodedToken = this.jwtHelper.decodeToken(token);
            const userId = decodedToken?.UserId;
            const userRoles = decodedToken['role'];
            const requiredRole = route.data['requiredRole'];
            this.accountService.setUserIdClient(userId);


            if (userRoles && (userRoles.includes(requiredRole) || userRoles.includes('Khách hàng'))) {
                return true;
            } else {
                alert("Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục");
                return false;
            }
        } else {
            alert("Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục");
            return false;
        }
    }
}
