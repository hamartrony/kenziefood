import { BuscarDados } from "./BuscarDados.js";
import { Rotas } from "./rotas.js";

const popUp__cliente   = document.querySelector(".app__popUp__cliente")



// carregamento dos produtos no formulario
const ulProd    = document.querySelector('.ul_select')
const nome      = document.querySelector('#nomeForm')
const preco     = document.querySelector('#preco')
const categ     = document.querySelector('#categoria')
const img       = document.querySelector('#imagem')
const desc      = document.querySelector('#descricao')
const idSpan    = document.querySelector('#id_span')
const lg        = document.querySelector('#login')
const sh        = document.querySelector('#senha')
const dados     = BuscarDados.bancoDeDados
const container = document.querySelector('.container')

const users = [{nome:'hamartrony', senha:123}, {nome:'larissa', senha:123}, {nome:"david", senha:123}]
// controle botoes formulario (login, fechar, lista dos produtos, cadastrar e alterar)
class Login{

    static popUpControllers(e){
    // const container = document.getElementsByClassName("container")
    // console.log(container)
    const clkEl = e.target.classList.value
    const clkTag       = e.target.tagName
    const idClick     = e.target.id
        // console.log(clkEl, clkTag, idClick)

   if(idClick === "btnLogin" || idClick == 'icnLogin' ){              // botao login, aciona criar LISTA
    const result = security()
        if (result !== 1) {
            container.classList.add("active")

        }
    }

    if (idClick == "btnEdit" || idClick == 'icnEdit'  ){ // botao EDITAR, aciona edicao dp produto
             const id = e.target.dataset
             editarProduto(id)

    
    }

    if (idClick =='btnLimpar' ){ // botao LIMPAR formulario de edicao
        nome.value = ''
        preco.value = ''
        categ.value = ''
        img.value = ''
        desc.value = '' 


    }
    
    if (idClick == "btnCadastrar"  ){ // botao CADASTRAR produtos
        e.preventDefault()
        capturarForm()
        nome.value = ''
        preco.value = ''
        categ.value = ''
        img.value = ''
        desc.value = '' 

                
            
                    
    }
    
    if(idClick == "btnDel" || idClick == "icnDel"){  // botao DELETAR
        e.preventDefault()
        console.log(e.target.dataset)
        const id = e.target.dataset
        delProd(id)
        
    }
    
    
    if(idClick == "btnFechar" || idClick == 'spnFechar'){  // botao FECHAR janela de edicao
        e.target.closest("div").classList.remove("show")
        container.classList.remove("active")

        document.location.reload(true);

    }

    
}

}


//<button class='editarProd'>Editar Produto</button>
// CRIANDO LISTA NO FORMULARIO
function criarLista(){

    dados.forEach(item =>{
        const divForm       = document.createElement('div')
        const liProd        = document.createElement('li')
        const btLiEdit      = document.createElement('button')
        const btLiDel       = document.createElement('button')
        const icnEdit       = document.createElement('i')
        const icnDel        = document.createElement('i')

        
        liProd.innerText    = item.nome.slice(0, 22)
        btLiEdit.id         = 'btnEdit'
        icnEdit.id          = 'icnEdit'
        btLiDel.id          = 'btnDel'
        icnDel.id           = 'icnDel'
        btLiDel.dataset.id  = item.id
        icnDel.dataset.id   = item.id
        icnEdit.dataset.id  = item.id
        btLiEdit.dataset.id = item.id

        icnEdit.classList.add('fas', 'fa-edit') 
        icnDel.classList.add('fas', 'fa-trash-alt')
        divForm.classList.add('div__form')
        liProd.classList.add(item.id)
        btLiEdit.classList.add('form')        
        btLiDel.classList.add('deletarProd')
    
        liProd.appendChild(divForm)
        divForm.appendChild(btLiEdit)
        btLiEdit.appendChild(icnEdit)
        divForm.appendChild(btLiDel)
        btLiDel.appendChild(icnDel)
        ulProd.appendChild(liProd)


        
    })

}




// EDITANDO PRODUTO
function editarProduto(id){
    dados.forEach(item =>{
        if(item.id == id.id){
            nome.value      = item.nome
            preco.value     = item.preco
            categ.value     = item.categoria
            img.value       = item.imagem
            desc.value      = item.descricao
            idSpan.value    = item.id
        }
    })
}


// capturar dados formulario
function capturarForm(){
    let novoProd       = {}    // formulario
    novoProd.id          = idSpan.value
    novoProd.nome        = nome.value
    novoProd.price       = preco.value
    novoProd.categoria   = categ.value
    novoProd.imagem      = img.value
    novoProd.descricao   = desc.value

    if(novoProd.id == undefined){
        const {nome, price, categoria, imagem, descricao } = novoProd
        const preco = Number(price)
        
        const enviar = {nome, preco, categoria, imagem, descricao}
        
        console.log(enviar)                      // objeto encaminhado para POST
        Rotas.metodoPost(enviar)
    }else{
        let selecionado = {}                    // produto selecionado para edicao
        dados.forEach(item => {
            if(novoProd.id === item.id){
               selecionado = {...item}     //  SPREAD #################################################################
            }
        })
        
        let preco = Number(novoProd.price)
        let dadosAlterados = {} 
        dadosAlterados.id = novoProd.id
        if(selecionado.nome !== novoProd.nome){
            dadosAlterados.nome = novoProd.nome
        }
        if(selecionado.preco !== preco){
            dadosAlterados.preco = preco
        }
        if(selecionado.categoria !== novoProd.categoria){
            dadosAlterados.categoria = novoProd.categoria
        }
        if(selecionado.imagem !== novoProd.imagem){
            dadosAlterados.imagem = novoProd.imagem
        }
        if(selecionado.descricao !== novoProd.descricao){
            dadosAlterados.descricao = novoProd.descricao
        }

        console.log(dadosAlterados)          // objeto encaminhado para PATCH
          Rotas.metodoPatch(dadosAlterados)

    }
        

      

}




function delProd(id){
    console.log('cheguei')
    let delId           ={}
    delId.id            = Number(id.id)
    console.log(delId)
    Rotas.metodoDelete(delId)
}




function security(){
    
    let user = []
    let name = lg.value
    user.push(name.toLowerCase())
    user.push(sh.value)
    
    for(let icnEdit=0; icnEdit<users.length; icnEdit++){
      if(user[0] == users[icnEdit].nome && user[1] == users[icnEdit].senha){  
            popUp__cliente.classList.add("show")
            criarLista()
            return 0
      }
      
    
      
     
    }
    console.log('deu ruim')
    return 1

}



export{Login}