import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NgxPageScrollModule } from 'ngx-page-scroll';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SimpleScrollComponent } from './simple-scroll/simple-scroll.component';
import { NestedScrollComponent } from './nested-scroll/nested-scroll.component';
import { TranslatedTargetScrollComponent } from './translated-target-scroll/translated-target-scroll.component';
import { HorizontalScrollComponent } from './horizontal-scroll/horizontal-scroll.component';
import { RouterScrollComponent } from './router-scroll/router-scroll.component';
import { NamespaceScrollComponent } from './namespace-scroll/namespace-scroll.component';
import { PathologicalTestsComponent } from './pathological-tests/pathological-tests.component';
import { DummyCardComponent } from './dummy-card/dummy-card.component';
import { DummyContentComponent } from './dummy-content/dummy-content.component';
import { ScrollDialogComponent } from './scroll-dialog/scroll-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SimpleScrollComponent,
    NestedScrollComponent,
    TranslatedTargetScrollComponent,
    HorizontalScrollComponent,
    RouterScrollComponent,
    NamespaceScrollComponent,
    PathologicalTestsComponent,
    DummyCardComponent,
    DummyContentComponent,
    ScrollDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    NgxPageScrollModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}