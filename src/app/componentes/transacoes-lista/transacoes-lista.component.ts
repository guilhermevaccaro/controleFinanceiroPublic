import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-transacoes-lista',
  templateUrl: './transacoes-lista.component.html',
  styleUrls: ['./transacoes-lista.component.css'],
})
export class TransacoesListaComponent implements OnChanges {
  contatos!: Pedido[];
  @Input() valorSelecionado!: string;
  @Input() filtro!: string;
  @Input() somaReceita!: number;
  @Input() somaDespesa!: number;
  @Input() saldoPrevisto!: number;
  @Input() dados1!: Pedido[];
  data: unknown;
  data2: unknown;
  options: unknown;
  dados = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dados1'] && changes['dados1'].currentValue) {
      this.processarDados(this.dados1);
    }
  }

  private processarDados(dados: Pedido[]): void {
    this.contatos = dados;

    this.atualizarDadosGrafico();
  }

  atualizarDadosGrafico() {
    if (this.contatos && this.contatos.length > 0) {
      const contagemCategorias: { [key: string]: number } = {};
      const contagemTipos: { [key: string]: number } = {};

      this.contatos.forEach((objeto) => {
        const valorTotalAbsoluto = Math.abs(objeto.valorTotal); // Transformando despesas em positivo

        objeto.pecas.forEach((peca: { item: { nome: string } }) => {
          const nomePeca = peca.item.nome;
          if (contagemCategorias[nomePeca]) {
            contagemCategorias[nomePeca] += valorTotalAbsoluto;
          } else {
            contagemCategorias[nomePeca] = valorTotalAbsoluto;
          }
        });
        if (contagemTipos[objeto.tipo]) {
          contagemTipos[objeto.tipo] += valorTotalAbsoluto;
        } else {
          contagemTipos[objeto.tipo] = valorTotalAbsoluto;
        }
      });

      let total = 0;
      for (const categoria in contagemCategorias) {
        total += contagemCategorias[categoria];
      }

      const porcentagens: { [key: string]: string } = {};
      for (const categoria in contagemCategorias) {
        const porcentagem = (contagemCategorias[categoria] / total) * 100;
        porcentagens[categoria] = porcentagem.toFixed(1);
      }

      const labels1 = Object.keys(contagemCategorias);
      const data1 = Object.values(porcentagens);

      const data2 = [
        contagemTipos['receita'] || 0,
        contagemTipos['despesa'] || 0,
      ];

      this.data = {
        labels: labels1,
        datasets: [
          {
            data: data1,
            backgroundColor: ['blue', 'yellow', 'green'],
            hoverBackgroundColor: ['lightblue', 'lightyellow', 'lightgreen'],
          },
        ],
      };

      this.data2 = {
        labels: ['Receita', 'Despesa'],
        datasets: [
          {
            data: data2,
            backgroundColor: ['green', 'red'],
            hoverBackgroundColor: ['lightgreen', 'pink'],
          },
        ],
      };

      this.dados = true;
    } else {
      this.dados = false;
    }

    this.options = {
      responsive: false,
      maintainAspectRatio: false,
      barPercentage: 0.2,
      cutout: '70%',
      borderWidth: 0,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }
}
