import { Component } from '@angular/core';
import { ViewProvider } from './providers/viewProvider';

@Component({
    selector: 'app-root',
    //templateUrl: ViewProvider.app
    templateUrl: '../app/views/app.html'
})
export class AppComponent {
    constructor() { }
}
