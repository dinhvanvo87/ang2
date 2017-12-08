import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ViewProvider } from '../providers/viewProvider';
import { ComponentBase } from './base/componentBase';
import { UrlResource } from '../resources/urlResource';

@Component({
    //templateUrl: ViewProvider.main,
    templateUrl: '../../app/views/main.html',
    providers: []
})

export class MainComponent extends ComponentBase implements OnInit {

    sessionId: Observable<string>;
    token: Observable<string>;
    
    isLoading: boolean = false;

    constructor(private router: Router) {
        super();
        router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }

    ngOnInit() {
    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.isLoading = true;
        }
        if (event instanceof NavigationEnd) {
            this.isLoading = false;
        }

        if (event instanceof NavigationCancel) {
            this.isLoading = false;
        }
        if (event instanceof NavigationError) {
            this.isLoading = false;
        }
    }

    signOut() {
    }
}
