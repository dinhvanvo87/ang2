import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { ServiceBase } from "./base/baseService";
import { ApiResource } from "../resources/apiResource";
import { CustomerFactory } from "../factories/customerFactory";
import { Customer } from "../models/customer";

@Injectable()
export class CustomerService extends ServiceBase {

    constructor(private http: Http) {
        super();
    }

    getCustomer(id: any) {
        return this.http.get(ApiResource.getCustomer(id))
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    updateCustomer(customer: Customer) {

        var body = JSON.stringify(customer);
        return this.http
            .put(ApiResource.updateCustomer, body, this.putOptions)
            .toPromise()
            .then(response => { return response.json() })
            .catch(this.handleError);
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