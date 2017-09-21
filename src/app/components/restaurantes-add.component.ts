import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {RestauranteService} from "../services/restaurantes.service"
import {Restaurante} from "../model/restaurante"

@Component({
	selector: "restaurante-add",
	templateUrl: "../view/restaurante-add.html",
	providers: [RestauranteService]
})

export class RestauranteAddComponent implements OnInit {
	public titulo = "Crear nuevo restaurante"	
	public restaurante: Restaurante;
	public errorMessage: string;
	public status: string;
	public resultUpload;
	public filesToUpload: Array<File>

	constructor(
		private _restauranteService: RestauranteService,
		private _route: ActivatedRoute,
		private _router: Router,
	){}

	onSubmit(){
		this._restauranteService.addRestaurante(this.restaurante)
			.subscribe(
				response => {
					this.status = response.status

					if(this.status !== "success"){
						alert("Error en el servidor");
					} 
				},
				error => {
					this.errorMessage = <any>error;

					if(this.errorMessage !== null){
						console.log(this.errorMessage);
						alert("Error en la peticion");
					}
				}
			);

			this._router.navigate(["/"]);
	}

	ngOnInit(){		
		this.restaurante = new Restaurante(0, "", "", "", "null", "bajo");
		//console.log("Componente rest cargado");
	}

	callPrecio(value){
		this.restaurante.precio = value;
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;

		this.makeFileRequest("http://app.com/api/api/imagen/?format=json", [], this.filesToUpload).then((response) => {
			this.resultUpload = response
			this.restaurante.imagen = this.resultUpload.imagen;
			console.log(this.resultUpload.imagen)

		}, (error) => {
			console.log(error);
		});
	}


	makeFileRequest(url:string, params: Array<string>, files: Array<File> ){
		return new Promise((resolve,reject) => {
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++ ){
				formData.append("imagen", files[i], files[i].name);
			} 

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 201){
						resolve(JSON.parse(xhr.response));
					}else {
						reject(xhr.response);
					}
				}
			}

			xhr.open("POST", url, true);
			xhr.send(formData); 

		});
	}


	/*callImagen(value:any){
		this.restaurante.imagen = value;
	}*/	
}