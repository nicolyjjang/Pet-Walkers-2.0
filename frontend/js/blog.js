var apiUrl = `${baseUrl}/blog`;
var form = $("#formContato");
document.body.style.visibility = 'visible';

$('#divError').empty();
$("#formContato").validate({
    rules: {
        nome: "required",
        email: "required",
    },
    messages: {
        nome: "Favor preencher seu nome",
        email: "Favor preencher seu e-mail corretamente",
    },
    errorPlacement: function (error, element) {
        error.insertBefore(element);
    },
        errorClass: "error"
});

document.getElementById('btnEnviar').addEventListener('click', function (e) {
    e.preventDefault();

    enviar();
}, false);

// Valida e Submete o formulário
function enviar() {
    if (form.valid()) {
        novidades();
        return false;
    }
}
function novidades() {
    const inputElementName = document.getElementById('nome');
    const inputElementEmail = document.getElementById('email');
    const inputValueName = inputElementName.value;
    const inputValueEmail = inputElementEmail.value;

    const novidades = {
        nome: inputValueName,
        email: inputValueEmail,
    };
    axios.post(apiUrl, novidades)
        .then(() => {
            alert("Dados Enviados com Sucesso");
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            if(!error.response){
                alert('Erro ao fazer a requisição:', error);
            } else{
                alert(error.response.data.mensagem)
            }
        });
}