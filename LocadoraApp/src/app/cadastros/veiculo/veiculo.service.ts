import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  save(veiculo: any) : Observable<any>{
    console.log(veiculo)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.post(environment.urlWebAPI + "Veiculo/", veiculo)
      .catch((error: any) => Observable.throw(error.error));
  }

  update(veiculo: any) : Observable<any>{
    console.log(veiculo)
    //Primeiro Parâmetro === URL
    //Segundo Parâmetro === BODY - Corpo da Requisição
    return this.http.put(environment.urlWebAPI + "Veiculo/"+veiculo.veiculo,
     veiculo).catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Veiculo/")
      .catch((error: any) => Observable.throw(error.error));
  }

  remove(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Veiculo/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Veiculo/"+id)
      .catch((error: any) => Observable.throw(error.error));
  }

}
