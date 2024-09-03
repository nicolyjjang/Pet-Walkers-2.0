var apiUrlPedido = `${baseUrl}/pedido/incluir`;
var apiUrlFormaPagamento = `${baseUrl}/formaPagamento/incluir`;
var apiUrlincluirPagamento = `${baseUrl}/pagamento/incluir`;
var apiUrlProcessarPagamento = `${baseUrl}/pagamento/processar`;

function atualizarServicosSelecionados() {
    const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
    const servicosList = document.getElementById('servicos-selecionados');
    const resumoTotal = document.getElementById('resumo-total');

    let total = 0;
    servicosList.innerHTML = '';

    servicosSelecionados.forEach((servico, index) => {
        const li = document.createElement('li');
        li.textContent = `${servico.nome} - R$${servico.preco.toFixed(2)}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.classList.add('btn-remover');
        removeBtn.setAttribute('type', 'button');
        removeBtn.addEventListener('click', function () {
            removerServico(index);
        });

        li.appendChild(removeBtn);
        servicosList.appendChild(li);
        total += servico.preco;
    });

    resumoTotal.textContent = `R$${total.toFixed(2)}`;
    const btnPagamento = document.getElementById('btn-pagamento');
    btnPagamento.textContent = total > 0 ? `Pague R$${total.toFixed(2)}` : 'Pague';
}

function removerServico(index) {
    const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
    servicosSelecionados.splice(index, 1);
    localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
    atualizarServicosSelecionados();
}

atualizarServicosSelecionados();

document.getElementById('btn-pagamento').addEventListener('click', function (e) {
    e.preventDefault(); // Impedir o comportamento padrao de recarregar do formulario
    $("#formPagamento").validate({
        rules: {
            card_number: "required",
            expiration_date: "required",
            pagamento: "required",
            cvv: "required",
        },
        messages: {
            card_number: "Favor preencher o numero do cartão",
            expiration_date: "Favor preencher a data de expiração",
            pagamento: "Favor preencher a forma de pagamento",
            cvv: "Favor preencher o cvv",
        },
        errorPlacement: function (error, element) {
            element.before(error);
        }
    });
    if ($("#formPagamento").valid()) {
        efetuarPagamento()
        return false;
    }
}, false);

function efetuarPagamento(){
    obterSessao().then(user => {
        if (user) {
            if(user.tipo !== 'cliente'){
                throw 'Não está logado como cliente'
            }
            gravarPedido(user)
        } else {
            alert('Não encontrada Sessão Ativa como cliente, efetuar login primeiro!')
        }
    })
        .catch(error => {
            alert('Erro ao verificar a sessão: ' + error);
        })
}
function gravarPedido(user){
    //Chamada Axios para o Backend
    const combinedJson = { ...user, ...localStorage };
    axios.post(apiUrlPedido, combinedJson)
        .then(response => {
            gravarDadosNovoCartao(response)
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}
function gravarDadosNovoCartao(user){
    axios.post(apiUrlFormaPagamento, pedido)
        .then(response => {
            //formatar JSON pedido + novoCartao
        })
        .then( response => {
            gravarPagamento(response)
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}
function gravarPagamento(pedidoFormatadocomCartao){
    axios.post(apiUrlincluirPagamento, pedidoFormatadocomCartao)
        .then(response => {
            ProcessarPagamentoPagarme(response)
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}
function ProcessarPagamentoPagarme(){
    axios.post(apiUrlProcessarPagamento, pedido)
        .then(response => {
            console.log(response)
            LimparLocalStorage()
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}
function LimparLocalStorage(){
    alert('Pagamento Concluido!')
    localStorage.clear(); 
    location.reload();
}