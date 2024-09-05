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
    }
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
    // Obtém o elemento de input pelo ID
    const inputElementName = document.getElementById('nome');
    const inputElementEmail = document.getElementById('email');

    // Lê o valor do campo de entrada
    const inputValueName = inputElementName.value;
    const inputValueEmail = inputElementEmail.value;

    const novidades = {
        nome: inputValueName,
        email: inputValueEmail,
    };
    console.log(novidades)
    //Chamada Axios para o Backend
    axios.post(apiUrl, novidades)
        .then(response => {
            console.log(response.data); // Resposta do servidor
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