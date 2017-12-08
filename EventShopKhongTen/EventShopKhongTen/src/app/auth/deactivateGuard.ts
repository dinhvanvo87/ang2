import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { UrlResource } from "../resources/urlResource";

@Injectable()
export class DeactivateGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validate(route, state);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.validate(route, state);
    }

    validate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('customerId') != null) {
            return true
        };

        this.router.navigate([UrlResource.url(UrlResource.home)]);
        return false;
        //return true;
    }
}
