const list = document.querySelectorAll('.list');
function activeLink() {
    list.forEach((item) =>
        item.classList.remove('active'));
    this.classList.add('active');
}
list.forEach((item) =>
    item.addEventListener('click', activeLink));


window.onload = obterDadosControleFinanceiro;

async function obterDadosControleFinanceiro() {
try {
const idUsuarioVar = sessionStorage.getItem("ID_USUARIO");
const controlResponse = await fetch(`/financeiro/pesquisarDashboar/${idUsuarioVar}`, { cache: 'no-store' });
if (controlResponse.ok) {
  const controlResposta = await controlResponse.json();
  console.log(`Dados recebidos: ${JSON.stringify(controlResposta)}`);
  atualizarGraficos(controlResposta);
} else {
  console.error('Nenhum dado encontrado ou erro na API');
}
} catch (error) {
console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
}
}

function plotarGraficoLinha(controlResposta) {
console.log('Iniciando plotagem do gráfico de linha...');

const labelsControle = ['Receita', 'Despesa'];

const dadosGraficoLinha = {
labels: labelsControle,
datasets: [{
  label: 'Balanço total',
  data: [controlResposta[0].Entrada, controlResposta[0].Saída],
  fill: true,
  backgroundColor: ['#06d7c6', '#EB3B3B'],
  borderWidth: 1,
  borderColor: '#A811C2',
  tension: [-0.1, 0.1] // Valor negativo para a saída e valor positivo para a entrada
}]
};

const config = {
type: 'line',
data: dadosGraficoLinha,
options: {
  responsive: true,
  title: {
    display: true,
    text: 'Balanço financeiro'
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
};

const ctxAnalytics = document.getElementById('chartAnalytics');
const chartAnalytics = new Chart(ctxAnalytics, config);
}

// Função para plotar o gráfico de doughnut
function plotarGraficoDoughnut(controlResposta) {
console.log('Iniciando plotagem do gráfico de doughnut...');

const entrada = controlResposta[0].Entrada;
const saida = controlResposta[0].Saída;
const caixa = entrada - saida;
const percentual = (entrada / caixa) * 100;
const cor = (percentual > 50) ? '#06d7c6' : '#EB3B3B';

const chartAnalytics2 = new Chart(document.getElementById('chartAnalytics2'), {
type: 'doughnut',
data: {
  labels: ['Percentual do Controle'],
  datasets: [{
    label: `Porcentagem %`,
    data: [percentual], // Percentual para deixar de forma dinâmica
    backgroundColor: [cor],
    borderWidth: 1,
    borderColor: '#A811C2',
    hoverBorderColor: '#A811C2',
    hoverBorderWidth: 1,
    hoverOffset: 4,
  }],
},
});
}

// Função para atualizar os gráficos com dados dinâmicos
function atualizarGraficos(controlResposta) {
console.log('Atualizando gráficos...');

plotarGraficoLinha(controlResposta);
plotarGraficoDoughnut(controlResposta);
}

// Chamar a função para obter e plotar os dados
obterDadosControleFinanceiro();