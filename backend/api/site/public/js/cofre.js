// AQUI É EU PUXANDO MEU HTML PARA VARiÁVEIS
var tbody = document.querySelector("tbody");
var descItem = document.querySelector("#desc");
var amount = document.querySelector("#amount");
var type = document.querySelector(".typeCombo");
var btnNew = document.querySelector("#btnNew");
var spanEntrada = document.querySelector(".span-entrada");
var spanSaida = document.querySelector(".span-saida");
var spanTotal = document.querySelector(".span-total");
var idUsuarioVar = sessionStorage.getItem("ID_USUARIO");

var listaControle = []; // AQUI É COMO SE EU MEU VETOR SÓ QUE VAZIO;

setTimeout(() => atualizarFeed(), 1000);


// MINHA ARROW FUNCTION JÁ COM ONCLICK
btnNew.onclick = () => {

  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  // FORMA ANTIGA QUE EU ESTAVA USANDO PARA CADASTRAR NO BANCO
  listaControle.push({
    desc: descItem.value,
    amount: Number(amount.value).toFixed(2),
    type: type.value,
  });

  var corpoListaContole = {
    descricaoServer: listaControle[listaControle.length - 1].desc,
    tipoServer: type.value,
    valorServer: listaControle[listaControle.length - 1].amount,
    cadastrarServerID: idUsuarioVar
  }

  // Enviando o valor da nova input
  fetch("/financeiro/inserirCalculo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(corpoListaContole)
  }).then(function (corpoListaCont) {
    if (corpoListaCont.ok) {
      console.log("Item inserido com sucesso!");
      window.location.reload();
    } else {
      console.log("Erro ao inserir item!");
    }
  }
  )

};

function atualizarFeed() {
  fetch(`/financeiro/listarUsuario/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log(corpoListaCont);

      tbody.innerHTML = "";

      for (var i = 0; i < corpoListaCont.length; i++) {
        var item = corpoListaCont[i];

        // Verificar se o ID da transação já foi processado antes
        if (transacoesProcessadas.has(item.idTransacao)) {
          continue; // Pular para a próxima iteração se o ID já existe
        }

        // Adicionar o ID da transação ao conjunto de transações processadas
        transacoesProcessadas.add(item.idTransacao);

        var trCorpo = document.createElement("tr");

        trCorpo.innerHTML = `
            <td>${item.descricao}</td>
            <td>R$ ${item.valor}</td>
            <td class="columnType">${item.tipoValor === "Entrada"
            ? '<i class="bx bx-check-circle"></i>'
            : '<i class="bx bx-x-circle"></i>'
          }</td>
            <td class="columnAction">
              <button class="button-lixeira" onclick="deleteItem(${item.idTransacao})"><i class='bx bx-trash'></i></button>
            </td>
          `;
        tbody.appendChild(trCorpo);
        console.log("ID da Transação: ", item.idTransacao)
      }
    });
  });
  calculationSpan();
}

function calculationSpan() {
  console.log("ID do Usuario: " + idUsuarioVar);

  fetch(`/financeiro/entradas/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log("Entradas: ", corpoListaCont);
      spanEntrada.innerHTML = corpoListaCont[0].valorEntrada.toFixed(2);
    });
  }
  )

  fetch(`/financeiro/saidas/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log("Saidas: ", corpoListaCont);
      spanSaida.innerHTML = corpoListaCont[0].valorSaida.toFixed(2);
    });
  }
  )

  fetch(`/financeiro/caixa/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log("Caixa: ", corpoListaCont);
      spanTotal.innerHTML = corpoListaCont[0].valorCaixa.toFixed(2);
    });
  }
  )
}

// USO PARA Criar um conjunto para armazenar os IDs das transações já processadas - (NÃO SÓ no DeleteItem, mas no AtualizarFeed para renderizar pelo ID)
var transacoesProcessadas = new Set();

function deleteItem(idTransacao) {
  fetch(`/financeiro/deleteItem/${idTransacao}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (corpoListaCont) {
    if (corpoListaCont.ok) {
      console.log("Item apagado com sucesso!");
      // Remover o ID da transação do objeto de transações processadas
      delete transacoesProcessadas[idTransacao];
      atualizarFeed();
    } else {
      console.log("Erro ao apagar item!");
    }
  });

  window.location.reload();
}


// setTimeout(() => {
//   var total = (spanEntrada.innerHTML - spanSaida.innerHTML).toFixed(2);
//   spanTotal.innerHTML = total;
//   console.log("Total: ", total);
// }
//   , 10000);