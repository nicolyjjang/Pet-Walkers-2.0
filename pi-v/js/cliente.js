const baseUrl = 'http://localhost:8080'; 
var apiUrl = `${baseUrl}/cliente`;
var form = $("#formCadastro");
// Impede o comportamento padrao do formulário de submit
document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault();
});
// Jquery para validar conteudo do formulário apos o submit
$("#formCadastro").validate({
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
        senha: "Favor preencher seu senha",
        pet1: "Favor preencher seu pet1",
        idade: "Favor preencher seu idade",
        endereco: "Favor preencher seu endereco",
    },
    errorElement: "div",
    errorPlacement: function(error, element) {
        element.before(error);
    }    
});
// Valida e Submete o formulário
function enviar() {
    if (form.valid()) {
        cadastrar();
        return false;
    }
}
function cancelar() {
    document.getElementById('formCadastro').reset();
}
function cadastrar() {
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
    
    const user = {
        nome_tutor: inputValueName,
        cpf: inputValueCpf,
        telefone: inputValueTelefone,
        email: inputValueEmail,
        senha: inputValueSenha,
        pet1: inputValuePet1,
        idade: inputValueIdade,
        endereco: inputValueEndereco
    };
    //Chamada Axios para o Backend
    axios.post(apiUrl, user)
        .then(response => {
            console.log(response.data); // Resposta do servidor
            console.log("Dados Enviados com Sucesso")
        })
        .catch(error => {
            console.log('Erro ao fazer a requisição:', error);
        });
}