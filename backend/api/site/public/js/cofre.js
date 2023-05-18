
  // AQUI É EU PUXANDO MEU HTML PARA VARiÁVEIS
  var tbody = document.querySelector("tbody");
  var descItem = document.querySelector("#desc");
  var amount = document.querySelector("#amount");
  var type = document.querySelector("#type");
  var btnNew = document.querySelector("#btnNew");
  var spanEntrada = document.querySelector(".span-entrada");
  var spanSaida = document.querySelector(".span-saida");
  var spanTotal = document.querySelector(".span-total");

  var listaControle = []; // AQUI É COMO SE EU MEU VETOR SÓ QUE VAZIO;

  // AQUI É UMA FORMA NÃO COMUN, DE CRIAR UMA ARROW FUNCTION JÁ COM ONCLICK
  btnNew.onclick = () => {
    console.log(descItem)
    console.log(amount)

    if (descItem.value === "" || amount.value === "" || type.value === "") {
      return alert("Preencha todos os campos!");
    }

    // MÉTODO PUSH É PARA INSERIR DADOS DENTRO DO MEU ARRAY/VETOR
    listaControle.push({
      desc: descItem.value,
      amount: Math.abs(amount.value).toFixed(2),
      type: type.value,
    });

    setItensBD();
    carregarItens();

    // Enviando o valor da nova input
    fetch("/financeiro/inserirCalculo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/financeiro.js

        descricaoServer: listaControle[listaControle.length - 1].desc,
        valorServer: listaControle[listaControle.length - 1].amount
        // tipo: listaControle[listaControle.length - 1].type

      })
    })
  };

  function deleteItem(index) {
    listaControle.splice(index, 1);
    setItensBD();
    carregarItens();
  }

  function insertItem(item, index) {
    let tr = document.createElement("tr");

    tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${item.type === "Entrada"
        ? '<i class="bx bx-check-circle"></i>'
        : '<i class="bx bx-x-circle"></i>'
      }</td>
    <td class="columnAction">
      <button class = "button-lixeira" onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

    tbody.appendChild(tr);
  }

  function carregarItens() {
    listaControle = getItensBD();
    tbody.innerHTML = "";
    listaControle.forEach((item, index) => {
      insertItem(item, index);
    });

    calculationSpan();
  }

  function calculationSpan() {
    const valorDeEntrada = listaControle
      .filter((item) => item.type === "Entrada")
      .map((transaction) => Number(transaction.amount));

    const valorDeSaida = listaControle
      .filter((item) => item.type === "Saída")
      .map((transaction) => Number(transaction.amount));

    const totalEntrada = valorDeEntrada
      .reduce((acc, cur) => acc + cur, 0)
      .toFixed(2);

    const totalSaida = Math.abs(
      valorDeSaida.reduce((acc, cur) => acc + cur, 0)
    ).toFixed(2);

    const totalItems = (totalEntrada - totalSaida).toFixed(2);

    spanEntrada.innerHTML = totalEntrada;
    spanSaida.innerHTML = totalSaida;
    spanTotal.innerHTML = totalItems;
  }

  // Em BREVE FUTURAMENTE CONECTAR COM O BANCO!
  const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
  const setItensBD = () => localStorage.setItem("db_items", JSON.stringify(listaControle));

  carregarItens();