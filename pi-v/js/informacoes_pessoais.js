const baseUrl = 'http://localhost:8080';
const apiUrlSession = `${baseUrl}/login/session`;
const apiUrlLogout = `${baseUrl}/login/logout`;
const apiUrlAtualiza = `${baseUrl}/walker/updateWalker`;
var form = $("#personal-info-form");
var id;

function logout() {
    // destruir sessao
    axios.post(apiUrlLogout)
        .then(response => {
            console.log(response);
            document.getElementById('btnLogin').disabled = false;
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
    console.log('passei no verificaSessao')
    try {
        axios.defaults.withCredentials = true;
        axios.get(apiUrlSession)
            .then(response => {
                console.log(response.data.user);
                console.log(JSON.stringify(response))
                const idUsuario = response.data.user;
                id = idUsuario;
                if (idUsuario) {
                    var apiUrlWalker = `${baseUrl}/walker/user/${idUsuario}`;
                    axios.get(apiUrlWalker)
                        .then(response => {
                            const walker = response.data;
                            carregarDadosWalker(walker);
                            document.getElementById('btnLogin').disabled = true;
                            document.getElementById('loginSection').style.display = 'none';
                        })
                        .catch(error => {
                            alert('Erro ao fazer a requisição de usuário:', error);
                        });
                } else {
                    window.location.href = `pagina404.html`;
                }
            })
            .catch(error => {
                console.log(error);
                alert('Erro ao fazer a requisição de sessão:', error);
            });
    } catch (error) {
        console.error('Erro ao verificar a sessão:', error);
    }
}
document.getElementById('btnAtualizar').addEventListener('click', function (e) {
    e.preventDefault();
    // Jquery para validar conteudo do formulário apos o submit
    $("#personal-info-form").validate({
        rules: {
            nome: "required",
            email: "required",
            telefone: "required",
            cpf: "required",
            endereco: "required"
        },
        messages: {
            nome: "Favor preencher seu nome",
            email: "Favor preencher seu e-mail corretamente",
            telefone: "Favor preencher seu telefone",
            cpf: "Favor preencher seu cpf",
            endereco: "Favor preencher seu endereco",
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            element.before(error);
        }
    });
    enviar();
}, false);
function enviar() {
    if (form.valid()) {
        verificaSessao();
        atualizarWalker(id);
        return false;
    }
};
function atualizarWalker(idUsuario) {
    const inputElementName = document.getElementById('nome');
    const inputElementCpf = document.getElementById('cpf');
    const inputElementTelefone = document.getElementById('telefone');
    const inputElementEmail = document.getElementById('email');
    const inputElementEndereco = document.getElementById('endereco');

    // Lê o valor do campo de entrada
    const inputValueName = inputElementName.value;
    const inputValueCpf = inputElementCpf.value;
    const inputValueTelefone = inputElementTelefone.value;
    const inputValueEmail = inputElementEmail.value;
    const inputValueEndereco = inputElementEndereco.value;


    const walker = {
        id: idUsuario,
        nome_tutor: inputValueName,
        cpf: inputValueCpf,
        telefone: inputValueTelefone,
        email: inputValueEmail,
        endereco: inputValueEndereco
    };
    console.log('walker antes de atualizar' + (JSON.stringify(walker))
    )
    //Chamada Axios para o Backend
    axios.defaults.withCredentials = true;
    axios.post(apiUrlAtualiza, walker)
        .then(response => {
            console.log(JSON.stringify(response));
            alert('Dados Atualizados com Sucesso!')
            location.reload();
        })
        .catch(error => {
            alert('Erro ao fazer a requisição de login. Verificar com o suporte.', error);
        });
};

window.onload = verificaSessao();