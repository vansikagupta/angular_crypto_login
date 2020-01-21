import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthServiceService } from '../_services/auth-service.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate{
    currentUser : any
    constructor(private auth : AuthServiceService, private router : Router){
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        this.currentUser = this.auth.currentUserValue;
        if(this.currentUser){
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
}