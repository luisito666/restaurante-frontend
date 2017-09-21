import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {RestauranteService} from "../services/restaurantes.service"
import {Restaurante} from "../model/restaurante"

@Component({
	selector: "restaurantes-detail",
	templateUrl: "../view/restaurante-detail.html",
	providers: [RestauranteService]
})

export class RestauranteDetailComponent implements OnInit {	
	public restaurante: Restaurante[];
	public errorMessage: string;
	public status: string;
	

	constructor(
		private _restauranteService: RestauranteService,
		private _route: ActivatedRoute,
		private _router: Router,
	){}

	ngOnInit(){		
		this.getRestaurante();
	}	

	getRestaurante(){
		this._route.params.forEach( (params: Params) =>  {
			let id = params['id'];
			let random = params['random'];

			this._restauranteService.getRestaurante(id, random)
			.subscribe(
				response => {
					this.restaurante = response.data;
					this.status = response.status;
					//this.error = response.detail;

					if(this.status !== "success"){
						//alert("Error en el servidor")
						this._router.navigate(['Home']);
					}
														
				},

				error => {
					this.errorMessage = <any>error
					if(this.errorMessage !== null){
						console.log(this.errorMessage);
						alert("Error en la peticion");
					}
			});

		});
		

	}


}
