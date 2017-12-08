import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { UrlResource } from "../../resources/urlResource";
import { Customer } from "../../models/customer";
import { UrlProvider } from "../../providers/urlProvider";
import { CustomerService } from "../../services/customerService";

@Component({
    templateUrl: '../../../app/views/play/play.html',
    styleUrls: ['../../../app/css/play.css'],
    providers: [UrlProvider, CustomerService]
})
export class PlayComponent implements OnInit {

    //ngAfterViewInit(): void {
    //    this.spinHeight = this.spinEl.nativeElement.offsetHeight;
    //    this.spinWidth = this.spinEl.nativeElement.offsetWidth;
    //}

    customer: Customer;

    constructor(
        private location: Location,
        private router: Router,
        private urlProvider: UrlProvider,
        private customerService: CustomerService
    ) { 
    }

    ngOnInit(): void {
        
        if (localStorage.getItem('customerId') == null) {
            this.router.navigate([this.urlProvider.home]);
            return;
        }
    }
    
    onEventChange(cust: any) {
        
    }
}