import { BuscarDados } from "./BuscarDados.js";
import { Carrinho } from "./carrinho.js";
import { Login } from "./interface.js";
import { LocalStorage } from "./localStorage.js";
import { Pesquisa } from "./Pesquisa.js";
import { Vitrine } from "./Vitrine.js";
const main = document.querySelector("body");

// CADASTRO
const login = document.querySelector("body");
login.addEventListener("click", Login.popUpControllers);

// Consumindo a API
BuscarDados.kenzieFood();

const botaoSelecionarTodos = document.getElementById("todos");
const botaoSelecionarPanificadora = document.getElementById("panificadora");
const botaoSelecionarFrutas = document.getElementById("frutas");
const botaoSelecionarBebidas = document.getElementById("bebidas");

//CAMPO DE BUSCA
const inputBusca = document.querySelector("#inputBusca");

inputBusca.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

  const resultado = Pesquisa.pesquisarProdutos(
    inputValue,
    BuscarDados.bancoDeDados
  );
  Vitrine.criarVitrine(resultado, Vitrine.criarProduto);
});

// FILTRO POR CATEGORIA
botaoSelecionarTodos.addEventListener("click", async () => {
  let bd = await BuscarDados.bancoDeDados;
  Vitrine.criarVitrine(bd, Vitrine.criarProduto);
});

botaoSelecionarPanificadora.addEventListener("click", async () => {
  let bd = await BuscarDados.bancoDeDados;
  Vitrine.filtrarPorCategoria("Panificadora", bd);
});

botaoSelecionarFrutas.addEventListener("click", async () => {
  let bd = await BuscarDados.bancoDeDados;
  Vitrine.filtrarPorCategoria("Frutas", bd);
});

botaoSelecionarBebidas.addEventListener("click", async () => {
  let bd = await BuscarDados.bancoDeDados;
  Vitrine.filtrarPorCategoria("Bebidas", bd);
});

// LOCALSTORAGE
const arrayLocal = JSON.parse(localStorage.getItem("arrayCarrinho"));
let arrayCarrinho = arrayLocal !== null ? arrayLocal : [];

//inicializando o carrinho com o local storage
Carrinho.addCarrinho(arrayCarrinho);

main.addEventListener("click", buscarProd);

// FUNCAO captura ID do produto no click
function buscarProd(evt) {
  const { bancoDeDados } = BuscarDados;

  const botao = evt.target;
  let idProduto = "";
  let botaoNome = "";

  if (evt.target.tagName === "BUTTON" || evt.target.tagName === "I") {
    idProduto = botao.getAttribute("product-key");
    botaoNome = botao.getAttribute("class").slice(-3);
  }

  if (botaoNome == "Car" || botaoNome == "lus") {
    const item = bancoDeDados.find((produto) => produto.id == idProduto);
    arrayCarrinho.push(item);
    Carrinho.addCarrinho(arrayCarrinho);
    LocalStorage.updateLocalStorage();
  } else {
    Carrinho.delCarrinho(idProduto);
    LocalStorage.updateLocalStorage();
  }
}

export { arrayCarrinho };
