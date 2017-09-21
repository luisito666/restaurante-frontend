import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule} from '@angular/http';
import { FormsModule } from '@angular/forms';



import { AppComponent }  from './app.component';
import { routing, appRouterProviders } from './app.routing';


import {RestaurantesListComponent} from "./components/restaurantes-list.component";
import {RestauranteDetailComponent} from "./components/restaurantes-detail.component";
import {RestauranteAddComponent} from "./components/restaurantes-add.component";
import {RestauranteEditComponent} from "./components/restaurantes-edit.component";
 
@NgModule({
  imports:      [ BrowserModule, HttpModule, FormsModule, routing ],
  declarations: [ 
  					AppComponent,
  					RestaurantesListComponent, 
  					RestauranteDetailComponent,
  					RestauranteEditComponent,
  					RestauranteAddComponent
  				],
  providers: [ appRouterProviders],
  bootstrap:    [ AppComponent ]
})
 
export class AppModule { }