export class Produto {
    dataDeValidade: string;
    descricao: string;
    emailDaLoja: string;
    id: string;
    nome: string;
    precoDeVenda: number;
    quantidade: number;
    tipo: number;

    fill(response?: any) {
        if(typeof response != 'undefined') {
            this.dataDeValidade = response.dataDeValidade;
            this.descricao = response.descricao;
            this.emailDaLoja = response.emailDaLoja;
            this.id = response.id;
            this.nome = response.nome;
            this.precoDeVenda = response.precoDeVenda;
            this.quantidade = response.quantidade;
            this.tipo = response.tipo;
        }

        return this;

    }

}
