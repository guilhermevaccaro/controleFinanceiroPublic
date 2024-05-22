import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pedido } from 'src/app/models/Pedido';
import { RangeDate } from 'src/app/models/RangeDate';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrls: ['./transacoes.component.css'],
})
export class TransacoesComponent implements OnInit {
  filtro!: string;
  contatos!: Pedido[];
  opcoes = [
    { label: 'Transações', value: 'transacoes' },
    { label: 'Receitas', value: 'receita' },
    { label: 'Despesas', value: 'despesa' },
  ];

  despesaPendente!: number;
  despesaPagas!: number;
  somaReceita!: number;
  somaDespesa!: number;
  saldoPrevisto!: number;
  saldoMes!: number;
  saldoPendente!: number;
  opcoesSelecionadas!: string;
  receitaPendente!: number;
  receitaRecebidas!: number;
  formData!: Pedido;
  visible = false;
  visibleEdit = false;
  quantidadeAtual!: number;
  inicio!: Date;
  fim!: Date;
  public tipo = '';

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregar();
  }

  alterarSituacao(pedido: Pedido) {
    pedido.situacao.nome =
      pedido.situacao.nome === 'Pendente' ? 'Efetivado' : 'Pendente';

    this.dataService.updateDocument('transacoes', pedido.id, {
      'situacao.nome': pedido.situacao.nome,
    });
  }
  pegaTipoUrl() {
    this.route.url.subscribe((segments) => {
      const ultimaSegmento = segments[segments.length - 1];
      this.opcoesSelecionadas = ultimaSegmento.path;
    });
  }

  onDateSelectRecebido(event: RangeDate) {
    this.inicio = event.startDate;
    this.fim = event.endDate;
    if (this.inicio && this.fim) {
      this.carregar();
    }
  }

  showModal(formData: Pedido) {
    this.formData = formData;
    this.visible = true;
  }

  showModalEdit(formData: Pedido) {
    this.formData = formData;
    this.visibleEdit = true;
  }

  public closeModal() {
    this.visible = false;
    this.visibleEdit = false;
  }

  onRemove(objeto: Pedido) {
    this.dataService
      .deleteDocument('transacoes', objeto.id)
      .then(() => {
        this.updateEstoque();
      })
      .catch((error) => {
        console.error('Erro ao excluir a transação:', error);
      });
  }

  private updateEstoque() {
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

  carregar() {
    this.pegaTipoUrl();
    this.filtro = this.opcoesSelecionadas;
    this.dataService
      .getTransacoesPorIntervaloDeDatas(this.inicio, this.fim)
      .subscribe((transacoes) => {
        if (this.filtro === 'despesa') {
          this.contatos = transacoes.filter(
            (Pedido) => Pedido.tipo === 'despesa'
          );
        } else if (this.filtro === 'receita') {
          this.contatos = transacoes.filter(
            (Pedido) => Pedido.tipo === 'receita'
          );
        } else {
          this.contatos = transacoes;
        }

        let somaReceitas = 0;
        let somaDespesas = 0;
        let somaReceitasEfetivadas = 0;
        let somaReceitasPendentes = 0;
        let somaDespesasEfetivadas = 0;
        let somaDespesasPendentes = 0;

        transacoes.forEach((Pedido) => {
          const valorTotal = Pedido.valorTotal;
          if (Pedido.tipo === 'receita') {
            somaReceitas += valorTotal;
            if (Pedido.situacao.nome === 'Efetivado') {
              somaReceitasEfetivadas += valorTotal;
            } else {
              somaReceitasPendentes += valorTotal;
            }
          } else if (Pedido.tipo === 'despesa') {
            somaDespesas += valorTotal;
            if (Pedido.situacao.nome === 'Efetivado') {
              somaDespesasEfetivadas += valorTotal;
            } else {
              somaDespesasPendentes += valorTotal;
            }
          }
        });

        this.saldoMes = somaReceitas + somaDespesas;
        this.somaReceita = somaReceitas;
        this.somaDespesa = somaDespesas;
        this.receitaRecebidas = somaReceitasEfetivadas;
        this.receitaPendente = somaReceitasPendentes;
        this.despesaPagas = somaDespesasEfetivadas;
        this.despesaPendente = somaDespesasPendentes;
      });
  }
}
