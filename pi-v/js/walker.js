const baseUrl = 'http://localhost:8080'; 
var apiUrl = `${baseUrl}/walker`;
var form = $("#formCadastro");
document.getElementById('btnCancelar').addEventListener('click', function(e){
    e.preventDefault(); // Impedir o comportamento padrao de recarregar do formulario
    cancelar();
})
document.getElementById('btnCadastar').addEventListener('click', function(e){
  e.preventDefault();
  // Jquery para validar conteudo do formulário apos o submit
  $("#formCadastro").validate({
    rules: {
        name: "required",
        email: "required",
        telefone: "required",
        cpf: "required",
        senha: "required",
        endereco: "required"
    },
    messages: {
        name: "Favor preencher seu nome",
        email: "Favor preencher seu e-mail",
        telefone: "Favor preencher seu telefone",
        cpf: "Favor preencher seu cpf",
        senha: "Favor preencher sua senha",
        endereco: "Favor preencher seu endereco",
    },
    errorElement: "div",
    errorPlacement: function(error, element) {
        element.before(error);     
    }    
});
enviar();
}, false);

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
    const inputElementEndereco = document.getElementById('endereco');

    // Lê o valor do campo de entrada
    const inputValueName = inputElementName.value;
    const inputValueCpf = inputElementCpf.value;
    const inputValueTelefone = inputElementTelefone.value;
    const inputValueEmail = inputElementEmail.value;
    const inputValueSenha = inputElementSenha.value;
    const inputValueEndereco = inputElementEndereco.value;
    
    const walker = {
        nome_tutor: inputValueName,
        cpf: inputValueCpf,
        telefone: inputValueTelefone,
        email: inputValueEmail,
        senha: inputValueSenha,
        endereco: inputValueEndereco
    };
    console.log(walker)
    //Chamada Axios para o Backend
    axios.post(apiUrl, walker)
        .then(response => {
            console.log(response.data); // Resposta do servidor
            alert("Dados Enviados com Sucesso");
        })
        .then(()=>{
            location.reload();
        }) 
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}