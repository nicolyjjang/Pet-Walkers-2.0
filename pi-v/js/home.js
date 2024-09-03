// Home -> direcionar o usuário para a página de login
function redirecionarParaLogin() {
    window.location.href = 'login.html';
}

const btnsComecarAgora = document.querySelectorAll('.conteudo-btn');
btnsComecarAgora.forEach(btn => {
    btn.addEventListener('click', redirecionarParaLogin);
});

function habilitaBotao() {
obterSessao()
    .then(sessao => {
        if(sessao){
            btnsComecarAgora.forEach(btn => {
                btn.style.display = 'none';
            });          
        }
    })
    .catch(error => {
        console.log('Error: ' + error)
        window.location.href = '/problemas_tecnicos.html';
    })
}    
window.onload = habilitaBotao()