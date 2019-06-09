import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(cliente: any) : Observable<any>{
    console.log(cliente)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Cliente/", cliente)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(cliente: any) : Observable<any>{
    console.log(cliente)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Cliente/"+cliente.id,
     cliente).catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Cliente/")
      .catch((error: any) => Observable.throw(error.error));
  }

  remove(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Cliente/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Cliente/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

}
