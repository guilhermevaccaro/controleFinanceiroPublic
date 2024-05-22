export interface Pedido {
  fornecedor: Fornecedor;
  valorTotal: number;
  data: string;
  tipo: string;
  pecas: Peca[];
  categoria: string;
  descricao: string;
  codigoPedido: string;
  id: string;
  situacao: Situacao;
}

export interface Fornecedor {
  fornecedor: string;
  nome: string;
  id: string;
}

export interface Peca {
  item: Item;
  valorUnitario: number;
  quantidadeAdicionada: number;
  idPeca: string;
}

export interface Item {
  codigo: string;
  nome: string;
  quantidade: number;
  id: string;
}

export interface Situacao {
  nome: string;
}
