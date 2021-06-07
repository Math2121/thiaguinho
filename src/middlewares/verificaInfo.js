function isInfoExists(request, response, next) {
    const {
        nome,
        funcao,
        departamento,
        email,
        telefone
    } = request.body;
    if (nome == undefined || nome == "") {
        return response.status(404).json({
            Error: "Campo Nome vazio"
        })
    }

    if (funcao == undefined || funcao == "") {
        return response.status(404).json({
            Error: "Campo Função vazio"
        })
    }

    if (departamento == undefined || departamento == "") {
        return response.status(404).json({
            Error: "Campo departamento vazio"
        })
    }

    if (email == undefined || email == "") {
        return response.status(404).json({
            Error: "Campo email vazio"
        })
    }
    if (telefone == undefined || telefone == "") {
        return response.status(404).json({
            Error: "Campo telefone vazio"
        })
    }
    next();


}
module.exports = isInfoExists