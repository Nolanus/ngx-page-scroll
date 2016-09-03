import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

// Material 2
import {MdCoreModule} from '@angular2-material/core';
import {MdButtonModule} from '@angular2-material/button';
import {MdCardModule} from '@angular2-material/card';
import {MdToolbarModule} from '@angular2-material/toolbar';

// Ng2PageScroll
import {Ng2PageScrollModule, PageScroll, PageScrollService} from 'ng2-page-scroll';

import {routing} from './app.routes';
import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent,
        PageScroll
    ],
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpModule,
        routing,
        MdCoreModule,
        MdButtonModule,
        MdCardModule,
        MdToolbarModule,
        //Ng2PageScrollModule
    ],
    providers: [PageScrollService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
