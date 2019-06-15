import { Component, OnInit } from '@angular/core';
import { Marca } from './model/marca';
import { MarcaService } from './marca.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  marcaModel: Marca = new Marca();
  edicao: Boolean = false;

  constructor(private marcaService: MarcaService, 
    private router: Router,
    public activeRoute: ActivatedRoute,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.marcaModel = new Marca();
    this.activeRoute.params.subscribe(param => {
      if (param.id != undefined){//verificar se e edição
        console.log(param);
        this.getById(param.id);
        this.edicao = true;
      }        
    });    
  }

  getById(id :number){
    this.marcaService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.marcaModel = sucesso;
    }, error => {
      console.log(error);
    });
  }  

  salvar() {
    console.log("salvar Marca");
    console.log(this.edicao);
    this.spinner.show();
    if (this.edicao == false) {
      this.marcaService.save(this.marcaModel).subscribe(sucesso => {
        console.log(sucesso);
        if (sucesso != null) {
          console.log("Salvo");
          this.voltar();  
        }      
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });
    } else {
      this.marcaService.update(this.marcaModel).subscribe(sucesso => {
        console.log(sucesso);
        if (sucesso != null)  {
          console.log("Atualizado"); 
          this.voltar();        
        }
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });      
    } 
  }
  
  voltar(){
    this.router.navigate(['../marca-list/']);   
  }  

}
