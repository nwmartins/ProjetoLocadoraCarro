import { Component, OnInit } from '@angular/core';
import { Veiculo } from './model/veiculo';
import { Tipo } from './../tipo/model/tipo';
import { Marca } from './../marca/model/marca';
import { VeiculoService } from './veiculo.service';
import { TipoService } from './../tipo/tipo.service';
import { MarcaService } from './../marca/marca.service';
import { ActivatedRoute, Router,  } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {

  veiculoModel: Veiculo;
  edit : boolean;
  tipoList: Array<Tipo>;
  marcaList: Array<Marca>;

  constructor(private veiculoService: VeiculoService, 
    private tipoService: TipoService,
    private marcaService: MarcaService,
    private activeRoute: ActivatedRoute, 
    public router: Router, 
    public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.veiculoModel = new Veiculo();
    this.getTipoList();
    this.getMarcaList();
    this.activeRoute.params.subscribe(param => {
      if (param.id != undefined){//verificar se e edição
        this.getById(param.id);
        this.edit = true;
      }        
    });
  }

  getById(id :number){
    this.veiculoService.getById(id).subscribe(sucesso => {
      if (sucesso) 
        this.veiculoModel = sucesso;
    }, error => {
      console.log(error);
    });
  }

  save(){
    this.spinner.show();
    if (!this.edit){
      this.veiculoService.save(this.veiculoModel).subscribe(sucesso => {
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
      this.veiculoService.update(this.veiculoModel).subscribe(sucesso => {
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
    this.router.navigate(['../veiculo-list']);
  }

  getTipoList() {
    this.tipoService.listAll().subscribe(sucesso => {
      if (sucesso) 
        this.tipoList = sucesso;
    }, error => {
      console.log(error);
    });
  }

  getMarcaList() {
    this.marcaService.listAll().subscribe(sucesso => {
      if (sucesso) 
        this.marcaList = sucesso;
    }, error => {
      console.log(error);
    });
  }

}
