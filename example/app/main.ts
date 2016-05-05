import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ROUTER_PROVIDERS} from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppComponent} from './app.component';
import {provide} from '@angular/core';

bootstrap(AppComponent, [ROUTER_PROVIDERS/*, provide(LocationStrategy, {useClass: HashLocationStrategy})*/]);
