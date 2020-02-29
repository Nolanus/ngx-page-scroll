import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
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
