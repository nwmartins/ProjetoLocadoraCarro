import { Component, OnInit, ViewChild } from '@angular/core';
import { Locacao } from '../model/locacao';
import { Cliente } from '../../cliente/model/cliente';
import { Veiculo } from '../../veiculo/model/veiculo';
import { LocacaoService } from '../locacao.service';
import { ClienteService } from '../../cliente/cliente.service';
import { VeiculoService } from '../../veiculo/veiculo.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-locacao-list',
  templateUrl: './locacao-list.component.html',
  styleUrls: ['./locacao-list.component.css']
})
export class LocacaoListComponent implements OnInit {

  public displayedColumns = ['actionsColumn','id', 'valor', 'dtLocacao',
   'dtEntrega', 'cliente', 'veiculo'];
  private dataSource: any;
  private locacaoList: Array<Locacao>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private locacaoService: LocacaoService, 
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private router: Router,
    private dialog: MatDialog, 
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.locacaoService.listAll()
      .subscribe(response => {
        if (response != null) {
          response.forEach(element => {
            this.clienteService.getById(element.idCliente).subscribe(sucesso => {
              if (sucesso) 
                element.cliente = sucesso;
            }, error => {
              console.log(error);
            });
            this.veiculoService.getById(element.idVeiculo).subscribe(sucesso => {
              if (sucesso) 
                element.veiculo = sucesso;
            }, error => {
              console.log(error);
            })
          });
          this.dataSource = new MatTableDataSource<Locacao>(response);
          this.dataSource.paginator = this.paginator;          
          this.dataSource.sort = this.sort;
        }
      },
        error => {
        }
      )
  }

  callUpdate(id: number){
    this.router.navigate(['../locacao-edit/'+id]);
  }

  callNew(){
    this.router.navigate(['../locacao']);
  }

  deleteConfirmation(id: number) { 
    let dialogRef = this.dialog.open(DialogComponent, {      
      panelClass: 'custom-dialog',      
      data: 'Confirmar exclusão do registro ?',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(isConfirm => {
        if(isConfirm)
          this.remove(id);    
    }); 
  }

  remove(id : number) {    
    this.locacaoService.remove(id).subscribe(data => {    
      if (data != null)
        this.listAll();
    });
  }

}
