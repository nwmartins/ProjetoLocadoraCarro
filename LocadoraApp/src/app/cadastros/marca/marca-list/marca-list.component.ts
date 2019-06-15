import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from '../model/marca';
import { MarcaService } from '../marca.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {

  displayedColumns: string[] = ['actionsColumn', 'marcaId', 'descricao'];  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;     

 public marcaModel: Marca = new Marca();
 public marcas: Array<Marca> = new Array<Marca>();
 public dataSource: any;

 constructor(private marcaService: MarcaService, 
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
   this.marcaService.listAll().subscribe(sucesso => {
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
   this.dataSource = new MatTableDataSource<Marca>(sucesso);
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
 }

 editMarca(id: number){
   this.router.navigate(['../marca-edit/'+id]);  
 }

 deleteMarca(id: number){
   this.marcaService.remove(id).subscribe(sucesso => {      
     if (sucesso != null) 
       console.log(sucesso);
       this.dataSource = new MatTableDataSource<Marca>(sucesso);
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
   this.router.navigate(['../marca']);    
 }

}
