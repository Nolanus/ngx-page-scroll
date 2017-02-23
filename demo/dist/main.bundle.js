webpackJsonp([0,3],{

/***/ 431:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HomeComponent; });
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
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__(815),
            styles: [__webpack_require__(808)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/home.component.js.map

/***/ },

/***/ 432:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__ = __webpack_require__(180);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HorizontalScrollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var HorizontalScrollComponent = (function () {
    function HorizontalScrollComponent(document, pageScrollService) {
        this.document = document;
        this.pageScrollService = pageScrollService;
    }
    HorizontalScrollComponent.prototype.scrollHorizontalStart = function () {
        var pageScrollInstance = __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["a" /* PageScrollInstance */].simpleInlineDirectionInstance(this.document, '#horizontalContainerStart', this.container.nativeElement, false);
        this.pageScrollService.start(pageScrollInstance);
    };
    HorizontalScrollComponent.prototype.scrollHorizontal = function () {
        var pageScrollInstance = __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["a" /* PageScrollInstance */].simpleInlineDirectionInstance(this.document, '#inHorizontalContainer', this.container.nativeElement, false);
        this.pageScrollService.start(pageScrollInstance);
    };
    HorizontalScrollComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('container'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], HorizontalScrollComponent.prototype, "container", void 0);
    HorizontalScrollComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-horizontal-scroll',
            template: __webpack_require__(816),
            styles: [__webpack_require__(809)]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DOCUMENT */])), 
        __metadata('design:paramtypes', [Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["b" /* PageScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2_ng2_page_scroll__["b" /* PageScrollService */]) === 'function' && _b) || Object])
    ], HorizontalScrollComponent);
    return HorizontalScrollComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/horizontal-scroll.component.js.map

/***/ },

/***/ 433:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_page_scroll__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(24);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NestedScrollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var NestedScrollComponent = (function () {
    function NestedScrollComponent(document, pageScrollService) {
        this.document = document;
        this.pageScrollService = pageScrollService;
    }
    NestedScrollComponent.prototype.ngOnInit = function () {
    };
    NestedScrollComponent.prototype.scrollInside = function () {
        var pageScrollInstance = __WEBPACK_IMPORTED_MODULE_1_ng2_page_scroll__["a" /* PageScrollInstance */].simpleInlineInstance(this.document, '#inContainer', this.container.nativeElement);
        this.pageScrollService.start(pageScrollInstance);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_1" /* ViewChild */])('container'), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* ElementRef */]) === 'function' && _a) || Object)
    ], NestedScrollComponent.prototype, "container", void 0);
    NestedScrollComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-nested-scroll',
            template: __webpack_require__(817),
            styles: [__webpack_require__(810)]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["e" /* DOCUMENT */])), 
        __metadata('design:paramtypes', [Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_page_scroll__["b" /* PageScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1_ng2_page_scroll__["b" /* PageScrollService */]) === 'function' && _b) || Object])
    ], NestedScrollComponent);
    return NestedScrollComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/nested-scroll.component.js.map

/***/ },

/***/ 434:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(244);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return PathologicalTestsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var PathologicalTestsComponent = (function () {
    function PathologicalTestsComponent(document, renderer, snackBar) {
        this.document = document;
        this.renderer = renderer;
        this.snackBar = snackBar;
    }
    PathologicalTestsComponent.prototype.ngOnInit = function () {
    };
    PathologicalTestsComponent.prototype.scheduleInterrupt = function () {
        var _this = this;
        setTimeout(function () {
            var event = new WheelEvent('mousewheel', { bubbles: true });
            _this.renderer.invokeElementMethod(_this.document.body, 'dispatchEvent', [event]);
        }, 500);
    };
    PathologicalTestsComponent.prototype.doSmth = function (reachedTarget) {
        var text;
        if (reachedTarget) {
            text = 'Yeah, we reached our destination';
        }
        else {
            text = 'Ohoh, something interrupted us';
        }
        this.snackBar.open(text, 'Ok');
    };
    PathologicalTestsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-pathological-tests',
            template: __webpack_require__(818),
            styles: [__webpack_require__(811)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__angular_material__["MdSnackBar"]]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DOCUMENT */])), 
        __metadata('design:paramtypes', [Object, (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Renderer */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* Renderer */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["MdSnackBar"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_material__["MdSnackBar"]) === 'function' && _b) || Object])
    ], PathologicalTestsComponent);
    return PathologicalTestsComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/pathological-tests.component.js.map

/***/ },

/***/ 435:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_page_scroll__ = __webpack_require__(180);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SimpleScrollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var SimpleScrollComponent = (function () {
    function SimpleScrollComponent(document, pageScrollService, snackBar) {
        this.document = document;
        this.pageScrollService = pageScrollService;
        this.snackBar = snackBar;
        this.array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        this.myEasing = {
            ease: function (t, b, c, d) {
                // easeInOutExpo easing
                if (t === 0)
                    return b;
                if (t === d)
                    return b + c;
                if ((t /= d / 2) < 1)
                    return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };
    }
    SimpleScrollComponent.prototype.ngOnInit = function () {
    };
    SimpleScrollComponent.prototype.goToLastHeading = function () {
        var pageScrollInstance = __WEBPACK_IMPORTED_MODULE_3_ng2_page_scroll__["a" /* PageScrollInstance */].simpleInstance(this.document, '#head15');
        this.pageScrollService.start(pageScrollInstance);
    };
    SimpleScrollComponent.prototype.doSmth = function (reachedTarget) {
        var text;
        if (reachedTarget) {
            text = 'Yeah, we reached our destination';
        }
        else {
            text = 'Ohoh, something interrupted us';
        }
        this.snackBar.open(text, 'Ok');
    };
    SimpleScrollComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-simple-scroll',
            template: __webpack_require__(819),
            styles: [__webpack_require__(812)],
            providers: [__WEBPACK_IMPORTED_MODULE_2__angular_material__["MdSnackBar"]]
        }),
        __param(0, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["e" /* DOCUMENT */])), 
        __metadata('design:paramtypes', [Object, (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_page_scroll__["b" /* PageScrollService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3_ng2_page_scroll__["b" /* PageScrollService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["MdSnackBar"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_material__["MdSnackBar"]) === 'function' && _b) || Object])
    ], SimpleScrollComponent);
    return SimpleScrollComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/simple-scroll.component.js.map

/***/ },

/***/ 436:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TranslatedTargetScrollComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TranslatedTargetScrollComponent = (function () {
    function TranslatedTargetScrollComponent() {
        this.array = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
    TranslatedTargetScrollComponent.prototype.ngOnInit = function () {
    };
    TranslatedTargetScrollComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-translated-target-scroll',
            template: __webpack_require__(820),
            styles: [__webpack_require__(813)]
        }), 
        __metadata('design:paramtypes', [])
    ], TranslatedTargetScrollComponent);
    return TranslatedTargetScrollComponent;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/translated-target-scroll.component.js.map

/***/ },

/***/ 490:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 490;


/***/ },

/***/ 491:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(650);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/main.js.map

/***/ },

/***/ 649:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(169);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(router) {
        var _this = this;
        this.router = router;
        this.currentTabIndex = 0;
        this.links = [
            {
                route: ['/'],
                name: 'Home'
            },
            {
                route: ['/simple'],
                name: 'Simple Scrolling'
            },
            {
                route: ['/nested'],
                name: 'Nested Scrolling'
            },
            {
                route: ['/horizontal'],
                name: 'Horizontal Scrolling'
            },
            {
                route: ['/translated'],
                name: 'Transformed Target Scrolling'
            }];
        router.events.subscribe(function (event) {
            // see also
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationEnd */]) {
                _this.links.forEach(function (link, index) {
                    if (router.isActive(router.createUrlTree(link.route), false)) {
                        _this.currentTabIndex = index;
                    }
                });
            }
        });
    }
    AppComponent.prototype.tabChange = function (event) {
        // Select the correct route for that tab
        var routeObj = this.links[event.index];
        if (routeObj && routeObj.route) {
            this.router.navigate(routeObj.route);
        }
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(814),
            styles: [__webpack_require__(807)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* Router */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/app.component.js.map

/***/ },

/***/ 650:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_page_scroll__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__(651);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__simple_scroll_simple_scroll_component__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__nested_scroll_nested_scroll_component__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__translated_target_scroll_translated_target_scroll_component__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pathological_tests_pathological_tests_component__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__horizontal_scroll_horizontal_scroll_component__ = __webpack_require__(432);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["f" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["e" /* RouterModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_5__angular_material__["MaterialModule"].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ng2_page_scroll__["c" /* Ng2PageScrollModule */].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__simple_scroll_simple_scroll_component__["a" /* SimpleScrollComponent */],
                __WEBPACK_IMPORTED_MODULE_11__nested_scroll_nested_scroll_component__["a" /* NestedScrollComponent */],
                __WEBPACK_IMPORTED_MODULE_12__translated_target_scroll_translated_target_scroll_component__["a" /* TranslatedTargetScrollComponent */],
                __WEBPACK_IMPORTED_MODULE_13__pathological_tests_pathological_tests_component__["a" /* PathologicalTestsComponent */],
                __WEBPACK_IMPORTED_MODULE_14__horizontal_scroll_horizontal_scroll_component__["a" /* HorizontalScrollComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__app_routes__["b" /* appRoutingProviders */]
            ],
            bootstrap: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/app.module.js.map

/***/ },

/***/ 651:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__simple_scroll_simple_scroll_component__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home_component__ = __webpack_require__(431);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__nested_scroll_nested_scroll_component__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__translated_target_scroll_translated_target_scroll_component__ = __webpack_require__(436);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pathological_tests_pathological_tests_component__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__horizontal_scroll_horizontal_scroll_component__ = __webpack_require__(432);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return appRoutingProviders; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routing; });
/**
 * Created by sebastianfuss on 03.09.16.
 */







var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__home_home_component__["a" /* HomeComponent */] },
    { path: 'simple', component: __WEBPACK_IMPORTED_MODULE_1__simple_scroll_simple_scroll_component__["a" /* SimpleScrollComponent */] },
    { path: 'nested', component: __WEBPACK_IMPORTED_MODULE_3__nested_scroll_nested_scroll_component__["a" /* NestedScrollComponent */] },
    { path: 'translated', component: __WEBPACK_IMPORTED_MODULE_4__translated_target_scroll_translated_target_scroll_component__["a" /* TranslatedTargetScrollComponent */] },
    { path: 'horizontal', component: __WEBPACK_IMPORTED_MODULE_6__horizontal_scroll_horizontal_scroll_component__["a" /* HorizontalScrollComponent */] },
    { path: 'tests', component: __WEBPACK_IMPORTED_MODULE_5__pathological_tests_pathological_tests_component__["a" /* PathologicalTestsComponent */] },
    { path: '**', redirectTo: '/' },
];
var appRoutingProviders = [];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["e" /* RouterModule */].forRoot(routes);
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/app.routes.js.map

/***/ },

/***/ 652:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/environment.js.map

/***/ },

/***/ 653:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(661);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(658);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(666);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(668);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(850);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/sebastianfuss/Projekte/Internet/ng2-page-scroll/demo/src/polyfills.js.map

/***/ },

/***/ 807:
/***/ function(module, exports) {

module.exports = "* /deep/ md-tab-group .md-tab-label {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n\nfooter {\n    text-align: center;\n}\n"

/***/ },

/***/ 808:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 809:
/***/ function(module, exports) {

module.exports = ".scroll-box {\n    overflow: auto;\n}\n\n.scroll-box > div {\n    height: 250px;\n    width: 5500px;\n    overflow: auto;\n    position: relative;\n}\n"

/***/ },

/***/ 810:
/***/ function(module, exports) {

module.exports = "#container {\n    height: 100px;\n    overflow: auto;\n    position: relative;\n}"

/***/ },

/***/ 811:
/***/ function(module, exports) {

module.exports = ".spaceholder {\n    margin: 1rem 25%;\n    width: 50%;\n    height: 2500px;\n    background-color: #3f51b5;\n}\n"

/***/ },

/***/ 812:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 813:
/***/ function(module, exports) {

module.exports = ".target-holder {\n    height: 300px;\n}\n\n.transform { /* IE 9 */\n    -webkit-transform: translate(50px, 100px) rotate(20deg); /* Safari */\n    transform: translate(50px, 100px) rotate(20deg);\n}\n"

/***/ },

/***/ 814:
/***/ function(module, exports) {

module.exports = "<div class=\"app-content\" id=\"top\">\n\n    <md-toolbar>\n        <span>ng2-page-scroll demo application</span>\n    </md-toolbar>\n\n    <md-tab-group (selectChange)=\"tabChange($event)\" [selectedIndex]=\"currentTabIndex\">\n        <md-tab *ngFor=\"let link of links\" label=\"{{ link.name }}\"></md-tab>\n    </md-tab-group>\n\n    <!-- Routed views go here -->\n    <router-outlet></router-outlet>\n\n    <footer>\n        <p><a href=\"#top\" pageScroll>Go to Top</a></p>\n    </footer>\n</div>\n"

/***/ },

/***/ 815:
/***/ function(module, exports) {

module.exports = "<md-card>\n    <md-card-title id=\"title\">NgPageScroll Demo application</md-card-title>\n    <p>\n        This small demo application showcases the usage of the ng2-page-scroll library. Please refer to the <a\n            href=\"https://github.com/Nolanus/ng2-page-scroll#readme\" target=\"_blank\">Readme for documentation and\n        instructions</a>. Whenever you encounter an error or have a suggestion for enhancement, don't hesitate to <a\n            target=\"_blank\" href=\"https://github.com/Nolanus/ng2-page-scroll/issues/new\">file an issue</a> at the <a\n            target=\"_blank\" href=\"https://github.com/Nolanus/ng2-page-scroll\">project repo on GitHub</a>.\n    </p>\n</md-card>\n\n<md-card>\n    <p>\n        These two buttons have a \"routerLink\" and \"href\" attribute set. In combination with the pageScroll directive\n        this results in a press opening the new route and scrolling to the referred DOM element.\n    </p>\n    <button routerLink=\"/simple\" md-raised-button color=\"primary\" href=\"#head1\" pageScroll>\n        Scroll to first heading on \"simple scrolling\" page\n    </button>\n\n    <button routerLink=\"/simple\" md-raised-button color=\"primary\" href=\"#head3\" pageScroll>\n        Scroll to third heading on \"simple scrolling\" page\n    </button>\n</md-card>\n"

/***/ },

/***/ 816:
/***/ function(module, exports) {

module.exports = "<md-card>\n    <md-card-title id=\"title\">Horizontal scrolling</md-card-title>\n    <p>\n        Showcasing the horizontal scrolling inside a custom container. Triggering is done using the scroll service.\n    </p>\n    <button md-button (click)=\"scrollHorizontal()\" id=\"startHorizontalScrollingButton\">scroll inside the card</button>\n    <button md-button (click)=\"scrollHorizontalStart()\" id=\"startHorizontalStartScrollingButton\">scroll back to start\n    </button>\n</md-card>\n\n<md-card>\n    <md-card-title>A card</md-card-title>\n    <md-card-content #container class=\"scroll-box\">\n        <div>\n            <p id=\"horizontalContainerStart\">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy\n                eirmod tempor invidunt ut labore\n                et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea\n                rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum\n                dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore\n                magna aliquyam erat, sed diam voluptua. <b id=\"inHorizontalContainer\">Here's our scroll Target</b>. At\n                vero eos et\n                accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem\n                ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod\n                tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et\n                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor\n                sit amet.</p>\n\n            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore\n                eu\n                feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum\n                zzril\n                delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing\n                elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>\n\n            <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex\n                ea\n                commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie\n                consequat,\n                vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit\n                praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>\n\n            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore\n                et\n                dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.\n                Stet\n                clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit\n                amet,\n                consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam\n                erat,\n                sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,\n                no\n                sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n                elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam\n                voluptua. At\n                vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus\n                est\n                Lorem ipsum dolor sit amet.</p>\n\n            <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore\n                eu\n                feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum\n                zzril\n                delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing\n                elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>\n        </div>\n    </md-card-content>\n</md-card>"

/***/ },

/***/ 817:
/***/ function(module, exports) {

module.exports = "<md-card>\n    <md-card-title id=\"title\">Nested scrolling</md-card-title>\n    <p>\n        Showcasing the scrolling inside a custom container. Triggering is done using the scroll service.\n    </p>\n    <button md-button (click)=\"scrollInside()\" id=\"startNestedScrollingButton\">scroll inside the card</button>\n</md-card>\n\n<md-card>\n    <md-card-title>A card</md-card-title>\n    <md-card-content #container id=\"container\">\n        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et\n            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet\n            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no\n            sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At\n            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est\n            Lorem ipsum dolor sit amet.</p>\n\n        <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu\n            feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril\n            delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing\n            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>\n\n        <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea\n            commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,\n            vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit\n            praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>\n\n        <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer\n            possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod\n            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci\n            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>\n\n        <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu\n            feugiat nulla facilisis.</p>\n\n        <button md-raised-button color=\"warn\" id=\"inContainer\">A button inside the container</button>\n\n        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et\n            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet\n            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,\n            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,\n            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no\n            sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing\n            elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At\n            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est\n            Lorem ipsum dolor sit amet.</p>\n\n        <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu\n            feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril\n            delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing\n            elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>\n\n        <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea\n            commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat,\n            vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit\n            praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>\n\n        <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer\n            possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod\n            tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci\n            tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</p>\n\n        <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu\n            feugiat nulla facilisis.</p>\n    </md-card-content>\n</md-card>"

/***/ },

/***/ 818:
/***/ function(module, exports) {

module.exports = "<md-card>\n    <h1>\"Pathological\" examples</h1>\n    <p>The following buttons do not perform proper scroll animation but are there to showcase the behavior in edge cases\n        or to be used in e2e tests.</p>\n    <button md-raised-button color=\"primary\" href=\"#head404\" [pageScrollDuration]=\"350\" pageScroll\n            (pageScrollFinish)=\"doSmth($event)\"\n            id=\"nonExistingTargetButton\">\n        Scroll to non existing target\n    </button>\n    <button md-raised-button color=\"primary\" href=\"#scrollTarget\" pageScroll id=\"interruptScroll\"\n            (pageScrollFinish)=\"doSmth($event)\"\n            (click)=\"scheduleInterrupt()\">\n        Start scroll but interrupt it\n    </button>\n    <button md-raised-button color=\"primary\" href=\"#top\" pageScroll id=\"alreadyAtTargetScroll\"\n            (pageScrollFinish)=\"doSmth($event)\">\n        Scroll to target already at the top\n    </button>\n\n    <div class=\"spaceholder\">\n\n    </div>\n    <p id=\"scrollTarget\">scroll target</p>\n</md-card>"

/***/ },

/***/ 819:
/***/ function(module, exports) {

module.exports = "<md-card>\n    <md-card-title id=\"head1\">Simple Scrolling</md-card-title>\n    <p>\n        On this page you may find some basic scroll operations using the directive and using the service.\n    </p>\n</md-card>\n\n<!-- Buttons -->\n<md-card>\n    <p>All the following buttons scroll to the seventh heading but with different configuration.</p>\n\n    <h3>Non-Interruptible, custom duration</h3>\n    <p>This button has a custom animation duration of 5 seconds and is specified to be non-interrupbtible. Try scrolling\n        or using the arrow keys while the scroll animation takes place.</p>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll [pageScrollInterruptible]=\"false\"\n            [pageScrollDuration]=\"5000\" id=\"testButton\">\n        Start\n    </button>\n\n    <h3>Target Offset</h3>\n    <p>These two buttons trigger a scroll animation with a custom offset to the target. One will stop 150px atop the\n        target, the second one 50px below the target.</p>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll [pageScrollOffset]=\"150\" id=\"offsetButton\">\n        Offset 150px\n    </button>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll [pageScrollOffset]=\"-50\"\n            id=\"negativeOffsetButton\">\n        Offset -50px\n    </button>\n\n    <h3>Scroll target with router to current page</h3>\n    <p>The following scroll animation refers to a scroll target on the current page and includes the routerLink\n        directive pointing to the current page. Each button uses a different routerLink syntax.</p>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll routerLink=\"/simple\" id=\"currentRouteScroll1\">\n        Start 1\n    </button>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll [routerLink]=\"['/simple']\" id=\"currentRouteScroll2\">\n        Start 2\n    </button>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll [routerLink]=\"['/simple', {foo: 'bar'}]\" id=\"currentRouteScroll3\">\n        Start 3\n    </button>\n\n    <h3>Finish event</h3>\n    <p>The following scroll animation has a custom duration of 350ms and a <code>pageScrollFinish</code> event listener\n        attached and shows a snackbar\n        at the bottom of the page when the event fires.</p>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll (pageScrollFinish)=\"doSmth($event)\"\n            [pageScrollDuration]=\"350\" id=\"finishEventButton\">\n        Start\n    </button>\n\n    <h3>Custom easing</h3>\n    <p>You may specify a custom easing function to manipulate the scroll position over time. This example uses an <i>easeInOutExpo</i>\n        function.</p>\n    <button md-raised-button color=\"primary\" href=\"#head7\" pageScroll [pageScrollEasing]=\"myEasing\"\n            id=\"customEasingButton\">\n        Start\n    </button>\n\n    <h3>Scrolling using <i>PageScrollService</i></h3>\n    <p>You may use the <i>PageScrollService</i> to create highly customized scroll animations. This example will scroll\n        to the last heading of this page.</p>\n    <a (click)=\"goToLastHeading()\" md-button color=\"primary\" id=\"goToLastHeadingButton\">\n        Go to last heading (done via service)\n    </a>\n\n</md-card>\n\n<md-card *ngFor=\"let num of array; let isLast = last\">\n    <md-card-title id=\"head{{ num }}\">Prioris generis {{ num }}</md-card-title>\n    <md-card-content>\n        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum\n            tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas\n            semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien\n            ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.\n            Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac\n            dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus,\n            tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,\n            tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>\n    </md-card-content>\n    <md-card-actions>\n        <a href=\"#head{{ num - 1 }}\" md-button pageScroll>Go to previous</a>\n        <a *ngIf=\"!isLast\" href=\"#head{{ num + 1 }}\" pageScroll md-button>Go to next</a>\n    </md-card-actions>\n</md-card>\n"

/***/ },

/***/ 820:
/***/ function(module, exports) {

module.exports = "<md-card>\n    <md-card-title id=\"title\">Transformed Target scrolling</md-card-title>\n    <p>\n        Scrolling to a target that has been transformed using CSS.\n    </p>\n    <button md-raised-button color=\"primary\" href=\"#untranslated\" pageScroll>\n        Scroll to regular button\n    </button>\n    <button md-raised-button color=\"primary\" href=\"#translated\" pageScroll>\n        Scroll to transformend/translated button\n    </button>\n</md-card>\n<md-card>\n    <md-card-title id=\"head2\">Lorem ipsum 2</md-card-title>\n    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor\n        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean\n        ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.\n        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget\n        tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis\n        pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu\n        vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis\n        luctus, metus</p>\n    <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor\n        quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean\n        ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.\n        Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget\n        tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis\n        pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu\n        vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis\n        luctus, metus</p>\n</md-card>\n\n<md-card>\n    <div class=\"target-holder\">\n        <button md-raised-button id=\"untranslated\" href=\"#top\" pageScroll>\n            Regular button\n        </button>\n        <button md-raised-button id=\"translated\" class=\"transform\" href=\"#top\" pageScroll>\n            CSS transformed button\n        </button>\n    </div>\n</md-card>\n\n\n<md-card *ngFor=\"let num of array\">\n    <md-card-title id=\"head{{ num }}\">Lorem ipsum  {{ num }}</md-card-title>\n    <md-card-content>\n        <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum\n            tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas\n            semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien\n            ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi.\n            Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac\n            dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus,\n            tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi,\n            tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>\n    </md-card-content>\n</md-card>\n"

/***/ },

/***/ 851:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(491);


/***/ }

},[851]);
//# sourceMappingURL=main.bundle.map