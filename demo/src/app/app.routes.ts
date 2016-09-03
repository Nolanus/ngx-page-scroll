/**
 * Created by sebastianfuss on 03.09.16.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import {AppComponent} from "./app.component";

const routes: Routes = [
    // Root
    { path: '', component: AppComponent},
];

// - Updated Export
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);