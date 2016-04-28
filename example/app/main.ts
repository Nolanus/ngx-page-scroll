import {bootstrap}    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {LocationStrategy, HashLocationStrategy} from 'angular2/platform/common';
import {AppComponent} from './app.component';
import {provide} from 'angular2/core';

bootstrap(AppComponent, [ROUTER_PROVIDERS/*, provide(LocationStrategy, {useClass: HashLocationStrategy})*/]);
