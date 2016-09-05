/**
 * Created by sebastianfuss on 03.09.16.
 */

import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Components
import {SimpleScrollComponent} from './simple-scroll/simple-scroll.component';
import {HomeComponent} from "./home/home.component";
import {NestedScrollComponent} from "./nested-scroll/nested-scroll.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'simple', component: SimpleScrollComponent},
    {path: 'nested', component: NestedScrollComponent},
];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);