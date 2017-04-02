import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

// Material 2
import {MaterialModule} from '@angular/material';

// Angular Flex-Layout Library
import {FlexLayoutModule} from '@angular/flex-layout';

// Ng2PageScroll
import {Ng2PageScrollModule} from 'ng2-page-scroll';

// App specific
import {routing, appRoutingProviders} from './app.routes';
import {AppComponent} from './app.component';
import {SimpleScrollComponent} from './simple-scroll/simple-scroll.component';
import {HomeComponent} from './home/home.component';
import {NestedScrollComponent} from './nested-scroll/nested-scroll.component';
import {TranslatedTargetScrollComponent} from './translated-target-scroll/translated-target-scroll.component';
import { PathologicalTestsComponent } from './pathological-tests/pathological-tests.component';
import { HorizontalScrollComponent } from './horizontal-scroll/horizontal-scroll.component';
import { RouterScrollComponent } from './router-scroll/router-scroll.component';
import { DummyContentComponent } from './dummy-content/dummy-content.component';
import { NamespaceScrollComponent } from './namespace-scroll/namespace-scroll.component';
import { DummyCardComponent } from './dummy-card/dummy-card.component';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FormsModule,
        HttpModule,
        routing,
        MaterialModule,
        FlexLayoutModule,
        Ng2PageScrollModule.forRoot()
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        SimpleScrollComponent,
        NestedScrollComponent,
        TranslatedTargetScrollComponent,
        PathologicalTestsComponent,
        HorizontalScrollComponent,
        RouterScrollComponent,
        DummyContentComponent,
        NamespaceScrollComponent,
        DummyCardComponent
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
