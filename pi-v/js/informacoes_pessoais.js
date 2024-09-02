const apiUrlAtualizaWalker = `${baseUrl}/walker/updateWalker`;
const apiUrlAtualizaCliente = `${baseUrl}/cliente/updateCliente`;
var form = $("#personal-info-form");

function carregarDadosWalker(walker) {
    document.getElementById('profile-name').textContent = walker.nome_tutor;
    document.getElementById('profile-email').textContent = walker.usuario.email;
    document.getElementById('nome').value = walker.nome_tutor;
    document.getElementById('cpf').value = walker.cpf;
    document.getElementById('email').value = walker.usuario.email;
    document.getElementById('telefone').value = walker.telefone;
    document.getElementById('endereco').value = walker.endereco;
}
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
const botaoAtualizarCliente = document.querySelector('#btnAtualizarCliente');
const botaoAtualizarWalker = document.querySelector('#btnAtualizarWalker');
if (botaoAtualizarCliente) {
    document.getElementById('btnAtualizarCliente').addEventListener('click', function (e) {
        e.preventDefault();
        // Jquery para validar conteudo do formulário apos o submit
        $("#personal-info-form").validate({
            rules: {
                nome: "required",
                email: "required",
                telefone: "required",
                cpf: "required",
                senha: "required",
                pet1: "required",
                idade1: "required",
                endereco: "required"
            },
            messages: {
                nome: "Favor preencher seu nome",
                email: "Favor preencher seu e-mail",
                telefone: "Favor preencher seu telefone",
                cpf: "Favor preencher seu cpf",
                senha: "Favor preencher sua senha",
                pet1: "Favor preencher seu pet1",
                idade1: "Favor preencher sua idade",
                endereco: "Favor preencher seu endereco",
            },
            errorPlacement: function (error, element) {
                element.before(error);
            }
        });
        enviar();
    }, false);
}
if (botaoAtualizarWalker) {
    document.getElementById('btnAtualizarWalker').addEventListener('click', function (e) {
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
            errorPlacement: function (error, element) {
                element.before(error);
            }
        });
        enviar();
    }, false);
}
function enviar() {
    if (form.valid()) {
        atualizar();
        return false;
    }
};
function carregarDadosSessaoeAtualiza(usuario) {
    if (usuario.tipo === 'cliente') {
        // Obtém o elemento de input pelo ID
        const inputElementName = document.getElementById('nome');
        const inputElementCpf = document.getElementById('cpf');
        const inputElementTelefone = document.getElementById('telefone');
        const inputElementEmail = document.getElementById('email');
        const inputElementPet1 = document.getElementById('pet1');
        const inputElementIdade = document.getElementById('idade1');
        const inputElementEndereco = document.getElementById('endereco');

        // Lê o valor do campo de entrada
        const inputValueName = inputElementName.value;
        const inputValueCpf = inputElementCpf.value;
        const inputValueTelefone = inputElementTelefone.value;
        const inputValueEmail = inputElementEmail.value;
        const inputValuePet1 = inputElementPet1.value;
        const inputValueIdade = inputElementIdade.value;
        const inputValueEndereco = inputElementEndereco.value;

        const cliente = {
            id: usuario.id,
            nome_cliente: inputValueName,
            cpf: inputValueCpf,
            telefone: inputValueTelefone,
            email: inputValueEmail,
            pet1: inputValuePet1,
            idade: inputValueIdade,
            endereco: inputValueEndereco
        };

        //Chamada Axios para o Backend
        axios.defaults.withCredentials = true;
        axios.post(apiUrlAtualizaCliente, cliente)
            .then(response => {
                console.log(JSON.stringify(response));
                alert('Dados Atualizados com Sucesso!')
                location.reload();
            })
            .catch(error => {
                alert('Erro ao fazer a requisição de login. Verificar com o suporte.', error);
            });
    } else {
        // Obtém o elemento de input pelo ID
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
            id: usuario.id,
            nome_tutor: inputValueName,
            cpf: inputValueCpf,
            telefone: inputValueTelefone,
            email: inputValueEmail,
            endereco: inputValueEndereco
        };

        //Chamada Axios para o Backend
        axios.defaults.withCredentials = true;
        axios.post(apiUrlAtualizaWalker, walker)
            .then(response => {
                console.log(JSON.stringify(response));
                alert('Dados Atualizados com Sucesso!')
                location.reload();
            })
            .catch(error => {
                alert('Erro ao fazer a requisição de login. Verificar com o suporte.', error);
            });
    }
}
function atualizar() {
    obterSessao().then(user => {
        if (user) {
            carregarDadosSessaoeAtualiza(user)
        } else {
            alert('Não encontrada Sessão Ativa')
            window.location.href = `pagina404.html`;
        }
    })
        .catch(error => {
            console.error('Erro ao verificar a sessão:', error);
        })
};
document.addEventListener('DOMContentLoaded', function () {
    obterSessao().then(user => {
        if (user.id) {
            if (user.tipo === 'cliente') {
                var apiUrlCliente = `${baseUrl}/cliente/user/${user.id}`;
                axios.get(apiUrlCliente)
                    .then(response => {
                        const cliente = response.data;
                        carregarDadosCliente(cliente);
                        document.body.style.visibility = 'visible';
                    })
                    .catch(error => {
                        alert('Erro ao carregar usuario: ' + error.message)
                        window.location.href = `pagina404.html`;
                    });
            } else {
                var apiUrlWalker = `${baseUrl}/walker/user/${user.id}`;
                axios.get(apiUrlWalker)
                    .then(response => {
                        const walker = response.data;
                        carregarDadosWalker(walker);
                        document.body.style.visibility = 'visible';
                    })
                    .catch(error => {
                        alert('Erro ao carregar usuario: ' + error.message)
                        window.location.href = `pagina404.html`;
                    });
            }
        } else {
            alert('Não encontrada Sessão Ativa')
            window.location.href = `pagina404.html`;
        }
    })
        .catch(error => {
            console.error('Erro ao verificar a sessão:', error);
        })

});