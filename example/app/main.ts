import {enableProdMode} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {APP_ROUTER_PROVIDERS} from './app.routes';

import {AppComponent} from './app.component';

//enableProdMode();
bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    //{ provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch(err => console.error(err));
