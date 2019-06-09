import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(locacao: any) : Observable<any>{
    console.log(locacao)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Tipo/", locacao)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(locacao: any) : Observable<any>{
    console.log(locacao)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Tipo/"+locacao.id,
     locacao).catch((error: any) => Observable.throw(error.error));
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
