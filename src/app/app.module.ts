import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CdsModule } from '@cds/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { FavListComponent } from './components/fav-list/fav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
