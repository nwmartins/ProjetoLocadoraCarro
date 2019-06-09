import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(tipo: any) : Observable<any>{
    console.log(tipo)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Tipo/", tipo)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(tipo: any) : Observable<any>{
    console.log(tipo)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Tipo/"+tipo.id,
     tipo).catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Tipo/")
      .catch((error: any) => Observable.throw(error.error));
  }

  remove(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Tipo/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Tipo/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

}
