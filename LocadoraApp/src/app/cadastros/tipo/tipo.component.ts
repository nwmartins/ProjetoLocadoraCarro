import { Component, OnInit } from '@angular/core';
import { Tipo } from './model/tipo';
import { TipoService } from './tipo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {

  tipoModel: Tipo = new Tipo();
  edicao: Boolean = false;

  constructor(private tipoService: TipoService, 
    private router: Router,
    public activeRoute: ActivatedRoute,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.tipoModel = new Tipo();
    this.activeRoute.params.subscribe(param => {
      if (param.id != undefined){//verificar se e edição
        console.log(param);
        this.getById(param.id);
        this.edicao = true;
      }        
    });    
  }

  getById(id :number){
    this.tipoService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.tipoModel = sucesso;
    }, error => {
      console.log(error);
    });
  }  

  save() {
    console.log("salvar Tipo");
    console.log(this.edicao);
    this.spinner.show();
    if (this.edicao == false) {
      this.tipoService.save(this.tipoModel).subscribe(sucesso => {
        console.log(sucesso);
        if (sucesso != null) {
          console.log("Salvo");
          this.back();  
        }      
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });
    } else {
      this.tipoService.update(this.tipoModel).subscribe(sucesso => {
        console.log(sucesso);
        if (sucesso != null)  {
          console.log("Atualizado"); 
          this.back();        
        }
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });      
    } 
  }
  
  back(){
    this.router.navigate(['../tipo-list/']);   
  }  

}
