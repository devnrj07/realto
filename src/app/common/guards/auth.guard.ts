import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        private authenticationService: UserAuthenticationService){}


        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            const currentUser = this.authenticationService.currentUserValue;
            console.log("auth-guard :",currentUser);
            if (currentUser) {
                // authorised so return true
                return true;
            }
    
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }   

}