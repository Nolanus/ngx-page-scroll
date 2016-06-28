import {provideRouter, RouterConfig} from '@angular/router';

import {FrontComponent} from './front.component';
import {LipsumComponent} from './lipsum.component';
import {ContactComponent} from './contact.component';

export const routes: RouterConfig = [
    {path: '', component: FrontComponent},
    {path: 'about', component: LipsumComponent},
    {path: 'contact', component: ContactComponent}
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
