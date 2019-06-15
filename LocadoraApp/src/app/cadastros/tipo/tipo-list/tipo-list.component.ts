import { Component, OnInit, ViewChild } from '@angular/core';
import { Tipo } from '../model/tipo';
import { TipoService } from '../tipo.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tipo-list',
  templateUrl: './tipo-list.component.html',
  styleUrls: ['./tipo-list.component.css']
})
export class TipoListComponent implements OnInit {

  displayedColumns: string[] = ['actionsColumn', 'tipoId', 'descricao', 'qtRodas'];  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;     

  public tipoModel: Tipo = new Tipo();
  public tipos: Array<Tipo> = new Array<Tipo>();
  public dataSource: any;

  constructor(private tipoService: TipoService, 
   private router: Router,
   private dialog: MatDialog,
   private datePipe: DatePipe,
   public spinner: NgxSpinnerService) { }

  ngOnInit() {
   this.getAll();
  }

  getAll() {
   this.spinner.show();
   console.log("listall");
   this.tipoService.listAll().subscribe(sucesso => {
     if (sucesso != null) 
       console.log(sucesso);
       this.refreshTable(sucesso);
       this.spinner.hide();        
   },
   error => {
     this.spinner.hide();
     console.log(error);
   });    
  }

  private refreshTable(sucesso: any) {
   this.dataSource = new MatTableDataSource<Tipo>(sucesso);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
  }

  callUpdate(id: number){
   this.router.navigate(['../tipo-edit/'+id]);  
  }

  deleteMarca(id: number){
   this.tipoService.remove(id).subscribe(sucesso => {      
     if (sucesso != null) 
       console.log(sucesso);
       this.dataSource = new MatTableDataSource<Tipo>(sucesso);
       this.getAll();
   },
   error => {
     console.log(error);
   });
   
  }

  deleteConfirmation(id: number) {
   let dialogRef = this.dialog.open(DialogComponent, {
     panelClass: 'custom-dialog',
     data: 'Confirmar exclusão do registro ?',
     disableClose: true
     
   });
   dialogRef.afterClosed().subscribe(isConfirm => {
     console.log(isConfirm);
     if(isConfirm)
       this.deleteMarca(id);
   })
   
  }

  callNew(){
   this.router.navigate(['../tipo']);    
  }

}
