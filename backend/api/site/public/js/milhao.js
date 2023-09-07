/**
 * Para calcular quando um investimento anual ou mensal chegará a 1 milhão em JavaScript, você pode usar a fórmula do Valor Futuro (VF) que é VF = VP * (1 + i)^n, onde VP é o Valor Presente, i é a taxa de juros e n é o número de períodos1. Você pode adaptar essa fórmula para calcular o número de períodos necessários para atingir um determinado Valor Futuro (no caso, 1 milhão) com base em um Valor Presente, uma taxa de juros e um valor de aporte periódico.

Aqui está um exemplo de como você pode fazer isso em JavaScript:

function calcularPeriodosParaUmMilhao(VP, i, aporte) {
    var VF = 1000000;
    var n = 0;
    while (VP < VF) {
        VP = VP * (1 + i) + aporte;
        n++;
    }
    return n;
}
Copiar
Neste exemplo, a função calcularPeriodosParaUmMilhao() recebe três argumentos: o Valor Presente (VP), a taxa de juros (i) e o valor do aporte periódico (aporte). A função usa um loop while para calcular o número de períodos necessários para que o Valor Presente atinja o Valor Futuro desejado (1 milhão), levando em consideração os aportes periódicos e a taxa de juros. O resultado é retornado ao final do loop.
 */
// MEU tempoDuration já está pegando em MESES

const tipoDeRentabilidade = document.querySelector('.typeRentabilidade');
const taxaValor = document.querySelector('#valueTaxa');
const valorInicial = document.querySelector('#valueInicial');
const aporteMensal = document.querySelector('#qtdAportes');
const tempoDeInvestimento = document.querySelector('#tempoDuration');
const btnCalcular = document.querySelector('#btnCalcular');
const mostrarEmTela = document.querySelector('.mostrarEmTela');