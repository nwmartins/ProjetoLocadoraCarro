import { Component, OnInit } from '@angular/core';
import { Locacao } from './model/locacao';
import { Cliente } from './../cliente/model/cliente';
import { Veiculo } from './../veiculo/model/veiculo';
import { LocacaoService } from './locacao.service';
import { ClienteService } from './../cliente/cliente.service';
import { VeiculoService } from './../veiculo/veiculo.service';
import { ActivatedRoute, Router,  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.component.html',
  styleUrls: ['./locacao.component.css']
})
export class LocacaoComponent implements OnInit {

  locacaoModel: Locacao;
  edit : boolean;
  clienteList: Array<Cliente>;
  veiculoList: Array<Veiculo>;

  constructor(private locacaoService: LocacaoService, 
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private activeRoute: ActivatedRoute, 
    public router: Router, 
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.locacaoModel = new Locacao();
    this.getClienteList();
    this.getVeiculoList();
    this.activeRoute.params.subscribe(param => {
      if (param.id != undefined){//verificar se e edição
        this.getById(param.id);
        this.edit = true;
      }        
    });
  }

  getById(id :number){
    this.locacaoService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.locacaoModel = sucesso;
    }, error => {
      console.log(error);
    });
  }

  save(){
    this.spinner.show();
    if (!this.edit){
      this.locacaoService.save(this.locacaoModel).subscribe(sucesso => {
        if (sucesso) {
          this.spinner.hide();
          this.back();
        }
      },
      error => {
        console.log(error);
        this.spinner.hide();
      });
    }else {
      this.locacaoService.update(this.locacaoModel).subscribe(sucesso => {
        if (sucesso){
          this.spinner.hide();
          this.back();
        }           
      },
      error => {
        console.log(error);
        this.spinner.hide();
      });
    }
  }

  back() {
    this.router.navigate(['../locacao-list']);
  }

  getClienteList() {
    this.clienteService.listAll().subscribe(sucesso => {
      if (sucesso) 
        this.clienteList = sucesso;
    }, error => {
      console.log(error);
    });
  }

  getVeiculoList() {
    this.veiculoService.listAll().subscribe(sucesso => {
      if (sucesso) 
        this.veiculoList = sucesso;
    }, error => {
      console.log(error);
    });
  }

}
