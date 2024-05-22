import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Estoque } from 'src/app/models/Estoque';
import { Fornecedor } from 'src/app/models/Pedido';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
})
export class EstoqueComponent implements OnInit {
  estoque!: Estoque[];
  fornecedor!: Fornecedor[];
  visible = false;
  visibleRazao = false;
  formData!: Estoque;

  constructor(
    private dataService: DataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.carrega();
  }
  carrega() {
    this.dataService.getCollection('estoque').subscribe((items) => {
      this.estoque = items;
    });
    this.dataService.getCollection('fornecedor').subscribe((items) => {
      this.fornecedor = items;
    });
  }

  deletandoTransacao(tabela: string, key: string) {
    this.dataService.deleteDocument(tabela, key);
  }

  confirm(event: Event, key: string, tabela: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Deseja excluir o dado?',
      header: 'Confirme Exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',

      accept: () => {
        this.deletandoTransacao(tabela, key);
        this.messageService.add({
          severity: 'info',
          summary: 'Sucesso',
          detail: 'Dado excluído',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Rejeitado',
        });
      },
    });
  }

  showModal() {
    this.visible = true;
  }

  showModalRazao() {
    this.visibleRazao = true;
  }

  showModalEdit(formData: Estoque) {
    this.formData = formData;
    this.visible = true;
  }

  closeModal() {
    this.visible = false;
    this.visibleRazao = false;
  }
  updateEstoque() {
    const somaQuantidades: { [key: string]: number } = {};

    const subscription = this.dataService
      .getCollection('transacoes')
      .subscribe({
        next: (items) => {
          items.forEach((transacao) => {
            transacao.pecas.forEach(
              (peca: { idPeca: string; quantidadeAdicionada: number }) => {
                const idPeca = peca.idPeca;
                let quantidadeAdicionada = peca.quantidadeAdicionada;

                if (transacao.tipo === 'receita') {
                  quantidadeAdicionada = -quantidadeAdicionada;
                }

                if (
                  Object.prototype.hasOwnProperty.call(somaQuantidades, idPeca)
                ) {
                  somaQuantidades[idPeca] += quantidadeAdicionada;
                } else {
                  somaQuantidades[idPeca] = quantidadeAdicionada;
                }
              }
            );
          });

          for (const idPeca in somaQuantidades) {
            if (Object.prototype.hasOwnProperty.call(somaQuantidades, idPeca)) {
              const quantidadeAdicionada = somaQuantidades[idPeca];

              this.dataService.updateDocument('estoque', idPeca, {
                quantidade: quantidadeAdicionada,
              });
            }
          }
          subscription.unsubscribe();
        },
        error: (err) =>
          console.error('Erro ao obter coleção de transações:', err),
      });
  }
}
