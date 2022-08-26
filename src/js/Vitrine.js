
class Vitrine {
    constructor (nome, idVitrine, produtos) {
        this._nome = nome
        this._idVitrine = idVitrine
        this._produtos = produtos
    }


    static criarProduto ({id, imagem, categoria, nome, descricao, preco}) {
        
        const vitrine = document.querySelector(".vitrinePrincipal")
        const card = document.createElement("div")
        const cardFigure = document.createElement("figure")
        const cardImg = document.createElement("img")
        const cardcategoria = document.createElement("div")

        const cardInfo = document.createElement("div")
        const cardTitulo = document.createElement("h3")
        const carddescricao = document.createElement("p")

        const cardFooter = document.createElement("div")
        const cardpreco = document.createElement("span")
        const button = document.createElement("button")
        const icone = document.createElement("i")

        button.setAttribute("product-key", id)
        icone.setAttribute("product-key", id)
    
        card.classList.add("card")
        cardFigure.classList.add("figure")
        cardImg.classList.add("figure__image")
        cardcategoria.classList.add("card__categoria")

        if (categoria === "Panificadora") {
            cardcategoria.classList.add("li__item--bakery", "li__item")
            cardcategoria.innerHTML = `<img src="./src/img/svg/bakery.svg"> ${categoria}`
        } else if (categoria === "Frutas") {
            cardcategoria.classList.add("li__item--fruits", "li__item")
            cardcategoria.innerHTML = `<img src="./src/img/svg/fruits.svg"> ${categoria}`
        } else {
            cardcategoria.classList.add("li__item--drinks", "li__item")
            cardcategoria.innerHTML = `<img src="./src/img/svg/drink.svg"> ${categoria}`
        }

        cardInfo.classList.add("info")
        cardTitulo.classList.add("card__titulo")
        carddescricao.classList.add("card__descricao")

        cardFooter.classList.add("card__rodape")
        cardpreco.classList.add("card__preco")
        button.classList.add("addToCar")
        icone.classList.add("fas", "fa-cart-plus")

        cardImg.src = imagem
        cardImg.alt = nome
    
        cardTitulo.innerText = nome
        
        carddescricao.innerText = descricao
    
        cardpreco.innerText = `R$ ${preco.toFixed(2)}`
        
        vitrine.appendChild(card)

        // categoria > FIGURE, IMG > FIGURE 
        card.appendChild(cardFigure)
        cardFigure.appendChild(cardImg)
        cardFigure.appendChild(cardcategoria)

        // TEXTOS
        card.appendChild(cardInfo)
        cardInfo.appendChild(cardTitulo)
        cardInfo.appendChild(carddescricao)
        
        // FOOTER
        cardInfo.appendChild(cardFooter)
        cardFooter.appendChild(cardpreco)
        cardFooter.appendChild(button)
        button.appendChild(icone)


        
    
    }

    static filtrarPorCategoria(categoria, bancoDeDados) {

        let listaDeProdutos = bancoDeDados.filter(produto => {
            const categoriaProduto = produto.categoria

            if (categoriaProduto == categoria) {
                return produto
            }
        })

        this.criarVitrine(listaDeProdutos, this.criarProduto)
    }

    static criarVitrine(arrayDeProdutos, templateProduto) {
        
        const vitrine = document.querySelector(".vitrinePrincipal")
        vitrine.innerHTML = ""

        arrayDeProdutos.forEach(produto => {
            templateProduto(produto)
        });

    }
    
}

export { Vitrine }
