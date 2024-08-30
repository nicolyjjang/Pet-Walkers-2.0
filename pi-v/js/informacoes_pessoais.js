const baseUrl = 'http://localhost:8080';
var apiUrlSession = `${baseUrl}/login/session`;
var apiUrlLogout = `${baseUrl}/login/logout`;

function logout() {
    // destruir sessao
    axios.post(apiUrlLogout)
        .then(response => {
            console.log(response);
            verificaSessao();
        })
        .catch(error => {
            alert('Erro ao encerrar sessão:', error);
        });
    window.location.href = `login.html`;
};


function carregarDadosWalker(walker) {

    document.getElementById('profile-name').textContent = walker.nome_tutor;
    document.getElementById('profile-email').textContent = walker.usuario.email;
    document.getElementById('nome').value = walker.nome_tutor;
    document.getElementById('cpf').value = walker.cpf;
    document.getElementById('email').value = walker.usuario.email;
    document.getElementById('telefone').value = walker.telefone;
    document.getElementById('endereco').value = walker.endereco;
    //document.getElementById('disponibilidade').value = walker.disponibilidade;
}

function verificaSessao() {
    try {
        axios.defaults.withCredentials = true;
        axios.get(apiUrlSession)
            .then(response => {
                console.log(response.data.user);
                console.log(JSON.stringify(response))
                const idUsuario = response.data.user;
                if (idUsuario) {
                    var apiUrlWalker = `${baseUrl}/walker/user/${idUsuario}`;
                    axios.get(apiUrlWalker)
                        .then(response => {
                            console.log(response.data);
                            carregarDadosWalker(response.data);
                        })
                        .catch(error => {
                            alert('Erro ao fazer a requisição de usuário:', error);
                        });
                } else {
                    window.location.href = `pagina404.html`;
                }
            })
            .catch(error => {
                alert('Erro ao fazer a requisição de sessão:', error);
            });
    } catch (error) {
        console.error('Erro ao verificar a sessão:', error);
    }
}
window.onload = verificaSessao;