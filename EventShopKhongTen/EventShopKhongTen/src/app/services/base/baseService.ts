import { Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

export class ServiceBase {

    constructor() {}

    public postOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: "POST"
    });

    public getOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: "GET"
    });

    public putOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: "PUT"
    });

    public deleteOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: "DELETE"
    });

    public basicAuth(username: any, password: any) {
        return new RequestOptions({
            headers: new Headers({ 'Authorization': 'Basic ' + btoa(username + ':' + password) }),
        });
    }

    public handleError(err: Response) {
        localStorage.removeItem('customer');
    }

}