import { produtosDb } from "./base.js";
import { Vitrine } from "./Vitrine.js";

class BuscarDados {
  static bancoDeDados = [];

  // static async kenzieFood() {
  //     fetch("https://kenzie-food-api.herokuapp.com/product")
  //        .then(dados => dados.json())
  //        .then(produtos => this.listaProdutos(produtos))
  // }

  static kenzieFood() {
    BuscarDados.listaProdutos(produtosDb);
  }

  static listaProdutos(produtos) {
    produtos.forEach((produto) => {
      BuscarDados.bancoDeDados.push(produto);
    });
    Vitrine.criarVitrine(BuscarDados.bancoDeDados, Vitrine.criarProduto);
  }
}

export { BuscarDados };
