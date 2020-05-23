import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService,
        private router: Router) {
    }

    canActivate(): boolean {
        const user = this.authService.getLoggedUser();

        if (!user) {
            this.router.navigate(['login-form'])
            return false;
        }

        else if (user.isAdmin) {
            return true;
        }
        else {
            this.router.navigate(['index']);

            return false;
        }
    }
}