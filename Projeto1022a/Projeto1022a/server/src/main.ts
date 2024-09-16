
import Express from "express";
import Cors from 'cors'
import ListaProdutos from "./lista-produtos";
import InserirProdutos from "./inserir-produtos";
import ListaUsuarios from "./lista-usuarios";
import InserirUsuarios from "./inserir-usuarios";

const app = Express()
app.use(Cors())
app.use(Express.json())

app.get("/produtos",async(req,res)=>{
    const listaProdutos = new ListaProdutos()
    res.send(await listaProdutos.execute())
})
app.post("/produtos",async(req,res)=>{
    console.log("Alguém tentou cadastrar Produtos")
    const {id,nome,descricao,preco,imagem} = req.body
    const produto = {
        id,
        nome,
        descricao,
        preco,
        imagem
    }
    const inserirProduto = new InserirProdutos()
    try{
        const produtoInserido = await inserirProduto.execute(produto)
        res.status(201).send(produtoInserido)
    }
    catch(e:any){
        if(e.message === "ER_DUP_ENTRY"){
            res.status(409).send("Produto já cadastrado")
        }else{
            console.log(e)
            res.status(409).send("Erro Desconhecido: Olhe o TERMINAL DO VSCode")
        }
    }

})

app.get("/usuarios",async(req,res)=>{
    const listaUsuarios = new ListaUsuarios()
    res.send(await listaUsuarios.execute())
})
app.post("/usuarios",async(req,res)=>{
    console.log("Alguém tentou cadastrar Usuario")
    const {id,nome,idade,cpf, rg, endereco, estado_civil} = req.body
    const usuario = {
        id,
        nome,
        idade,
        cpf,
        rg,
        endereco,
        estado_civil
    }
    const inserirUsuarios = new InserirUsuarios()
    try{
        const usuarioInserido = await inserirUsuarios.execute(usuario)
        res.status(201).send(usuarioInserido)
    }
    catch(e:any){
        if(e.message === "ER_DUP_ENTRY"){
            res.status(409).send("Usuario já cadastrado")
        }else{
            console.log(e)
            res.status(409).send("Erro Desconhecido: Olhe o TERMINAL DO VSCode")
        }
    }

})

const porta = 8000
app.listen(porta,()=>{
    console.log("Server Rodando")
    console.log("digite: localhost:8000/produtos na url para acessar o servidor.")
    console.log("digite: localhost:8000/usuarios na url para acessar o servidor.")
})
