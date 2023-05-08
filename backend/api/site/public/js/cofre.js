// AQUI É O ARQUIVO QUE FIZ E ESTÁ FUNCIONANDO 
const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const type = document.querySelector("#type");
const btnNew = document.querySelector("#btnNew");

const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");
const total = document.querySelector(".total");

let items;

btnNew.onclick = () => {
  if (descItem.value === "" || amount.value === "" || type.value === "") {
    return alert("Preencha todos os campos!");
  }

  items.push({
    desc: descItem.value,
    amount: Math.abs(amount.value).toFixed(2),
    type: type.value,
  });

  setItensBD();

  loadItens();

  descItem.value = "";
  amount.value = "";
};

function deleteItem(index) {
  items.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${
      item.type === "Entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
    }</td>
    <td class="columnAction">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

function loadItens() {
  items = getItensBD();
  tbody.innerHTML = "";
  items.forEach((item, index) => {
    insertItem(item, index);
  });

  getTotals();
}

function getTotals() {
  const amountIncomes = items
    .filter((item) => item.type === "Entrada")
    .map((transaction) => Number(transaction.amount));

  const amountExpenses = items
    .filter((item) => item.type === "Saída")
    .map((transaction) => Number(transaction.amount));

  const totalIncomes = amountIncomes
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const totalExpenses = Math.abs(
    amountExpenses.reduce((acc, cur) => acc + cur, 0)
  ).toFixed(2);

  const totalItems = (totalIncomes - totalExpenses).toFixed(2);

  incomes.innerHTML = totalIncomes;
  expenses.innerHTML = totalExpenses;
  total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
  localStorage.setItem("db_items", JSON.stringify(items));

loadItens();


/**
 *  AQUI É DO MEU ARQUIVO COFRE 
 * 
 * // AQUI ESTOU CRIANDO TODAS MINHA VARiÁVEIS E ATRIBUINDO VALOR ATRAVÉS DA (DOM do HTML)
const tbody = document.querySelector("tbody");
const descItem = document.querySelector("#id-desc");
const amount = document.querySelector("#id-amount");
const type = document.querySelector("#id-type");
const btnNew = document.querySelector("#btnNew");

const entradaValue = document.querySelector(".entrada");
const saidaValue = document.querySelector(".saida");
const totalValue = document.querySelector(".total");

let items;

// AQUI ESTOU CHAMANDO MEU BOTÃO e CRIANDO UMA FUNÇÂO ARROW FUNCTION COM IF
btnNew; () => {
//   if (descItem.value === "" || amount.value === "" || type.value === "") {
//     return alert("Preencha todos os campos!");
//   }

  items.push({
    desc: descItem.value,
    amount: Math.abs(amount.value).toFixed(2),
    type: type.value,
  });

  setItensBD(); // CHAMANDO a FUNÇÃO

  loadItens(); // CHAMANDO a FUNÇÃO

  descItem.value = "";
  amount.value = "";
};

// O INDEX AQUI SERVE COMO PARAMETRÔ - Ou Seja posição
function deleteItem(index) {
  items.splice(index, 1);
  setItensBD();
  loadItens();
}

// FUNÇÃO pARA INSERIR ITENS - Passando alguns Parametrôs 
function insertItem(item, index) {
  let trIcon = document.createElement("trIcon");

  trIcon.innerHTML = `
    <td>${item.desc}</td>
    <td>R$ ${item.amount}</td>
    <td class="columnType">${
      item.type === "Entrada"
        ? '<i class="bx bxs-chevron-up-circle"></i>'
        : '<i class="bx bxs-chevron-down-circle"></i>'
    }</td>
    <td class="columnAction">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(trIcon);
}

function loadItens() {
  items = getItensBD();
  tbody.innerHTML = "";

  // ESSE forEach É UM OUTRO TIPO DE FOR, While e etc... Nesse Caso sendo ele uma ARROW FUNCTION CHAMANDO outra FUNÇÃO com seus parametrôs.
  items.forEach((item, index) => {
    insertItem(item, index);
  });

  getTotals();
}

function getTotals() {
  const amountEntrada = items
    .filter((item) => item.type === "Entrada")
    .map((transaction) => Number(transaction.amount));

  const amountSaida = items
    .filter((item) => item.type === "Saída")
    .map((transaction) => Number(transaction.amount));

  const totalEntrada = amountEntrada
    .reduce((acc, cur) => acc + cur, 0)
    .toFixed(2);

  const totalSaida = Math.abs(
    amountSaida.reduce((acc, cur) => acc + cur, 0)
  ).toFixed(2);

  // ATRAVÉS DESSE CALCULO EU CONSIGO MOSTRAR EM TELA DINÃMICAMENTE O VALOR DO Usuario
  const totalItems = (totalEntrada - totalSaida).toFixed(2);

  entrada.innerHTML = totalEntrada;
  saida.innerHTML = totalSaida;
  total.innerHTML = totalItems;
}

const getItensBD = () => JSON.parse(localStorage.getItem("db_items")) ?? [];
const setItensBD = () =>
  localStorage.setItem("db_items", JSON.stringify(items));

loadItens();
  */