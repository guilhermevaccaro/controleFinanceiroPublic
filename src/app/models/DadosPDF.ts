export interface DadosPDF1 {
  situacao: { nome: string };
  data: string;
  fornecedor: { nome: string };
  pecas: { item: string; quantidade: number }[];
  valorTotal: number;
}

export interface DadoPDF {
  data: string;
  situacao: string;
  fornecedor: string;
  pecas: string;
  quantidade: number;
  valorTotal: number;
}
