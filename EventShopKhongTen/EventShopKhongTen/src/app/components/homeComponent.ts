import { Component, Input, OnInit } from '@angular/core';
import { ViewProvider } from '../providers/viewProvider';
import { Subscription, Observable } from 'rxjs/Rx';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Router } from '@angular/router';

import { Customer } from "../models/customer";
import { CustomerService } from "../services/customerService";
import { UrlProvider } from "../providers/urlProvider";

@Component({
    //templateUrl: ViewProvider.home
    templateUrl: '../../app/views/home.html',
    styleUrls: ['../../app/css/home.css'],
    providers: [CustomerService, UrlProvider]
})

export class HomeComponent implements OnInit {

    constructor(private customerService: CustomerService, private router: Router, private urlProvider: UrlProvider) {
    }

    customer: Customer = new Customer(null, null, null, null, null, null);
    customerCode: string = null;
    errors: string = null;
    
    subscription: Subscription;
    showProgress: boolean = false;
    err: boolean = false;

    countDown;
    counter: number = (new Date("2017-10-13T12:00:00").valueOf() - new Date().valueOf()) / 1000;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    t: number = (new Date("2017-10-14T12:00:00").valueOf() - new Date().valueOf()) / 1000;
    code: string = "96685008200XX";
    audio;

    ngOnInit(): void {
        //localStorage.removeItem('customer');
        this.err = false;

        this.audio = new Audio("../assets/mp3/SaveMe.mp3");
        this.audio.load();
        this.audio.play();
        this.audio.loop = true;

        let timer = TimerObservable.create(0, 1000);
        this.subscription = timer.subscribe(t => {
            if (this.t <= 0) {
                this.subscription.unsubscribe();
            }
            this.days = Math.trunc(this.counter / 86400);
            this.counter -= this.days * 86400;
            this.hours = Math.floor(this.counter / 3600) % 24;
            this.counter -= this.hours * 3600;
            this.minutes = Math.floor(this.counter / 60) % 60
            this.counter -= this.minutes * 60;
            this.seconds = this.counter % 60;
            this.countDown = this.days + ' Ngày ' + this.hours + ' Giờ ' + this.minutes + ' Phút ' + Math.floor(this.seconds) + ' Giây ';
            this.counter = this.t--;
            --this.counter;
        });
        
    }
        
    checkCode() {

        this.showProgress = true;
        this.err = false;

        this.customerService.getCustomer(this.customerCode).then(cust => {

            this.customer = cust as Customer;
            if (this.customer !== null) {
                setTimeout(() => this.resultReward(cust), 2000); //troll đợi 20s = 20000
            }
        });
        
    }

    resultReward(obj) {
        this.showProgress = false;
        localStorage.setItem('customerId', this.customer.id);
        
        switch (this.customer.cardReward) {
            case "NotFound":
                this.err = true;
                break;
            case "Avaible":
                this.err = true;
                break;
            case "-1":
                this.router.navigate([this.urlProvider.card]);
                break;
            case "50":
                this.router.navigate([this.urlProvider.card]);
                break;
            case "100":
                this.router.navigate([this.urlProvider.card]);
                break;
            default:
                this.router.navigate([this.urlProvider.home]);
                break;
        }

    }
}
