import { Component, OnInit, ViewChild } from '@angular/core';
import { Veiculo } from '../model/veiculo';
import { Tipo } from '../../tipo/model/tipo';
import { Marca } from '../../marca/model/marca';
import { VeiculoService } from '../veiculo.service';
import { TipoService } from '../../tipo/tipo.service';
import { MarcaService } from '../../marca/marca.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.css']
})
export class VeiculoListComponent implements OnInit {

  public displayedColumns = ['actionsColumn','id', 'descricao', 'placa',
   'chassi', 'ano', 'tipo', 'marca'];
  private dataSource: any;
  private veiculoList: Array<Veiculo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private veiculoService: VeiculoService, 
    private tipoService: TipoService,
    private marcaService: MarcaService,
    private router: Router,
    private dialog: MatDialog, 
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.veiculoService.listAll()
      .subscribe(response => {
        if (response != null) {
          response.forEach(element => {
            this.tipoService.getById(element.idTipo).subscribe(sucesso => {
              if (sucesso) 
                element.tipo = sucesso;
            }, error => {
              console.log(error);
            });
            this.marcaService.getById(element.idMarca).subscribe(sucesso => {
              if (sucesso) 
                element.marca = sucesso;
            }, error => {
              console.log(error);
            })
          });
          this.dataSource = new MatTableDataSource<Veiculo>(response);
          this.dataSource.paginator = this.paginator;          
          this.dataSource.sort = this.sort;
        }
      },
        error => {
        }
      )
  }

  callUpdate(id: number){
    this.router.navigate(['../veiculo-edit/'+id]);
  }

  callNew(){
    this.router.navigate(['../veiculo']);
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
    this.veiculoService.remove(id).subscribe(data => {    
      if (data != null)
        this.listAll();
    });
  }

}
