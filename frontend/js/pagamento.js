const baseUrl = 'http://localhost:8080';
var apiUrl = `${baseUrl}/pagamento`;
var form = $("#formContato");

document.addEventListener('DOMContentLoaded', function() {
    const packageSelect = document.getElementById('package');
    const serviceSelect = document.getElementById('service');
    const resumoPreco = document.getElementById('resumo-preco');
    const resumoQuantidade = document.getElementById('resumo-quantidade');
    const resumoTotal = document.getElementById('resumo-total');
    const precoGrande = document.getElementById('preco-grande');
    const btnPagamento = document.getElementById('btn-pagamento');

    function updatePrices() {
        const packagePrice = parseFloat(packageSelect.value);
        const servicePrice = parseFloat(serviceSelect.value);
        const total = packagePrice + servicePrice;

        resumoPreco.textContent = packagePrice > 0 ? `R$${packagePrice.toFixed(2)}` : 'Nenhum pacote';
        resumoQuantidade.textContent = servicePrice > 0 ? `Qtd: 1` : 'Nenhum serviço';
        resumoTotal.textContent = total > 0 ? `R$${total.toFixed(2)}` : 'R$0,00';
        precoGrande.textContent = total > 0 ? `R$${total.toFixed(2)}` : 'R$0,00';
        btnPagamento.textContent = total > 0 ? `Pague R$${total.toFixed(2)}` : 'Pague';
    }

    packageSelect.addEventListener('change', updatePrices);
    serviceSelect.addEventListener('change', updatePrices);

// Inicializa o valor ao carregar a página
updatePrices();
});