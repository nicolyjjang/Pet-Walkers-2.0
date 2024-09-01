const baseUrl = 'http://localhost:8080';
const apiUrlSession = `${baseUrl}/login/session`;
const apiUrlLogout = `${baseUrl}/login/logout`;
const apiUrlAtualiza = `${baseUrl}/cliente/updateCliente`;
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
function carregarDadosCliente(cliente) {
    document.getElementById('profile-name').textContent = cliente.nome_cliente;
    document.getElementById('profile-email').textContent = cliente.usuario.email;
    document.getElementById('nome').value = cliente.nome_cliente;
    document.getElementById('cpf').value = cliente.cpf;
    document.getElementById('email').value = cliente.usuario.email;
    document.getElementById('telefone').value = cliente.telefone;
    document.getElementById('pet1').value = cliente.pet1;
    document.getElementById('idade1').value = cliente.idade;
    document.getElementById('endereco').value = cliente.endereco;
}

function verificaSessao() {
    try {
        axios.defaults.withCredentials = true;
        axios.get(apiUrlSession)
            .then(response => {
                const idUsuario = response.data.user;
                id = idUsuario;
                if (idUsuario) {
                    var apiUrlCliente = `${baseUrl}/cliente/user/${idUsuario}`;
                    axios.get(apiUrlCliente)
                        .then(response => {
                            const cliente = response.data;
                            carregarDadosCliente(cliente);
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
            name: "required",
            email: "required",
            telefone: "required",
            cpf: "required",
            senha: "required",
            pet1: "required",
            idade: "required",
            endereco: "required"
        },
        messages: {
            name: "Favor preencher seu nome",
            email: "Favor preencher seu e-mail",
            telefone: "Favor preencher seu telefone",
            cpf: "Favor preencher seu cpf",
            senha: "Favor preencher sua senha",
            pet1: "Favor preencher seu pet1",
            idade: "Favor preencher sua idade",
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
        atualizarCliente(id);
        return false;
    }
};
function atualizarCliente(idUsuario) {
    // Obtém o elemento de input pelo ID
    const inputElementName = document.getElementById('name');
    const inputElementCpf = document.getElementById('cpf');
    const inputElementTelefone = document.getElementById('telefone');
    const inputElementEmail = document.getElementById('email');
    const inputElementSenha = document.getElementById('senha');
    const inputElementPet1 = document.getElementById('pet1');
    const inputElementIdade = document.getElementById('idade');
    const inputElementEndereco = document.getElementById('endereco');

    // Lê o valor do campo de entrada
    const inputValueName = inputElementName.value;
    const inputValueCpf = inputElementCpf.value;
    const inputValueTelefone = inputElementTelefone.value;
    const inputValueEmail = inputElementEmail.value;
    const inputValueSenha = inputElementSenha.value;
    const inputValuePet1 = inputElementPet1.value;
    const inputValueIdade = inputElementIdade.value;
    const inputValueEndereco = inputElementEndereco.value;

    const cliente = {
        id: idUsuario,
        nome_cliente: inputValueName,
        cpf: inputValueCpf,
        telefone: inputValueTelefone,
        email: inputValueEmail,
        senha: inputValueSenha,
        pet1: inputValuePet1,
        idade: inputValueIdade,
        endereco: inputValueEndereco
    };

    //Chamada Axios para o Backend
    axios.defaults.withCredentials = true;
    axios.post(apiUrlAtualiza, cliente)
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