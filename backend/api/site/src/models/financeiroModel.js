var database = require("../database/config")

function listar() {
    console.log("ACESSEI O FINANCEIRO MODEL LISTAR \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    var instrucao = `
        SELECT * FROM transacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O FINANCEIRO MODEL LISTA/USUARIO \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
        SELECT * FROM usuario JOIN transacao ON fkUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao

function cadastrarNaCarteira(descricao, tipo, valor, idUsuario) {
    console.log("ACESSEI O FINANCEIRO MODEL CADASTRAR NA CARTEIRA \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarNaCarteira():", descricao, tipo, valor, idUsuario);
    console.log(`${descricao}, ${tipo}, ${valor}, ${idUsuario}`);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO transacao (descricao, tipoValor, valor, fkUsuario) VALUES ('${descricao}', '${tipo}', '${valor}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deleteItem(idTransacao) {
    console.log("ACESSEI O FINANCEIRO MODEL DELETAR \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idTransacao);
    console.log(` CHEGUEI AQUI NA Transação - ${idTransacao}`);

    var instrucao = `
    DELETE FROM transacao WHERE idTransacao = ${idTransacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarEntradas(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarEntradas()");
    var instrucao = `
        SELECT sum(t.valor) as valorEntrada FROM invest.transacao as t INNER JOIN invest.usuario as u ON t.fkUsuario = ${idUsuario}
        WHERE t.tipoValor = 'Entrada'
        GROUP BY u.idUser;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pesquisarSaidas(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarSaidas()");
    var instrucao = `
        SELECT sum(t.valor) as valorSaida FROM invest.transacao as t INNER JOIN invest.usuario as u ON t.fkUsuario = ${idUsuario}
        WHERE t.tipoValor = 'Saída'
        GROUP BY u.idUser;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function calcularCaixa(idUsuario) {
//     console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function calcularCaixa()");
//     var instrucao = `
    
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

module.exports = {
    cadastrarNaCarteira,
    listar,
    listarPorUsuario,
    deleteItem,
    pesquisarEntradas,
    pesquisarSaidas,
    // calcularCaixa
};