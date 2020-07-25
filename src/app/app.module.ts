import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleScrollComponent } from './simple-scroll/simple-scroll.component';
import { RouterScrollComponent } from './router-scroll/router-scroll.component';
import { TranslatedTargetScrollComponent } from './translated-target-scroll/translated-target-scroll.component';
import { PathologicalTestsComponent } from './pathological-tests/pathological-tests.component';
import { NestedScrollComponent } from './nested-scroll/nested-scroll.component';
import { NamespaceScrollComponent } from './namespace-scroll/namespace-scroll.component';
import { HorizontalScrollComponent } from './horizontal-scroll/horizontal-scroll.component';
import { HomeComponent } from './home/home.component';
import { DummyContentComponent } from './dummy-content/dummy-content.component';
import { DummyCardComponent } from './dummy-card/dummy-card.component';
import { ScrollDialogComponent } from './scroll-dialog/scroll-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SimpleScrollComponent,
    RouterScrollComponent,
    TranslatedTargetScrollComponent,
    PathologicalTestsComponent,
    NestedScrollComponent,
    NamespaceScrollComponent,
    HorizontalScrollComponent,
    HomeComponent,
    DummyContentComponent,
    DummyCardComponent,
    ScrollDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    NgxPageScrollModule,
    MatChipsModule,
    MatButtonModule,
    FlexModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ScrollDialogComponent],
})
export class AppModule {
}
