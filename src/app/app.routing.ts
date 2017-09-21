
import {ModuleWithProviders} from '@angular/core'; 
import {Routes, RouterModule} from '@angular/router';

import {RestaurantesListComponent} from "./components/restaurantes-list.component";
import {RestauranteDetailComponent} from "./components/restaurantes-detail.component";
import {RestauranteAddComponent} from "./components/restaurantes-add.component";
import {RestauranteEditComponent} from "./components/restaurantes-edit.component";


const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/',
		pathMatch: 'full'
	},
	{path: '', component: RestaurantesListComponent},
	{path: 'restaurante/:id', component: RestauranteDetailComponent},
	{path: 'crear-restaurante', component: RestauranteAddComponent},
	{path: 'editar-restaurante/:id', component: RestauranteEditComponent},
	{path: 'donde-como-hoy/:random', component: RestauranteDetailComponent},
];

export const appRouterProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);