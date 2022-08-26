class Pesquisa {

    static pesquisarProdutos(inputValue, produtos) {

        inputValue = inputValue.toLowerCase().trim()

        const arrFiltrado = produtos.filter( produto => {
            const {nome, categoria, descricao} = produto

            if (nome.toLowerCase().includes(inputValue) || categoria.toLowerCase().includes(inputValue) || descricao.toLowerCase().includes(inputValue)) {
                return produto
            }
        })

        return arrFiltrado
    }
}

export { Pesquisa }