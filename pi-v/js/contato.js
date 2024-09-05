var apiUrl = `${baseUrl}/contato`;
var form = $("#formContato");
document.body.style.visibility = 'visible';
$('#divError').empty();
$("#formContato").validate({
    rules: {
        name: "required",
        email: "required",
        telefone: "required",
        message: "required",
        endereco: "required"
    },
    messages: {
        name: "Favor preencher seu nome",
        email: "Favor preencher seu e-mail corretamente",
        telefone: "Favor preencher seu telefone",
        message: "Favor preencher a mensagem",
        endereco: "Favor preencher seu endereco",
    },
    errorPlacement: function (error, element) {
        error.insertBefore(element);
    },
        errorClass: "error"
    
});

document.getElementById('btnEnviar').addEventListener('click', function (e) {
    e.preventDefault();

    const div = document.querySelector(".divError");
    div.innerHTML = "";

    enviar();
}, false);

// Valida e Submete o formulário
function enviar() {
    if (form.valid()) {
        contatar();
        return false;
    }
}
function contatar() {
    // Obtém o elemento de input pelo ID
    const inputElementName = document.getElementById('name');
    const inputElementTelefone = document.getElementById('telefone');
    const inputElementEmail = document.getElementById('email');
    const textAreaElementMensagem = document.getElementById('message');
    const inputElementEndereco = document.getElementById('endereco');

    // Lê o valor do campo de entrada
    const inputValueName = inputElementName.value;
    const inputValueTelefone = inputElementTelefone.value;
    const inputValueEmail = inputElementEmail.value;
    const textAreaValueMensagem = textAreaElementMensagem.value;
    const inputValueEndereco = inputElementEndereco.value;

    const contato = {
        nome: inputValueName,
        telefone: inputValueTelefone,
        email: inputValueEmail,
        mensagem: textAreaValueMensagem,
        endereco: inputValueEndereco
    };
    //Chamada Axios para o Backend
    axios.post(apiUrl, contato)
        .then(() => {
            alert("Dados Enviados com Sucesso");
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}