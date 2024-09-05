function recuperarDisponibilidade() {
    obterSessao().then((user) => {
        console.log(user)
        var apiUrlDisponibilidade = `${baseUrl}/disponibilidade/${user.id}`;
        axios.get(apiUrlDisponibilidade)
            .then(resultado => {
                const disponibilidade = resultado.data
                document.getElementById('segunda').textContent = disponibilidade.segunda;
                document.getElementById('terca').textContent = disponibilidade.terca;
                document.getElementById('quarta').textContent = disponibilidade.quarta;
                document.getElementById('quinta').textContent = disponibilidade.quinta;
                document.getElementById('sexta').textContent = disponibilidade.sexta;

                //Chamar os endpoints de cliente ou walker para recuperar o nome.                 
                if (user.tipo === 'cliente') {
                    var apiUrlCliente = `${baseUrl}/cliente/user/${user.id}`;
                    axios.get(apiUrlCliente).then(cliente => {
                        document.getElementById('profile-name').textContent = cliente.data.nome_cliente;
                    })

                } else {
                    var apiUrlWalker = `${baseUrl}/walker/user/${user.id}`;
                    axios.get(apiUrlWalker).then(walker => {
                        document.getElementById('profile-name').textContent = walker.data.nome_tutor;
                    })
                }
            }).catch(error => {
                console.error(error)
                alert('Erro ao obter a lista de pedidos:', error);
            })
    }).catch(error => {
        console.error(error)
        alert('Erro ao obter sessão da lista de pedidos:', error);
    });
}
function atualizarDisponibilidade(){
}
// Regras de Tela para Impedir digitação em formatos não permitidos
document.getElementById('segunda').addEventListener('input', formatarDisponibilidade);
document.getElementById('terca').addEventListener('input', formatarDisponibilidade);
document.getElementById('quarta').addEventListener('input', formatarDisponibilidade);
document.getElementById('quinta').addEventListener('input', formatarDisponibilidade);
document.getElementById('sexta').addEventListener('input', formatarDisponibilidade);

window.onload = recuperarDisponibilidade;