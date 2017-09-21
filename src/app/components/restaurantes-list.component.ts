import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {RestauranteService} from "../services/restaurantes.service"
import {Restaurante} from "../model/restaurante"

@Component({
	selector: "restaurantes-list",
	templateUrl: "../view/restaurantes-list.html",	
	providers: [RestauranteService],
})

export class RestaurantesListComponent implements OnInit {
	public titulo:string = "Listado de restaurantes";
	public restaurantes: Restaurante[];
	public status: string;
	public errorMessage:any;
	public confirmado;
	public loading;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService
	){}

	ngOnInit(){
		this.loading = 'show';
		this.getRestaurantes();		
		//console.log("Componente cargado");
	}

	getRestaurantes(){
		this._restauranteService.getRestaurantes()
								.subscribe(
									result => {
										this.restaurantes = result.data;
										this.status = result.status;

										if(this.status !== "success"){
											alert("Error en el servidor")
										}

										this.loading = 'hide';
										
									},
									error => {
										this.errorMessage = <any>error
										if(this.errorMessage !== null){
											console.log(this.errorMessage);
											alert("Error en la peticion")
										}
									}		
								);
	}


	onBorrarConfir(id){
		this.confirmado = id;
	}

	onCancelar(){
		this.confirmado = null;
	}


	onBorrar(id){
		this._restauranteService.deleteRestaurante(id)
								.subscribe(
									result => {
										this.status = result.status;

										if(this.status !== "success"){
											alert("Error en el servidor")
										}
										this.getRestaurantes();										
										
									},
									error => {
										this.errorMessage = <any>error
										if(this.errorMessage !== null){
											console.log(this.errorMessage);
											alert("Error en la peticion")
										}
									}		
								);
	}
}

