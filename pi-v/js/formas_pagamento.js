function lerFormasPagamento() {
    document.body.style.visibility = 'visible';
    obterSessao().then((user) => {
        console.log(user)
        var apiUrlFPagamento = `${baseUrl}/formaPagamento/${user.id}`;
        axios.get(apiUrlFPagamento)
            .then(formasPagamento => {
                const listaFormasPagamento = formasPagamento.data
                const tableBody = document.querySelector('#tabela_forma_pagamento tbody');
                tableBody.innerHTML = '';

                listaFormasPagamento.forEach(formaPagamento => {
                    const linha = document.createElement('tr');
                    const validade = formaPagamento.mes_expiracao + '/' + formaPagamento.ano_expiracao
                    // Formatar data em DD/MES/YYYY antes de apresentar 
                    linha.innerHTML = `
                                    <td>${formaPagamento.numero_cartao}</td>
                                    <td>${formaPagamento.nome_titular}</td>                    
                                    <td>${formaPagamento.cvv}</td>
                                    <td>${validade}</td>
                                `;
                    tableBody.appendChild(linha);
                    document.getElementById('profile-email').textContent = user.email;   
                    //Chamar os endpoints de cliente ou walker para recuperar o nome.                 
                    if(user.tipo==='cliente'){
                        var apiUrlCliente = `${baseUrl}/cliente/user/${user.id}`;
                        axios.get(apiUrlCliente).then( cliente => {
                            document.getElementById('profile-name').textContent = cliente.data.nome_cliente;
                        })

                    }else{
                        var apiUrlWalker = `${baseUrl}/walker/user/${user.id}`;
                        axios.get(apiUrlWalker).then( walker => {
                            document.getElementById('profile-name').textContent = walker.data.nome_tutor;
                        })
                    }
                })
            }).catch(error => {
                console.error(error)
                alert('Erro ao obter a lista de formas de pagamento:', error);
            })
    }).catch(error => {
        console.error(error)
        alert('Erro ao obter sessão da lista de formas de pagamento:', error);
    });
}

window.onload = lerFormasPagamento;