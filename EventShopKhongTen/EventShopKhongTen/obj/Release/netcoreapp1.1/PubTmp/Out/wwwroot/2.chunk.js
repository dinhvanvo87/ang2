webpackJsonp([2],{

/***/ "../../../../../src/app/components/base/componentBase.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentBase; });
var ComponentBase = (function () {
    function ComponentBase() {
    }
    return ComponentBase;
}());

//# sourceMappingURL=componentBase.js.map

/***/ }),

/***/ "../../../../../src/app/components/homeComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable__ = __webpack_require__("../../../../rxjs/observable/TimerObservable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_customer__ = __webpack_require__("../../../../../src/app/models/customer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_customerService__ = __webpack_require__("../../../../../src/app/services/customerService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_urlProvider__ = __webpack_require__("../../../../../src/app/providers/urlProvider.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomeComponent = (function () {
    function HomeComponent(customerService, router, urlProvider) {
        this.customerService = customerService;
        this.router = router;
        this.urlProvider = urlProvider;
        this.customer = new __WEBPACK_IMPORTED_MODULE_3__models_customer__["a" /* Customer */](null, null, null, null, null, null);
        this.customerCode = null;
        this.errors = null;
        this.showProgress = false;
        this.err = false;
        this.counter = (new Date("2017-10-13T12:00:00").valueOf() - new Date().valueOf()) / 1000;
        this.t = (new Date("2017-10-14T12:00:00").valueOf() - new Date().valueOf()) / 1000;
        this.code = "96685008200XX";
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //localStorage.removeItem('customer');
        this.err = false;
        this.audio = new Audio("../assets/mp3/SaveMe.mp3");
        this.audio.load();
        this.audio.play();
        this.audio.loop = true;
        var timer = __WEBPACK_IMPORTED_MODULE_1_rxjs_observable_TimerObservable__["TimerObservable"].create(0, 1000);
        this.subscription = timer.subscribe(function (t) {
            if (_this.t <= 0) {
                _this.subscription.unsubscribe();
            }
            _this.days = Math.trunc(_this.counter / 86400);
            _this.counter -= _this.days * 86400;
            _this.hours = Math.floor(_this.counter / 3600) % 24;
            _this.counter -= _this.hours * 3600;
            _this.minutes = Math.floor(_this.counter / 60) % 60;
            _this.counter -= _this.minutes * 60;
            _this.seconds = _this.counter % 60;
            _this.countDown = _this.days + ' Ngày ' + _this.hours + ' Giờ ' + _this.minutes + ' Phút ' + Math.floor(_this.seconds) + ' Giây ';
            _this.counter = _this.t--;
            --_this.counter;
        });
    };
    HomeComponent.prototype.checkCode = function () {
        var _this = this;
        this.showProgress = true;
        this.err = false;
        this.customerService.getCustomer(this.customerCode).then(function (cust) {
            _this.customer = cust;
            if (_this.customer !== null) {
                setTimeout(function () { return _this.resultReward(cust); }, 2000); //troll đợi 20s = 20000
            }
        });
    };
    HomeComponent.prototype.resultReward = function (obj) {
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
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Component */])({
        //templateUrl: ViewProvider.home
        template: __webpack_require__("../../../../../src/app/views/home.html"),
        styles: [__webpack_require__("../../../../../src/app/css/home.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4__services_customerService__["a" /* CustomerService */], __WEBPACK_IMPORTED_MODULE_5__providers_urlProvider__["a" /* UrlProvider */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_customerService__["a" /* CustomerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_customerService__["a" /* CustomerService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__providers_urlProvider__["a" /* UrlProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__providers_urlProvider__["a" /* UrlProvider */]) === "function" && _c || Object])
], HomeComponent);

var _a, _b, _c;
//# sourceMappingURL=homeComponent.js.map

/***/ }),

/***/ "../../../../../src/app/components/mainComponent.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_componentBase__ = __webpack_require__("../../../../../src/app/components/base/componentBase.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainComponent; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MainComponent = (function (_super) {
    __extends(MainComponent, _super);
    function MainComponent(router) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.isLoading = false;
        router.events.subscribe(function (event) {
            _this.navigationInterceptor(event);
        });
        return _this;
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent.prototype.navigationInterceptor = function (event) {
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* NavigationStart */]) {
            this.isLoading = true;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* NavigationEnd */]) {
            this.isLoading = false;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["e" /* NavigationCancel */]) {
            this.isLoading = false;
        }
        if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["f" /* NavigationError */]) {
            this.isLoading = false;
        }
    };
    MainComponent.prototype.signOut = function () {
    };
    return MainComponent;
}(__WEBPACK_IMPORTED_MODULE_3__base_componentBase__["a" /* ComponentBase */]));
MainComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["K" /* Component */])({
        //templateUrl: ViewProvider.main,
        template: __webpack_require__("../../../../../src/app/views/main.html"),
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], MainComponent);

var _a;
//# sourceMappingURL=mainComponent.js.map

/***/ }),

/***/ "../../../../../src/app/css/home.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".hidden {\r\n  display: none;\r\n}\r\n\r\n.loading {\r\n  position: fixed;\r\n  z-index: 999;\r\n  height: 2em;\r\n  width: 2em;\r\n  overflow: show;\r\n  margin: auto;\r\n  top: 0;\r\n  left: 0;\r\n  bottom: 0;\r\n  right: 0;\r\n}\r\n\r\n  /* Transparent Overlay */\r\n  .loading:before {\r\n    content: '';\r\n    display: block;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: rgba(0,0,0,0.3);\r\n  }\r\n\r\n  /* :not(:required) hides these rules from IE9 and below */\r\n  .loading:not(:required) {\r\n    /* hide \"loading...\" text */\r\n    font: 0/0 a;\r\n    color: transparent;\r\n    text-shadow: none;\r\n    background-color: transparent;\r\n    border: 0;\r\n  }\r\n\r\n    .loading:not(:required):after {\r\n      content: '';\r\n      display: block;\r\n      font-size: 10px;\r\n      width: 1em;\r\n      height: 1em;\r\n      margin-top: -0.5em;\r\n      -webkit-animation: spinner 1500ms infinite linear;\r\n      animation: spinner 1500ms infinite linear;\r\n      border-radius: 0.5em;\r\n      box-shadow: rgba(0, 0, 0, 0.75) 1.5em 0 0 0, rgba(0, 0, 0, 0.75) 1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) 0 1.5em 0 0, rgba(0, 0, 0, 0.75) -1.1em 1.1em 0 0, rgba(0, 0, 0, 0.75) -1.5em 0 0 0, rgba(0, 0, 0, 0.75) -1.1em -1.1em 0 0, rgba(0, 0, 0, 0.75) 0 -1.5em 0 0, rgba(0, 0, 0, 0.75) 1.1em -1.1em 0 0;\r\n    }\r\n\r\n/* Animation */\r\n\r\n@-webkit-keyframes spinner {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n@keyframes spinner {\r\n  0% {\r\n    -webkit-transform: rotate(0deg);\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    -webkit-transform: rotate(360deg);\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.center{\r\n  text-align: center;\r\n}\r\n\r\n.err{\r\n  border-color: red;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/mainModule.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routings_mainRouting__ = __webpack_require__("../../../../../src/app/routings/mainRouting.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_mainComponent__ = __webpack_require__("../../../../../src/app/components/mainComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_homeComponent__ = __webpack_require__("../../../../../src/app/components/homeComponent.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainModule", function() { return MainModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var MainModule = (function () {
    function MainModule() {
    }
    return MainModule;
}());
MainModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__angular_common__["h" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__routings_mainRouting__["a" /* mainRouting */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__components_mainComponent__["a" /* MainComponent */],
            __WEBPACK_IMPORTED_MODULE_5__components_homeComponent__["a" /* HomeComponent */],
        ],
        providers: []
    })
], MainModule);

//# sourceMappingURL=mainModule.js.map

/***/ }),

/***/ "../../../../../src/app/routings/mainRouting.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_mainComponent__ = __webpack_require__("../../../../../src/app/components/mainComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resources_urlResource__ = __webpack_require__("../../../../../src/app/resources/urlResource.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_homeComponent__ = __webpack_require__("../../../../../src/app/components/homeComponent.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_deactivateGuard__ = __webpack_require__("../../../../../src/app/auth/deactivateGuard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth_canDeactivateGuard__ = __webpack_require__("../../../../../src/app/auth/canDeactivateGuard.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mainRouting; });






var mainRoutes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__components_mainComponent__["a" /* MainComponent */],
        children: [
            {
                path: '',
                canDeactivate: [__WEBPACK_IMPORTED_MODULE_5__auth_canDeactivateGuard__["a" /* CanDeactivateGuard */]],
                component: __WEBPACK_IMPORTED_MODULE_3__components_homeComponent__["a" /* HomeComponent */],
                pathMatch: 'full'
            },
            {
                path: __WEBPACK_IMPORTED_MODULE_2__resources_urlResource__["a" /* UrlResource */].home,
                canDeactivate: [__WEBPACK_IMPORTED_MODULE_5__auth_canDeactivateGuard__["a" /* CanDeactivateGuard */]],
                component: __WEBPACK_IMPORTED_MODULE_3__components_homeComponent__["a" /* HomeComponent */]
            },
            {
                path: __WEBPACK_IMPORTED_MODULE_2__resources_urlResource__["a" /* UrlResource */].card,
                canActivate: [__WEBPACK_IMPORTED_MODULE_4__auth_deactivateGuard__["a" /* DeactivateGuard */]],
                loadChildren: 'app/modules/cardModule#CardModule'
            }
        ]
    }
];
var mainRouting = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forChild(mainRoutes);
//# sourceMappingURL=mainRouting.js.map

/***/ }),

/***/ "../../../../../src/app/views/home.html":
/***/ (function(module, exports) {

module.exports = "<!--<form #f=\"ngForm\" novalidate id=\"frmSpAdd\">\r\n\r\n  <div>\r\n    <div class=\"wrapper\">\r\n      <div class=\"parallax filter-black\">\r\n        <div class=\"parallax-image\"></div>\r\n        <div class=\"small-info\">\r\n          <div class=\"col-sm-10 col-sm-push-1 col-md-6 col-md-push-3 col-lg-6 col-lg-push-3\">\r\n            <div class=\"card-group animated flipInX\">\r\n              <div class=\"card\">\r\n                <div class=\"card-block\">\r\n                  <div class=\"center\">\r\n                    <h4 class=\"m-b-0\"><span class=\"icon-text\">Nhập code của bạn</span></h4>\r\n                  </div>\r\n                    <small class=\"text-danger\">{{errors}}</small>\r\n                    <div class=\"form-group\">\r\n                      <input type=\"text\" class=\"form-control\" [class.err]=\"err\" placeholder=\"XXXXXXXX -XXXX-XXXX-XXXX-XXXXXXXXXXXX\" [(ngModel)]=\"customerCode\" \r\n                             pattern=\"(^[a-zA-Z0-9-]{8})+-+([a-zA-Z0-9-]{4})+-+([a-zA-Z0-9-]{4})+-+([a-zA-Z0-9-]{4})+-+([a-zA-Z0-9-]{12})$\"\r\n                             required name=\"code\">\r\n                      <small [hidden]=\"!err\" class=\"text-danger\">\r\n                        Code không tồn tại.\r\n                      </small>\r\n                    </div>\r\n                    <div class=\"center\">\r\n                      <button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"checkCode()\" [disabled]=\"!f.valid\">OK</button>\r\n                    </div>\r\n                    <div>\r\n                    </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n    </div>\r\n  </div>\r\n  </div>\r\n\r\n  <div class=\"loading\" [class.hidden]=\"!showProgress\">\r\n  </div>\r\n\r\n</form>-->\r\n\r\n<div class=\"row text-center\">\r\n  <div class=\"col-md-2\"></div>\r\n  <div class=\"col-md-8\">\r\n    <h1 *ngIf=\"t > 0\">{{countDown}}</h1>\r\n    <h1 *ngIf=\"t <= 0\">{{code}}</h1>\r\n  </div>\r\n  <div class=\"col-md-2\"></div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/views/main.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"navbar-header\">\r\n      <img src=\"../assets/img/logo.png\">\r\n    </div>\r\n    <ul class=\"nav navbar-nav\"></ul>\r\n  </div>\r\n</nav>\r\n\r\n<div class=\"container\">\r\n  <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ })

});
//# sourceMappingURL=2.chunk.js.map