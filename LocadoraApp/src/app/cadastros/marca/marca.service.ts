import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarcaService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(marca: any) : Observable<any>{
    console.log(marca)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Marca/", marca)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(marca: any) : Observable<any>{
    console.log(marca)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Marca/"+marca.id,
     marca).catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Marca/")
      .catch((error: any) => Observable.throw(error.error));
  }

  remove(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Marca/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Marca/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

}
