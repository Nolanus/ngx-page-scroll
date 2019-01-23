import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SimpleScrollComponent } from './simple-scroll/simple-scroll.component';
import { NamespaceScrollComponent } from './namespace-scroll/namespace-scroll.component';
import { RouterScrollComponent } from './router-scroll/router-scroll.component';
import { HorizontalScrollComponent } from './horizontal-scroll/horizontal-scroll.component';
import { PathologicalTestsComponent } from './pathological-tests/pathological-tests.component';
import { TranslatedTargetScrollComponent } from './translated-target-scroll/translated-target-scroll.component';
import { NestedScrollComponent } from './nested-scroll/nested-scroll.component';
import { DummyCardComponent } from './dummy-card/dummy-card.component';
import { DummyContentComponent } from './dummy-content/dummy-content.component';
import { ScrollDialogComponent } from './nested-scroll/scroll.dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimpleScrollComponent,
    NestedScrollComponent,
    TranslatedTargetScrollComponent,
    PathologicalTestsComponent,
    HorizontalScrollComponent,
    RouterScrollComponent,
    NamespaceScrollComponent,
    DummyCardComponent,
    DummyContentComponent,
    ScrollDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPageScrollCoreModule.forRoot({_logLevel: 3}),
    NgxPageScrollModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatChipsModule,
    FlexLayoutModule,
  ],
  providers: [],
  entryComponents: [ScrollDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
}
