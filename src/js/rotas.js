import { Login } from "./interface.js";



let objeto = {
    nome: "ANA-MARIA",
    preco: 5,
    categoria: "Doce",
    imagem: "https://picsum.photos/200/300",
    descricao : "Lorem ipsum"
}

class Rotas {
    static urlAPI = "https://kenzie-food-api.herokuapp.com/my/product"



// POST
    static async metodoPost(data){
       
        const response = await fetch(this.urlAPI,{
            method:'post',
            headers: {
            "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY0MzExNzEyOSwiZXhwIjoxNjQzOTgxMTI5LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.xxUtpcoD84XjWlwrSlY7hXt01oFa-H7S0RzkJROKqR8",
            "Content-Type":"application/json"
        },
            body:JSON.stringify(data)
        })
        const resposta = await response
        console.log(resposta)
    }

// PATCH
    static async metodoPatch({id, nome, categoria, imagem, preco, descricao}) {
        console.log(`${this.urlAPI}/${id}`)
        const response = await fetch(`${this.urlAPI}/${id}` ,{
            method:'PATCH',
            headers: {
            "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY0MzExNzEyOSwiZXhwIjoxNjQzOTgxMTI5LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.xxUtpcoD84XjWlwrSlY7hXt01oFa-H7S0RzkJROKqR8"
            ,"Content-Type":"application/json"
        }
            ,body:JSON.stringify({id, nome, categoria, imagem, preco, descricao})
        })

        const resposta = await response
        console.log(resposta)
    }



// DELETE
static async metodoDelete({id}) {
    const response = await fetch(`${this.urlAPI}/${id}` ,{
        method:'delete',
        headers: {
        "Authorization": "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY0MzExNzEyOSwiZXhwIjoxNjQzOTgxMTI5LCJzdWIiOiJbb2JqZWN0IFVuZGVmaW5lZF0ifQ.xxUtpcoD84XjWlwrSlY7hXt01oFa-H7S0RzkJROKqR8"
    }})

    const resposta = await response
    console.log(resposta)
    }
}


// Rotas.metodoPost(objeto)
// Rotas.metodoPatch(objeto, 644)
// Rotas.metodoDelete(644)


export {Rotas}


