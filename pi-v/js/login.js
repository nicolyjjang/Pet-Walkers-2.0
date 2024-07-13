const baseUrl = 'http://localhost:8080'; 
var apiUrl = `${baseUrl}/login`;
var form = $("#formLogin");
document.getElementById('btnEntrar').addEventListener('click', function(e){
  console.log('passando no botao login')  
  e.preventDefault();
  // Jquery para validar conteudo do formulário apos o submit
  $("#formLogin").validate({
    rules: {
        email: "required",
        senha: "required"
    },
    messages: {
        email: "Favor preencher seu e-mail corretamente",
        senha: "Favor preencher sua senha"
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
        login();
        return false;
    }
}
function login() {
    // Obtém o elemento de input pelo ID
    const inputElementEmail = document.getElementById('email');
    const inputElementSenha = document.getElementById('senha');

    // Lê o valor do campo de entrada
    const inputValueEmail = inputElementEmail.value;
    const inputValueSenha = inputElementSenha.value;
    
    const login = {
        email: inputValueEmail,
        senha: inputValueSenha
    };
    //Chamada Axios para o Backend
    axios.post(apiUrl, login)
        .then(response => {
            alert(response.data);
        })
        .then(()=>{
            location.reload();
        }) 
        .catch(error => {
            alert('Erro ao fazer a requisição:', error);
        });
}