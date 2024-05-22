import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transacoes', component: TransacoesComponent },
  { path: 'transacoes/receita', component: TransacoesComponent },
  { path: 'transacoes/despesa', component: TransacoesComponent },
  { path: 'estoque', component: EstoqueComponent },
  // { path: 'login', component: LoginComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
