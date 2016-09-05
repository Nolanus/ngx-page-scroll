import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

// Material 2
import {MdCoreModule} from '@angular2-material/core';
import {MdButtonModule} from '@angular2-material/button';
import {MdListModule} from '@angular2-material/list';
import {MdCardModule} from '@angular2-material/card';
import {MdToolbarModule} from '@angular2-material/toolbar';

// Ng2PageScroll
import {Ng2PageScrollModule} from 'ng2-page-scroll';

// App specific
import {routing, appRoutingProviders} from './app.routes';
import {AppComponent} from './app.component';
import {SimpleScrollComponent} from './simple-scroll/simple-scroll.component';
import {HomeComponent} from './home/home.component';
import {NestedScrollComponent} from './nested-scroll/nested-scroll.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpModule,
        routing,
        MdCoreModule,
        MdButtonModule,
        MdListModule,
        MdCardModule,
        MdToolbarModule,
        Ng2PageScrollModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SimpleScrollComponent,
        NestedScrollComponent
    ],
    providers: [
        appRoutingProviders
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
