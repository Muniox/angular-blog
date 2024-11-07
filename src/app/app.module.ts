import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { WritePostModule } from './modules/write-post/write-post.module';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { FooterComponent, NavbarComponent } from './layout';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FooterComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    // HomeModule,
    // CoreModule,
    AppRoutingModule,
    // SharedModule,
    WritePostModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
