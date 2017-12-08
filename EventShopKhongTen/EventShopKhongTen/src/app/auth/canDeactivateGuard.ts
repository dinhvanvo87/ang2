import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface ICanComponentDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {

    canDeactivate(component: ICanComponentDeactivate): Observable<boolean> | Promise<boolean> | boolean {
        //console.log('CanDeactivateGuard::canDeactivate');
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}
