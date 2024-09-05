function lerPedidos() {
    document.body.style.visibility = 'visible';

    obterSessao().then((user) => {
        var apiUrlPedido = `${baseUrl}/pedido/${user.id}`;
        axios.get(apiUrlPedido)
            .then(pedidos => {
                const listaPedidos = pedidos.data
                const tableBody = document.querySelector('#tabela_pedidos tbody');
                tableBody.innerHTML = '';

                listaPedidos.forEach(pedido => {
                    const linha = document.createElement('tr');
                    // Formatar data em DD/MES/YYYY antes de apresentar 
                    const date = new Date(pedido.createdAt);
                    const createdAtFormatado = date.toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    linha.innerHTML = `
                                    <td>${pedido.id}</td>
                                    <td>${createdAtFormatado}</td>                    
                                    <td>${pedido.valor_total}</td>
                                `;
                    tableBody.appendChild(linha);
                })
                document.getElementById('profile-email').textContent = user.email;
                var apiUrlCliente = `${baseUrl}/cliente/user/${user.id}`;
                axios.get(apiUrlCliente).then(cliente => {
                    document.getElementById('profile-name').textContent = cliente.data.nome_cliente;
                })
            }).catch(error => {
                console.error(error)
                alert('Erro ao obter a lista de pedidos:', error);
            })
    }).catch(error => {
        console.error(error)
        alert('Erro ao obter sessão da lista de pedidos:', error);
    });
}

window.onload = lerPedidos;