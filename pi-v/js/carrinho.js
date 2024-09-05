var apiUrlPedido = `${baseUrl}/pedido/`;
var apiUrlFormaPagamento = `${baseUrl}/formaPagamento/`;
var apiUrlincluirPagamento = `${baseUrl}/pagamento/`;
document.body.style.visibility = 'visible';

// Regras de Tela para Impedir digitação em formatos não permitidos
document.getElementById('card-number').addEventListener('input', formatarCartaoCredito);
document.getElementById('cvv').addEventListener('input', formatarCVV);
document.getElementById('expiration-date').addEventListener('input', formatarDataExpiracao);

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
    // Regras customizadas para os campos de pagamento
    $.validator.addMethod('dataExpiracao', function (value, element) {
        return this.optional(element) || /^([0-9]{2})\/([0-9]{2})$/.test(value);
    }, 'Formato invalido, insira uma data no formato MM/YY.');
    $.validator.addMethod('cvv', function (value, element) {
        return this.optional(element) || /^\d{3}$/.test(value);
    }, 'Formato invalido, insira um CVV no formato 999.');
    $.validator.addMethod('cartaoCredito', function (value, element) {
        return this.optional(element) || /^(\d{4}[- ]?){3}\d{4}$/.test(value);
    }, 'Formato invalido, insira um cartão no formato 9999 9999 9999 9999.');
    $("#formPagamento").validate({
        rules: {
            card_number: { required: true, cartaoCredito: true },
            expiration_date: { required: true, dataExpiracao: true },
            pagamento: "required",
            card_holder: "required",
            cvv: { required: true, cvv: true },
        },
        messages: {
            card_number: {
                required: "Favor preencher o numero do cartão",
                cartaoCredito: 'Favor preencher no formato 9999 9999 9999 9999'
            },
            expiration_date: {
                required: "Favor preencher  a data de expiração",
                dataExpiracao: 'Favor preencher no formato MM/YY'
            },
            pagamento: "Favor preencher a forma de pagamento",
            card_holder: "Favor preencher o nome do titular",
            cvv: {
                required: "Favor preencher o numero do CVV",
                cvv: 'Favor preencher no formato 999'
            }
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

function efetuarPagamento() {
    obterSessao()
        .then(user => {
            if (user) {
                if (user.tipo !== 'cliente') {
                    throw 'Não está logado como cliente'
                }
                if (localStorage.length === 0) {
                    throw 'Carrinho vazio!'
                }
                gravarPedido(user)
            } else {
                alert('Não encontrada Sessão Ativa como cliente, efetuar login primeiro!')
            }
        }).catch(error => {
            alert('Erro ao verificar a sessão: ' + error);
        })
}
function gravarPedido(user) {
    const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
    const dadosPedido = {
        id_usuario: user.id,
        selecionados: servicosSelecionados
    }
    axios.post(apiUrlPedido, dadosPedido)
        .then(response => {
            const pedido = response.data;
            gravarPagamento(pedido)
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}
function tratarFormaDePagamentoCartao(dadosCartao) {
    if ($('input[id="salvar"]:checked').length > 0) {
        axios.post(apiUrlFormaPagamento, dadosCartao)
            .then(() => {
                LimparLocalStorage()
            })
            .catch(error => {
                alert('Erro ao fazer a requisição:', error);
            });
    }else{
        LimparLocalStorage()
    }
}
function gravarPagamento(pedido) {
    const inputElementCardNumber = document.getElementById('card-number');
    const inputElementExpirationDate = document.getElementById('expiration-date');
    const inputElementCVV = document.getElementById('cvv');
    const inputElementNomeTitular = document.getElementById('card-holder');
    const inputValueCardNumber = inputElementCardNumber.value;
    const inputValueExpirationDate = inputElementExpirationDate.value;
    const inputValueCVV = inputElementCVV.value;
    const numeroCartao = inputValueCardNumber.replace(/\s+/g, '');
    const mesExpiracao = inputValueExpirationDate.slice(0, 2);
    const anoExpiracao = inputValueExpirationDate.slice(3, 5);

    const pagamento = {
        id_pedido: pedido.id,
        numero_cartao: numeroCartao,
        cvv: inputValueCVV,
        mes_expiracao: mesExpiracao,
        ano_expiracao: anoExpiracao,
        valor: pedido.valor_total,
        status: 'processado',
        nome_titular: inputElementNomeTitular
    }

    axios.post(apiUrlincluirPagamento, pagamento)
        .then(() => {
            const dadosCartao = { 
                id_usuario: pedido.id_usuario,
                tipo: 'cartão',
                numero_cartao: numeroCartao,
                cvv: inputValueCVV,
                mes_expiracao: mesExpiracao,
                ano_expiracao: anoExpiracao,
                nome_titular: inputElementNomeTitular
            };
            tratarFormaDePagamentoCartao(dadosCartao)
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}
function LimparLocalStorage() {
    alert('Pagamento Concluido!')
    localStorage.clear();
    location.reload();
}