import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatRadioModule, MatButtonModule, 
  MatTableModule, MatIconModule, MatPaginatorModule, MatSort, MatSortModule, MatExpansionModule, MatSelectModule, MatDialogModule } from '@angular/material';
import { DialogComponent } from './shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClienteComponent } from './cadastros/cliente/cliente.component';
import { TipoComponent } from './cadastros/tipo/tipo.component';
import { VeiculoComponent } from './cadastros/veiculo/veiculo.component';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { LocacaoComponent } from './cadastros/locacao/locacao.component';
import { ClienteListComponent } from './cadastros/cliente/cliente-list/cliente-list.component';
import { LocacaoListComponent } from './cadastros/locacao/locacao-list/locacao-list.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { TipoListComponent } from './cadastros/tipo/tipo-list/tipo-list.component';
import { VeiculoListComponent } from './cadastros/veiculo/veiculo-list/veiculo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ClienteComponent,
    LocacaoComponent,
    TipoComponent,
    VeiculoComponent,
    MarcaComponent,
    ClienteListComponent,
    LocacaoListComponent,
    MarcaListComponent,
    TipoListComponent,
    VeiculoListComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    BrowserAnimationsModule, //Daqui pra baixo são componentes do material
    MatInputModule,
    MatRadioModule,
    MatButtonModule, 
    MatTableModule, 
    MatIconModule, 
    HttpClientModule, //Adicionei aqui (icone) //from '@angular/common/http';
    MatPaginatorModule, 
    MatSortModule, 
    MatExpansionModule, 
    MatSelectModule,
    MatDialogModule,
    NgxSpinnerModule
  ],
  providers: [HttpClient, DatePipe],
  //Geralmente usa Dialog, Spinner e Message
  entryComponents: [
    DialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

