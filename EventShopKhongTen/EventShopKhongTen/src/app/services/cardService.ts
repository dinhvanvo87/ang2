import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { ServiceBase } from "./base/baseService";
import { ApiResource } from "../resources/apiResource";

@Injectable()
export class CardService extends ServiceBase {

    constructor(private http: Http) {
        super();
    }
   
    randomCard(id: any) {

        return this.http.get(ApiResource.randomCard(id))
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);

    }

}