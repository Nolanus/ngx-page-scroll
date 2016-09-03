import {enableProdMode} from '@angular/core';
import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {APP_ROUTER_PROVIDERS} from './app.routes';

import {AppComponent} from './app.component';
import {PageScrollService} from 'ng2-page-scroll';

//enableProdMode();
bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    PageScrollService,
    //{ provide: LocationStrategy, useClass: HashLocationStrategy }
]).catch((err: any) => console.error(err));
