function recuperarDisponibilidade() {
    obterSessao().then((user) => {
        console.log(user)
        var apiUrlDisponibilidade = `${baseUrl}/disponibilidade/${user.id}`;
        axios.get(apiUrlDisponibilidade)
            .then(resultado => {
                const disponibilidade = resultado.data
                if (disponibilidade) {
                    document.getElementById('segunda').value = disponibilidade.segunda;
                    document.getElementById('terca').value = disponibilidade.terca;
                    document.getElementById('quarta').value = disponibilidade.quarta;
                    document.getElementById('quinta').value = disponibilidade.quinta;
                    document.getElementById('sexta').value = disponibilidade.sexta;
                }
                document.getElementById('profile-email').textContent = user.email;
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
                alert('Erro ao obter a disponibilidade:', error);
            })
    }).catch(error => {
        console.error(error)
        alert('Erro ao obter sessão da pagina de disponibilidade:', error);
    });
}
document.getElementById('btnAtualizar').addEventListener('click', function (e) {
    e.preventDefault();
    obterSessao().then((sessao) => {
        atualizarDisponibilidade(sessao);
    })
})
function atualizarDisponibilidade(sessaoUsuario) {
    // Obtém o elemento de input pelo ID
    const inputElementSegunda = document.getElementById('segunda');
    const inputElementTerca = document.getElementById('terca');
    const inputElementQuarta = document.getElementById('quarta');
    const inputElementQuinta = document.getElementById('quinta');
    const inputElementSexta = document.getElementById('sexta');


    // Lê o valor do campo de entrada
    const inputValueSegunda = inputElementSegunda.value;
    const inputValueTerca = inputElementTerca.value;
    const inputValueQuarta = inputElementQuarta.value;
    const inputValueQuinta = inputElementQuinta.value;
    const inputValueSexta = inputElementSexta.value;


    const disponibilidade = {
        id: sessaoUsuario.id,
        segunda: inputValueSegunda,
        terca: inputValueTerca,
        quarta: inputValueQuarta,
        quinta: inputValueQuinta,
        sexta: inputValueSexta,

    };
    axios.defaults.withCredentials = true;
    var apiUrlAtualizarDisponibilidade = `${baseUrl}/disponibilidade`;
    axios.post(apiUrlAtualizarDisponibilidade, disponibilidade)
        .then(response => {
            console.log(JSON.stringify(response));
            alert('Dados Atualizados com Sucesso!')
            location.reload();
        })
        .catch(error => {
            alert('Erro ao fazer a requisição de login. Verificar com o suporte.', error);
        });
}
// Regras de Tela para Impedir digitação em formatos não permitidos
document.getElementById('segunda').addEventListener('input', formatarDisponibilidade);
document.getElementById('terca').addEventListener('input', formatarDisponibilidade);
document.getElementById('quarta').addEventListener('input', formatarDisponibilidade);
document.getElementById('quinta').addEventListener('input', formatarDisponibilidade);
document.getElementById('sexta').addEventListener('input', formatarDisponibilidade);

window.onload = recuperarDisponibilidade;