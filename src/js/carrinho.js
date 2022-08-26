import { arrayCarrinho } from './app.js'

const aside         = document.querySelector('aside')
const mainCarrinho  = document.querySelector('.main-carrinho')
const divCarrinho   = document.createElement('ul')

let total = 0
class Carrinho{

    static templateCarrinho({id, imagem, nome, categoria, preco}){
        const carrinhoLi     = document.createElement('li')
        const cardImgCar     = document.createElement("img")
        const cardTituloCar  = document.createElement("h3")
        const cardCategCar   = document.createElement("p")
        const cardPrecoCar   = document.createElement("span")
        const buttonCar      = document.createElement("button")
        const iconeCar       = document.createElement("i")

        divCarrinho.classList.add('div__car')
        iconeCar.classList.add("fas", "fa-trash")
        buttonCar.classList.add("toCarDel")
        buttonCar.setAttribute("product-key", id)
        iconeCar.setAttribute("product-key", id)

        cardImgCar.src                 = imagem
        cardTituloCar.innerText        = `${nome.slice(0, 18)}...`
        cardCategCar.innerText         = categoria
        cardPrecoCar.innerText         = `R$ ${preco.toFixed(2)}`
        
        mainCarrinho.appendChild(divCarrinho)
        divCarrinho.appendChild(carrinhoLi)
        carrinhoLi.appendChild(cardImgCar)
        carrinhoLi.appendChild(cardTituloCar)
        carrinhoLi.appendChild(cardCategCar)
        carrinhoLi.appendChild(cardPrecoCar)
        buttonCar.appendChild(iconeCar)
        carrinhoLi.appendChild(buttonCar)

        mainCarrinho.addEventListener('click', Carrinho.delCarrinho)


        
    }

    static addCarrinho(array){
        mainCarrinho.innerHTML = ''
        divCarrinho.innerHTML = ''
        total = 0

        array.forEach(produto => {
            this.templateCarrinho(produto)
            total = total + produto.preco
            
        })
        
        Carrinho.remontarCarrinho()

        Carrinho.valores()
    
    }

    static delCarrinho(id){
       
        for(let i = 0; i<arrayCarrinho.length; i++){
            if(arrayCarrinho[i].id == id){
                arrayCarrinho.splice(i, 1)

            }
        }

        Carrinho.addCarrinho(arrayCarrinho)
        Carrinho.valores()
        Carrinho.remontarCarrinho()

    }

    static remontarCarrinho() {
        if(arrayCarrinho.length == 0){
            mainCarrinho.innerHTML = '<img class="sacola" src="./src/img/icons/sacola.svg" alt="icon-sacola"> <p class="ops">Ops!</p> <p class="main-carrinho-p">Por enquanto não temos produtos no carrinho</p>'
            let divTotal = document.querySelector('.div-total')
            if (divTotal !== null) {
                divTotal.style.display = 'none'
            }
        }
       
    }

    static valores(){

            aside.lastChild.remove()
            const divTotal = document.createElement('div')
            const pQtd     = document.createElement('p')
            const pQtd2     = document.createElement('span')

            const pTot     = document.createElement('p')
            const pTot2     = document.createElement('span')

            divTotal.classList.add('div-total')
            pQtd.classList.add('qtd')
            pTot.classList.add('tot')
            
            pQtd.innerText      = `Quantidade`
            pQtd2.innerText     = `${arrayCarrinho.length}`
            pTot.innerText      = `Total`
            pTot2.innerText     = `R$ ${total}`

            aside.appendChild(divTotal)
            divTotal.appendChild(pQtd)
            divTotal.appendChild(pQtd2)
            divTotal.appendChild(pTot)
            divTotal.appendChild(pTot2)

    }
}

export {Carrinho}