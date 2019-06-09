import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoComponent } from './cadastros/tipo/tipo.component';
import { TipoListComponent } from './cadastros/tipo/tipo-list/tipo-list.component';
import { MarcaComponent } from './cadastros/marca/marca.component';
import { MarcaListComponent } from './cadastros/marca/marca-list/marca-list.component';
import { ClienteComponent } from './cadastros/cliente/cliente.component';
import { ClienteListComponent } from './cadastros/cliente/cliente-list/cliente-list.component';
import { VeiculoComponent } from './cadastros/veiculo/veiculo.component';
import { VeiculoListComponent } from './cadastros/veiculo/veiculo-list/veiculo-list.component';
import { LocacaoComponent } from './cadastros/locacao/locacao.component';
import { LocacaoListComponent } from './cadastros/locacao/locacao-list/locacao-list.component';

const routes: Routes = [
  {path: 'tipo', component: TipoComponent}, 
  {path: 'tipo-edit/:id', component: TipoComponent}, 
  {path: 'tipo-list', component: TipoListComponent},
  {path: 'marca', component: MarcaComponent}, 
  {path: 'marca-edit/:id', component: MarcaComponent}, 
  {path: 'marca-list', component: MarcaListComponent},
  {path: 'cliente', component: ClienteComponent}, 
  {path: 'cliente-edit/:id', component: ClienteComponent}, 
  {path: 'cliente-list', component: ClienteListComponent},
  {path: 'veiculo', component: VeiculoComponent}, 
  {path: 'veiculo-edit/:id', component: VeiculoComponent}, 
  {path: 'veiculo-list', component: VeiculoListComponent},
  {path: 'locacao', component: LocacaoComponent}, 
  {path: 'locacao-edit/:id', component: LocacaoComponent}, 
  {path: 'locacao-list', component: LocacaoListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
