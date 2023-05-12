var express = require("express");
var router = express.Router();

// CRIEI meu FinanceiroCOntroler
var financeiroController = require("../controllers/financeiroController");

router.get("/", function (req, res) {
    financeiroController.testar(req, res);
});

router.get("/listar", function (req, res) {
    financeiroController.listar(req, res);
});

// NO Meu CASO VOU FAZER O QUE ESTÁ ESCRITO AQUI EM BAIXO NO MEU FinanceiroControler
//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    financeiroController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    financeiroController.entrar(req, res);
});

module.exports = router;