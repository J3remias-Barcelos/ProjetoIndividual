var financeiroModel = require("../models/financeiroModel");

var sessoes = [];

function cadastrarNaCarteira(req, res) {
    var descricao = req.body.descricaoServer;
    var tipo = req.body.tipoServer;
    var valor = req.body.valorServer;
    var idUsuario = req.body.cadastrarServerID;
    // var controleFinanceiro = req.body.financeServer;
    console.log(descricao) 
    console.log(" controller - ",tipo)
    console.log(valor)

    // Faça as validações dos valores
    if (descricao == undefined) {
        res.status(400).send("Sua descrição está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Seu tipo está undefined!");
    } else if (valor == undefined) {
        res.status(400).send("Seu valor está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        financeiroModel.cadastrarNaCarteira(descricao, tipo, valor, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro na carteira! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
}

function listar(req, res) {
    financeiroModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os finances: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorUsuario(req, res) {
    var idUsuario = req.params.idUsuarioVar;

    financeiroModel.listarPorUsuario(idUsuario)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deleteItem(req, res) {
    var idTransacao = req.params.idTransacao;

    financeiroModel.deleteItem(idTransacao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrarNaCarteira,
    listar,
    listarPorUsuario,
    deleteItem
}
