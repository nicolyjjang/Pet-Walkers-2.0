const baseUrl = 'http://localhost:8080';
var apiUrl = `${baseUrl}/contato`;
var form = $("#formContato");
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
    errorElement: "div",
    errorPlacement: function (error, element) {
        error.appendTo($('#divError'));
    },
    showErrors: function(errorMap, errorList) {
        var self = this;

        // Remove todas as mensagens de erro existentes na div de erros
        $("#divError").empty();

        // Chama a função original para mostrar os erros
        self.defaultShowErrors();

        // Verifica mensagens de erro duplicadas
        $.each(self.errorList, function(index, error) {
            var $element = $(error.element);
            var $errorInContainer = $("#divError").find('[data-for="' + $element.attr('id') + '"]');

            if ($errorInContainer.length === 0) {
                // Se não encontrar a mensagem, adiciona uma nova
                error.message = self.defaultMessage(error.element, error.method);
                var $error = $('<label/>').attr({
                    for: $element.attr('id'),
                    class: 'error',
                    'data-for': $element.attr('id')
                }).text(error.message);

                // Adiciona a mensagem de erro à div
                $error.appendTo("#divError");
            }
        });
    }    
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
    console.log(contato)
    //Chamada Axios para o Backend
    axios.post(apiUrl, contato)
        .then(response => {
            console.log(response.data); // Resposta do servidor
            alert("Dados Enviados com Sucesso");
        })
        .then(() => {
            location.reload();
        })
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}