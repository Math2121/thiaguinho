const express = require("express");
const app = express();
const uuid = require('uuid');

const isInfoExists = require("./middlewares/verificaInfo");
app.use(express.json());


let database = [];
function isIdExists(request,response,next){
    const {id} = request.params;
    const index = database.findIndex(func => func.id === id);
    if(index < 0) {
        return response.status(404).json({Error:"Esse id não existe"});
    }
    next();
}

app.post('/funcionario', isInfoExists, (req, res) => {

    const {
        nome,
        funcao,
        departamento,
        email,
        telefone
    } = req.body;
    const funcionario = {
        id: uuid.v4(),
        nome: nome,
        funcao: funcao,
        departamento: departamento,
        email: email,
        telefone: telefone,
    }

    database = [...database, funcionario];
    return res.status(201).json(funcionario);


});

app.get("/funcionarios", (req, res) => {
    if (database.length > 0) {
        return res.status(201).json(database);
    }
    return res.status(404).json({
        "Error": "Nenhum funcionario"
    });

})

app.get("/funcionario/:id", isIdExists, (req, res) => {
    const {
        id
    } = req.params

    const func = database.findIndex(item => item.id === id)

    return res.status(200).json(database[func])

})

app.put('/funcionario/:id', isIdExists, isInfoExists, (request,response) => {
    const {id} = request.params;
    const {nome,funcao,departamento,email,telefone} = request.body;

    const funcionario = database.findIndex(func => func.id === id);
    const novoFunc = {
        id,
        nome,
        funcao,
        departamento,
        email,
        telefone,
    }
    database.splice(funcionario, 1, novoFunc);
    
    return response.status(200).json(novoFunc);
})

app.delete('/funcionario/:id', isIdExists, (request,response) => {
    const {id} = request.params;
    const index = database.findIndex(index => index.id === id);
    database.splice(index, 1);
    return response.status(200).json({Success:"Funcionário deletado"});
})

app.listen("3333", () => {
    console.log("Server rodando!");
})