import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, NgZone } from '@angular/core';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Router } from '@angular/router';

import { GObject } from "../models/gObject";
import { TextObject } from "../models/textObject";
import { MainObject } from "../models/mainObject";
import { ImgObject } from "../models/imgObject";
import { MainMatrix } from "../models/mainMatrix";
import { Customer } from "../models/customer";
import { CustomerService } from "../services/customerService";
import { UrlProvider } from "../providers/urlProvider";
import { CardService } from "../services/cardService";

var Snap = require("imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js");

@Component({
    selector: 'spinner',
    templateUrl: '../../app/views/spinner.html',
    styleUrls: ['../../app/css/spinner.css'],
    providers: [CustomerService, UrlProvider, CardService]
})

export class SpinnerComponent implements OnInit, AfterViewInit {

    constructor(
        private customerService: CustomerService,
        private urlProvider: UrlProvider,
        private router: Router,
        private cardService: CardService,
        private ngZone: NgZone
    ) {
        window.onresize = (e) => {
            this.ngZone.run(() => {

                this.mainMatrix = [];
                this.mainObject = [];

                this.createSpin();
                console.log('resize');
            });
        }
    }

    ngAfterViewInit(): void {
    }

    @ViewChild('svgElement') svgElement: ElementRef;

    @Input() svgWidth: any;
    @Input() svgHeight: any;
    @Input() stroke: string = '';
    @Input() svgClass: string;

    @Output() eventStopCallback: EventEmitter<any> = new EventEmitter<any>();
    @Output() eventStartCallback: EventEmitter<any> = new EventEmitter<any>();
    
    cx: number = 0; //600;
    cy: number = 0; //400;
    r: number = 100;
    transform: string = '';

    mainObject: MainObject[] = [];
    mainMatrix: MainMatrix[] = [];
    indexOfMatrix: number = 0;

    subscription: Subscription;
    timer: any;

    points: string = '';
    isStart: boolean = true;
    isStop: boolean = false;
    snap: any;

    x1: number;
    x2: number;
    y1: number;
    y2: number;
    counter: number = 8;
    actual_angle: number = (360 / this.counter);

    customer: Customer = new Customer(null, null, null, null, null, null);
    totalWheel: number = 0;
    randomVal: number = 0;

    ngOnInit(): void {
        
        if (localStorage.getItem('customerId') == null) {
            this.router.navigate([this.urlProvider.home]);
            return;
        }

        this.customerService.getCustomer(localStorage.getItem('customerId')).then(cust => {
            this.customer = cust as Customer;
            this.totalWheel = this.customer.totalWheel;
        });

        this.createSpin();
    }

    createSpin() {
        this.svgWidth = this.svgElement.nativeElement.offsetWidth;
        this.svgHeight = this.svgElement.nativeElement.offsetHeight;

        if (this.svgWidth > this.svgHeight) {
            this.r = this.svgHeight / 2 - 25;
        } else {
            this.r = this.svgWidth / 2 - 25;
        }
        this.cx = this.svgWidth / 2;
        this.cy = this.svgHeight / 2;

        var initial_angle: number = 0;
        let rad: number = Math.PI / 180
        let j: number = 8;

        // Snap SVG Initialization
        this.snap = new Snap('#tmp_circle_split');
                        
        for (let i = 0; i < this.counter; i++) {
            var end_angle = initial_angle+ this.actual_angle;
            //var popangle = (initial_angle + (this.actual_angle / 2));
            var sector_path = this.sector(this.cx, this.cy, this.r, initial_angle, end_angle, rad, j, this.counter);
            j--;

            //popangle = sector_path.getPointAtLength().alpha;

            //Triangle Mid Point Concept 
            //console.log('x1  '+ x1+'    y1  ' +  y1 +'    x2  ' +  x2 +'  y2  '+ y2);
            // Line of a midpoint formula x+x2/2 , y1+y2/2
            // Center point of y
            var mpx1 = (this.x1 + this.x2) / 2;
            var mpy1 = (this.y1 + this.y2) / 2;

            // Centre point of x
            var mpx2 = (this.cx + mpx1) / 2;
            var mpy2 = (this.cy + mpy1) / 2;
            //var cpc = snap.circle(mpx2, mpy2, 2);

            var gObj = this.sector(this.cx, this.cy, this.r, initial_angle, end_angle, rad, j, this.counter);
            var textObj = this.createText(mpx2, mpy2, i);
            var imgObject = this.createImage(i);

            this.mainObject.push(new MainObject(gObj, textObj, imgObject));

            initial_angle = end_angle;
        }

        this.getMatrix();

        // create trianglePoly
        this.createTriangle();

        //this.snap.remove();
        
    }

    sector(cx, cy, r, startAngle, endAngle, rad, j, n) {

        this.x1 = parseFloat(cx + r * Math.cos(-startAngle * rad));
        this.x2 = parseFloat(cx + r * Math.cos(-endAngle * rad));
        this.y1 = parseFloat(cy + r * Math.sin(-startAngle * rad));
        this.y2 = parseFloat(cy + r * Math.sin(-endAngle * rad));
        var flag = (endAngle - startAngle > 180) ? 1 : 0;
        let sectorpath = "M " + cx + " " + cy + " L" + this.x1 + " " + this.y1 + " A" + r + " " + r + " " + 0 + " " + flag + " " + 0 + " " + this.x2 + " " + " " + this.y2 + "z";

        return new GObject(sectorpath, 'rgba(34,34,34,' + (j / n) + ')', '#666', startAngle, endAngle);
        
    }

    getMatrix() {

        for (let rad = 0; rad <= 360; rad++){

            var agrument = rad * (Math.PI / 180);

            var a: number = Math.cos(agrument);
            var b: number = Math.sin(agrument);
            var c: number = -Math.sin(agrument);
            var d: number = Math.cos(agrument);
            var e: number = -(this.cx * (Math.cos(agrument) - 1) - this.cy * (Math.sin(agrument)));
            var f: number = -(this.cx * (Math.sin(agrument)) + this.cy * (Math.cos(agrument) - 1));

            var startAngle: number = 0;
            var endAngle: number = 0;
            var index: number = 0;

            if (rad <= this.actual_angle) { // [0 - 45] [23]

                startAngle = 0;
                endAngle = this.actual_angle;
                index = (rad >= this.actual_angle / 2 && rad <= this.actual_angle/2 + 2) ? 100 : 0;

            } else if (rad > this.actual_angle && rad <= this.actual_angle * 2) { // [45 - 90] [68]

                startAngle = this.actual_angle;
                endAngle = this.actual_angle * 2;
                index = (rad >= (this.actual_angle * 2) - 22 && rad <= (this.actual_angle * 2) - 20) ? -1 : 0;

            } else if (rad > this.actual_angle * 2 && rad <= this.actual_angle * 3) { //[90 - 135] [113]

                startAngle = this.actual_angle * 2;
                endAngle = this.actual_angle * 3;
                index = (rad >= (this.actual_angle * 3) - 22 && rad <= (this.actual_angle * 3) - 20) ? 50 : 0;

            } else if (rad > this.actual_angle * 3 && rad <= this.actual_angle * 4) { // [135 - 180] [158]

                startAngle = this.actual_angle * 3;
                endAngle = this.actual_angle * 4;
                index = (rad >= (this.actual_angle * 4) - 22 && rad <= (this.actual_angle * 4) - 20) ? -1 : 0;

            } else if (rad > this.actual_angle * 4 && rad <= this.actual_angle * 5) { // [180 - 225] [203]

                startAngle = this.actual_angle * 4;
                endAngle = this.actual_angle * 5;
                index = (rad >= (this.actual_angle * 5) - 22 && rad <= (this.actual_angle * 5) - 20) ? 100 : 0;

            } else if (rad > this.actual_angle * 5 && rad <= this.actual_angle * 6) { // [225 - 270] [248]

                startAngle = this.actual_angle * 5;
                endAngle = this.actual_angle * 6;
                index = (rad >= (this.actual_angle * 6) - 22 && rad <= (this.actual_angle * 6) - 20) ? -1 : 0;

            } else if (rad > this.actual_angle * 6 && rad <= this.actual_angle * 7) { // [270 - 315] [293]

                startAngle = this.actual_angle * 6;
                endAngle = this.actual_angle * 7;
                index = (rad >= (this.actual_angle * 7) - 22 && rad <= (this.actual_angle * 7) - 20) ? 50 : 0;

            } else if (rad > this.actual_angle * 7 && rad <= this.actual_angle * 8) { // [315 - 360] [338]

                startAngle = this.actual_angle * 7;
                endAngle = this.actual_angle * 8;
                index = (rad >= (this.actual_angle * 8) - 22 && rad <= (this.actual_angle * 8) - 20) ? -1 : 0;

            }

            this.mainMatrix.push(new MainMatrix('matrix(' + a + ',' + b + ',' + c + ',' + d + ',' + e + ',' + f + ')', index, startAngle, endAngle));
        }
               
    }
    
    createText(x, y, i) {
        var text = this.snap.text(x, y, '');
        text.attr({
            fill: '#ffffff',
            fontSize: '20px'
        });
        text.transform('t0' + ',' + text.getBBox().height / 4 + 'r-' + ((i + 1) * this.actual_angle - this.actual_angle + this.actual_angle / 2) + ',' + x + ',' + (y - text.getBBox().height / 4));

        var mat = text.attr('transform').localMatrix;

        var txt = '';

        if (i === 0 || i === 4)
        {
            txt = 'CARD 50K';
        } else if (i === 2 || i === 6) {
            txt = 'CARD 100K';
        } else {
            txt = 'CARD 0K';
        }

        text.remove();

        return new TextObject('matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + mat.e + ',' + mat.f + ')', '#ffffff', '40px', txt, x, y);
        
    }

    createImage(i) {

        var imageOffset = 50;

        // Center point of y
        var mpx1 = (this.x1 + this.x2) / 2;
        var mpy1 = (this.y1 + this.y2) / 2;

        // Centre point of x
        var mpx2 = (this.cx + mpx1) / 2;
        var mpy2 = ((this.cy + mpy1) / 2);

        var img = this.snap.image("../../assets/img/spinner/likebutton.png", mpx2, (mpy2 - (imageOffset / 2) - (imageOffset / 4)), imageOffset, imageOffset);
        img.transform('t0' + ',' + imageOffset / 4 + 'r-' + ((i + 1) * this.actual_angle - this.actual_angle + this.actual_angle / 2) + ',' + mpx2 + ',' + (mpy2 - imageOffset / 4));

        var mat = img.attr('transform').localMatrix;

        var imgObj = new ImgObject('matrix(' + mat.a + ',' + mat.b + ',' + mat.c + ',' + mat.d + ',' + mat.e + ',' + mat.f + ')', mpx2, (mpy2 - (imageOffset / 2) - (imageOffset / 4)), imageOffset, imageOffset, "../../assets/img/spinner/likebutton.png");

        img.remove();

        return imgObj;
    }

    createTriangle() {
        // Selector Handle
        var tpx1, tpx2, tpy1, tpy2, tpcx, tpcy;
        tpx1 = this.cx + 25;
        tpx2 = this.cx - 25;
        tpcy = this.cy - this.r - 10;
        tpy1 = tpcy + 25;

        var trianglePoly = tpx1 + ',' + tpcy + ' ' + this.cx + ',' + tpy1 + ' ' + tpx2 + ',' + tpcy;

        var triangle = this.snap.polyline(trianglePoly);
        triangle.attr({
            id: "pointer",
            fill: "rgba(5,111,113,.9)"
        });

        this.points = tpx1 + ',' + tpcy + ' ' + this.cx + ',' + tpy1 + ' ' + tpx2 + ',' + tpcy;

        triangle.remove();

        return triangle;
    }

    startSpinner() {

        if (this.customer === null || this.customer.totalWheel <= 0) {
            return;
        }

        this.totalWheel = this.totalWheel - 1;

        this.isStart = false;
        
        let timer = TimerObservable.create(0, 0.0001);
        var i = this.indexOfMatrix;

        // lấy random card
        this.cardService.randomCard(localStorage.getItem('customerId')).then(card => {
            this.randomVal = card.code;
        });

        //update lại local customer
        this.customerService.getCustomer(localStorage.getItem('customerId')).then(cust => {
            this.customer = cust;
        });
        
        this.subscription = timer.subscribe(t => {

            if (this.indexOfMatrix > 358) {
                this.indexOfMatrix = 0;
            }

            if (this.isStop) { //click stop
                this.indexOfMatrix = this.indexOfMatrix + 1;
            } else { // default
                this.indexOfMatrix = this.indexOfMatrix + 2;
            }
            
            if (this.isStop && this.mainMatrix[this.indexOfMatrix].index === parseInt(this.customer.cardReward)) {
                
                this.transform = this.mainMatrix[this.indexOfMatrix].matrix;
                
                this.subscription.unsubscribe();

                this.customer.totalWheel = this.totalWheel;

                //update số lượt quay
                this.customerService.updateCustomer(this.customer).then(cust => {
                    this.isStop = false;
                });
            }

            if (this.indexOfMatrix === this.mainMatrix.length - 1)
                this.indexOfMatrix = 0;

            this.transform = this.mainMatrix[this.indexOfMatrix].matrix;
        });

        
    }

    stopSpinner() {
        setTimeout(() => {
            this.isStop = true;
            this.isStart = true;
        }, 2000);
    }

    setTimmer(period, callback: (doc: any) => void) {

        this.timer = TimerObservable.create(0, period);
        this.subscription.remove;

    }
    
}