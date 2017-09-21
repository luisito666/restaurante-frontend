import {Injectable} from "@angular/core"
import {Http, Response, Headers, RequestOptions } from "@angular/http"
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable"
import {Restaurante} from "../model/restaurante"



@Injectable()
export class RestauranteService {
	constructor(private _http: Http){}

	getRestaurantes(){
		return this._http.get("http://app.com/api/api/?format=json")
							 .map(res => res.json());
	}

	getRestaurante(id:string, random = null){
		if(random == null){
			return this._http.get("http://app.com/api/api/"+id+"?format=json")
							 .map(res => res.json());
		}else{
			return this._http.get("http://app.com/api/api/ramdon/?format=json")
							 .map(res => res.json());
		}

		
	}

	addRestaurante(restaurante: Restaurante){
		let json = JSON.stringify(restaurante);
		let params = json;
		let headers = new Headers({"Content-Type":"application/json"});

		return this._http.post("http://app.com/api/api/?format=json", 
					params ,{headers: headers}).map(res => res.json());
	}

	editRestaurante(id: string ,restaurante: Restaurante){
		let json = JSON.stringify(restaurante);
		let params = json;
		let headers = new Headers({"Content-Type":"application/json"});

		return this._http.post("http://app.com/api/api/"+id+"/?format=json", 
					params ,{headers: headers}).map(res => res.json());
	}

	deleteRestaurante(id: string){		
		return this._http.get("http://app.com/api/api/delete/"+id+"/?format=json")
							 .map(res => res.json());
	}
}