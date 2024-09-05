const baseUrl = 'http://localhost:8080';
const apiUrlSession = `${baseUrl}/login/session`;
const apiUrlLogout = `${baseUrl}/login/logout`;

function logout() {
    axios.post(apiUrlLogout)
        .then(response => {
            localStorage.clear(); 
        })
        .catch(error => {
            alert('Erro ao encerrar sessão:', error);
        });

    window.location.href = `login.html`;
};  
function obterSessao() {
    try {
        axios.defaults.withCredentials = true;
        return axios.get(apiUrlSession)
            .then(response => {
                console.log('Sessao: ' + JSON.stringify(response))
                return response.data.user;
            })
    } catch (error) {
        console.error('Erro ao verificar a sessão:', error);
    }
}  
document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('header');
    obterSessao().then(sessao => {
        carregarHeader(sessao);
    })
        .catch(error => {
            console.log('Error: ' + error)
            window.location.href = '/problemas_tecnicos.html';
        })

    function carregarHeader(sessao) {
        const base = `
        <div class="logo">
            <img src="./assets/images/logo.svg" alt="Logo">
            <h2 class="titulo-logo">Pets Walkers</h2>
        </div>
        <div class="links">
            <a href="home.html">Home</a>
            <a href="sobre.html">Sobre</a>
            <a href="servico.html">Serviços</a>
            <a href="blog.html">Blog</a>
            <a href="contato.html">Contato</a>
        </div>
      `;
        if (sessao && sessao.tipo === 'cliente') {
            header.innerHTML = base.concat(`
                <a href="/informacoes-pessoais-cliente.html"><i class="fa-solid fa-user" title="Detalhe de Cliente"></i></a>
                <a href="/logout.html" class="logout-button" onclick="logout()"><i class="fa-solid fa-door-open" title="Sair"></i></a>
                <a href="carrinho.html"><i id="cart" class="fa-solid fa-cart-shopping"></i></a>    
            `);
        } else if (sessao && sessao.tipo === 'walker') {
            header.innerHTML = base.concat(`
                <a href="/informacoes-pessoais-walker.html"><i class="fa-solid fa-user" title="Detalhe de Walker"></i></a>
                <a href="/logout.html" class="logout-button" onclick="logout()"><i class="fa-solid fa-door-open" title="Sair"></i></a>
            `);
        }
        else {
            header.innerHTML = base.concat(`
                <button class="btn-iniciar"><a href="login.html">Log In</a></button>                
                <a href="carrinho.html"><i id="cart" class="fa-solid fa-cart-shopping"></i></a>      
            `);
        }
    }
});
