import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  public displayedColumns = ['actionsColumn','id', 'nome', 'cpf',
   'rg', 'telefone', 'email', 'endereco'];
  private dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private clienteService: ClienteService, 
    private router: Router,
    private dialog: MatDialog, 
    private datePipe: DatePipe) {}

  ngOnInit() {
    this.listAll();
  }

  listAll() {
    this.clienteService.listAll()
      .subscribe(response => {
        if (response != null) {
          this.dataSource = new MatTableDataSource<Cliente>(response);
          this.dataSource.paginator = this.paginator;          
          this.dataSource.sort = this.sort;
        }
      },
        error => {
        }
      )
  }

  callUpdate(id: number){
    this.router.navigate(['../cliente-edit/'+id]);
  }

  callNew(){
    this.router.navigate(['../cliente']);
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
    this.clienteService.remove(id).subscribe(data => {    
      if (data != null)
        this.listAll();
    });
  }

}
