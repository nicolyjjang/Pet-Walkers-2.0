var apiUrl = `${baseUrl}/login/auth`;
var form = $("#formLogin");
document.body.style.visibility = 'visible';
document.getElementById('btnEntrar').addEventListener('click', function (e) {
    e.preventDefault();
    // Validação de radio button customizada
    $.validator.addMethod("radioRequired", function () {
        return $('input[name="tipo"]:checked').length > 0;
    }, "Favor escolher um tipo de usuário");
    // Jquery para validar conteudo do formulário apos o submit
    $("#formLogin").validate({
        rules: {
            tipo: { radioRequired: true },
            email: "required",
            senha: "required"
        },
        messages: {
            tipo: { radioRequired: "Favor escolher um tipo de usuário" },
            email: "Favor preencher seu e-mail corretamente",
            senha: "Favor preencher sua senha"
        },
        errorElement: "div",
        errorPlacement: function (error, element) {
            element.before(error);
        }
    });
    enviar();
}, false);

// Valida e Submete o formulário
function enviar() {
    if (form.valid()) {
        login();
        return false;
    }
}
async function login() {
    // Obtém o elemento de input pelo ID
    const inputElementEmail = document.getElementById('email');
    const inputElementSenha = document.getElementById('senha');

    // Lê o valor do campo de entrada
    const inputValueEmail = inputElementEmail.value;
    const inputValueSenha = inputElementSenha.value;
    var tipo;
    if ($('input[id="cliente"]:checked').length > 0) {
        tipo = 'cliente';
    } else if ($('input[id="walker"]:checked').length > 0) {
        tipo = 'walker';
    }
    const login = {
        email: inputValueEmail,
        senha: inputValueSenha,
        tipo: tipo
    };
    //Chamada Axios para o Backend
    axios.defaults.withCredentials = true;
    axios.post(apiUrl, login)
        .then(response => {
            const data = (response.data);
            console.log(data.id);
            localStorage.clear(); 
            if (data.tipo === 'walker') {
                window.location.href = `informacoes-pessoais-walker.html`;
            } else if (data.tipo = 'cliente') {
                window.location.href = `informacoes-pessoais-cliente.html`;
            };
        })
        .catch(error => {
            if (error.response) {
                if (error.response.data) {
                    alert(error.response.data.mensagem);
                } else {
                    alert('Erro ao fazer a requisição de login. Verificar com o suporte.', error);
                }
            } else {
                alert('Erro ao fazer a requisição de login. Verificar com o suporte.', error);
            }
        });
}