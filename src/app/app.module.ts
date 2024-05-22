import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp } from 'firebase/app';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SpeedDialModule } from 'primeng/speeddial';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { environment } from '../environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAdicionarRemoverEstoqueComponent } from './componentes/form-adicionar-remover-estoque/form-adicionar-remover-estoque.component';
import { FormEstoqueComponent } from './componentes/form-estoque/form-estoque.component';
import { FormModalComponent } from './componentes/form-modal/form-modal.component';
import { FormRazaoComponent } from './componentes/form-razao/form-razao.component';
import { SaldoComponent } from './componentes/saldo/saldo.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { TransacoesListaComponent } from './componentes/transacoes-lista/transacoes-lista.component';
import { EstoqueComponent } from './pages/estoque/estoque.component';
import { TransacoesComponent } from './pages/transacoes/transacoes.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const firebaseConfig = environment.firebaseConfig;
initializeApp(firebaseConfig);

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TransacoesListaComponent,
    TabelaComponent,
    SaldoComponent,
    FormModalComponent,
    TransacoesComponent,
    EstoqueComponent,
    FormEstoqueComponent,
    FormAdicionarRemoverEstoqueComponent,
    FormRazaoComponent,
  ],
  imports: [
    MatCardModule,
    SkeletonModule,
    MatButtonModule,
    MatListModule,
    MenuModule,
    SpeedDialModule,
    MatSidenavModule,
    MatToolbarModule,
    CarouselModule,
    SidebarModule,
    ChartModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    TabViewModule,
    TooltipModule,
    InputSwitchModule,
    ToolbarModule,
    DropdownModule,
    InputNumberModule,
    DividerModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    TableModule,
    CalendarModule,
    InputTextModule,

    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    ConfirmationService,
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
