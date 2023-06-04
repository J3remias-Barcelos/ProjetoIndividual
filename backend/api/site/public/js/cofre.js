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

// AQUI É UMA FORMA NÃO COMUN, DE CRIAR UMA ARROW FUNCTION JÁ COM ONCLICK
btnNew.onclick = () => {

  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  // MÉTODO PUSH É PARA INSERIR DADOS DENTRO DO MEU ARRAY/VETOR
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
      atualizarFeed();
    } else {
      console.log("Erro ao inserir item!");
    }
  }
  )
  atualizarFeed();
};

function atualizarFeed() {
  fetch(`/financeiro/listar/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log(corpoListaCont);

      tbody.innerHTML = "";
      
        for (var i = 0; i < corpoListaCont.length; i++) {
        var item = corpoListaCont[i];
        // console.log("Verificando CorpoListaCont que está no ITEM: ", item);
        var trCorpo = document.createElement("tr");

        trCorpo.innerHTML = `
          <td>${item.descricao}</td>
          <td>R$ ${item.valor}</td>
          <td class="columnType">${item.tipoValor === "Entrada"
            ? '<i class="bx bx-check-circle"></i>'
            : '<i class="bx bx-x-circle"></i>'
          }</td>
        <td class="columnAction">
        <button class = "button-lixeira" onclick="deleteItem(${item.idTransacao})"><i class='bx bx-trash'></i></button>
        </td>
        `;
        tbody.appendChild(trCorpo);
        console.log("ID da Transação: ", item.idTransacao)
      }
    });
  });

  calculationSpan();
}

function deleteItem(idTransacao) {
  // console.log("Criar função de apagar post escolhido - ID" + idTransacao);
  fetch(`/financeiro/deleteItem/${idTransacao}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (corpoListaCont) {
    if (corpoListaCont.ok) {
      console.log("Item apagado com sucesso!");
      atualizarFeed();
    } else {
      console.log("Erro ao apagar item!");
    }
  }
  )
}

async function calculationSpan() {
  console.log("ID do Usuario: " + idUsuarioVar);

  await fetch(`/financeiro/entradas/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log("Entradas: ", corpoListaCont);
      spanEntrada.innerHTML = corpoListaCont[0].valorEntrada.toFixed(2);
    });
  }
  )

  await fetch(`/financeiro/saidas/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log("Saidas: ", corpoListaCont);
      spanSaida.innerHTML = corpoListaCont[0].valorSaida.toFixed(2);
    });
  }
  )

  await fetch(`/financeiro/caixa/${idUsuarioVar}`).then(function (corpoListaContole) {
    corpoListaContole.json().then(function (corpoListaCont) {

      console.log("Caixa: ", corpoListaCont);
      spanTotal.innerHTML = corpoListaCont[0].valorCaixa.toFixed(2);
    });
    }
  )

  // Além de buscar no Banco quero Inserir no campo (saldoAtual)
  // fetch(`/financeiro/atualizarCaixa/${idUsuarioVar}`), {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }.then(function (corpoListaCont) {
  //     if (corpoListaCont.ok) {
  //       console.log("Item apagado com sucesso!");
  //       atualizarFeed();
  //     } else {
  //       console.log("Erro ao apagar item!");
  //     }
  //     })
  //     }
}

// setTimeout(() => {
//   var total = (spanEntrada.innerHTML - spanSaida.innerHTML).toFixed(2);
//   spanTotal.innerHTML = total;
//   console.log("Total: ", total);
// }
//   , 10000);


// console.log((spanEntrada.innerHTML - spanSaida.innerHTML).toFixed(2));
    // spanTotal.innerHTML = '';
    // spanTotal.innerHTML = (spanEntrada.innerHTML - spanSaida.innerHTML).toFixed(2);