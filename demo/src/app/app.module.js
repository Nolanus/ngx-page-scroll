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
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
// Material 2
var core_2 = require('@angular2-material/core');
var button_1 = require('@angular2-material/button');
var list_1 = require('@angular2-material/list');
var card_1 = require('@angular2-material/card');
var toolbar_1 = require('@angular2-material/toolbar');
// Ng2PageScroll
var ng2_page_scroll_1 = require('ng2-page-scroll');
// App specific
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./app.component');
var simple_scroll_component_1 = require('./simple-scroll/simple-scroll.component');
var home_component_1 = require('./home/home.component');
var nested_scroll_component_1 = require('./nested-scroll/nested-scroll.component');
var translated_target_scroll_component_1 = require('./translated-target-scroll/translated-target-scroll.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routes_1.routing,
                core_2.MdCoreModule,
                button_1.MdButtonModule,
                list_1.MdListModule,
                card_1.MdCardModule,
                toolbar_1.MdToolbarModule,
                ng2_page_scroll_1.Ng2PageScrollModule
            ],
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                simple_scroll_component_1.SimpleScrollComponent,
                nested_scroll_component_1.NestedScrollComponent,
                translated_target_scroll_component_1.TranslatedTargetScrollComponent
            ],
            providers: [
                app_routes_1.appRoutingProviders
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map