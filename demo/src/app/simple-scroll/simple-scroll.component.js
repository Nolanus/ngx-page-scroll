"use strict";
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
var core_1 = require('@angular/core');
var ng2_page_scroll_1 = require('ng2-page-scroll');
var platform_browser_1 = require('@angular/platform-browser');
var SimpleScrollComponent = (function () {
    function SimpleScrollComponent(document, pageScrollService) {
        this.document = document;
        this.pageScrollService = pageScrollService;
        this.array = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
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
        var pageScrollInstance = ng2_page_scroll_1.PageScrollInstance.simpleInstance(this.document, '#head11');
        this.pageScrollService.start(pageScrollInstance);
    };
    SimpleScrollComponent.prototype.doSmth = function (reachedTarget) {
        if (reachedTarget) {
            alert('Yeah, we reached our destination');
        }
        else {
            alert('Ohoh, something interrupted us');
        }
    };
    SimpleScrollComponent = __decorate([
        core_1.Component({
            selector: 'app-simple-scroll',
            templateUrl: './simple-scroll.component.html',
            styleUrls: ['./simple-scroll.component.css']
        }),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Document, (typeof (_a = typeof ng2_page_scroll_1.PageScrollService !== 'undefined' && ng2_page_scroll_1.PageScrollService) === 'function' && _a) || Object])
    ], SimpleScrollComponent);
    return SimpleScrollComponent;
    var _a;
}());
exports.SimpleScrollComponent = SimpleScrollComponent;
//# sourceMappingURL=simple-scroll.component.js.map