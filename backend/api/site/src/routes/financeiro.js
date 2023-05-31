var express = require("express");
var router = express.Router();

// CRIEI meu FinanceiroController
var financeiroController = require("../controllers/financeiroController");

router.get("/", function (req, res) {
    financeiroController.testar(req, res);
});

router.get("/listar", function (req, res) {
    financeiroController.listar(req, res);
});

router.get("/listar/:idUsuarioVar", function (req, res) {
    financeiroController.listarPorUsuario(req, res);
});

// NO Meu CASO VOU FAZER O QUE ESTÁ ESCRITO AQUI EM BAIXO NO MEU FinanceiroControler
// Recebendo os dados do html e direcionando para a função cadastrar de financeiroController.js

router.post("/inserirCalculo", function (req, res) {
    financeiroController.cadastrarNaCarteira(req, res);
});

router.delete("/deleteItem/:idTransacao", function (req, res) {
    financeiroController.deleteItem(req, res);
});

router.get("/entradas/:idUsuarioVar", function (req, res) {
    financeiroController.pesquisarEntradas(req, res);
});

router.get("/saidas/:idUsuarioVar", function (req, res) {
    financeiroController.pesquisarSaidas(req, res);
});

// router.get("/caixa/:idUsuarioVar", function (req, res) {
//     financeiroController.calcularCaixa(req, res);
// });


// router.post("/autenticar", function (req, res) {
//     financeiroController.entrar(req, res);
// });

// router.post("/publicar/:idUsuario", function (req, res) {
//     financeiroController.publicar(req, res);
// });

// router.put("/editar/:idTransacao", function (req, res) {
//     financeiroController.editar(req, res);
// });


module.exports = router;