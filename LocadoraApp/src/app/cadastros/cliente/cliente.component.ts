import { Component, OnInit } from '@angular/core';
import { Cliente } from './model/cliente';
import { ClienteService } from './cliente.service';
import { ActivatedRoute, Router,  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clienteModel: Cliente;
  edit : boolean;

  constructor(private clienteService: ClienteService, 
    private activeRoute: ActivatedRoute, 
    public router: Router, 
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.clienteModel = new Cliente();
    this.activeRoute.params.subscribe(param => {
      if (param.id != undefined){//verificar se e edição
        this.getById(param.id);
        this.edit = true;
      }        
    });
  }

  getById(id :number){
    this.clienteService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.clienteModel = sucesso;
    }, error => {
      console.log(error);
    });
  }

  save(){
    this.spinner.show();
    if (!this.edit){
      this.clienteService.save(this.clienteModel).subscribe(sucesso => {
        if (sucesso) {
          this.spinner.hide();
          this.back();
        }
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });
    }else {
      this.clienteService.update(this.clienteModel).subscribe(sucesso => {
        if (sucesso){
          this.spinner.hide();
          this.back();
        }           
      },
      error => {
        console.log("Erro");
        this.spinner.hide();
      });
    }
  }

  back() {
    this.router.navigate(['../cliente-list']);
  }

}
