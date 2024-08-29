document.addEventListener('DOMContentLoaded', function() {
    // Login 
    const loginButton = document.getElementById('login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', function() {
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const userType = document.querySelector('input[name="user-type"]:checked');

            if (!userType) {
                alert('Por favor, selecione um tipo de usuário.');
                return;
            }

            if (!email || !senha) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            const tipo = userType.value;
            let url;
            if (tipo === 'cliente') {
                url = 'informacoes-pessoais-clientes.html';
            } else if (tipo === 'walker') {
                url = 'informacoes-pessoais-walkers.html';
            }

            if (url) {
                window.location.href = url;
            }
        });
    }

    // Home -> direcionar o usuário para a página de login
    function redirecionarParaLogin() {
        window.location.href = 'login.html';
    }

    const btnsComecarAgora = document.querySelectorAll('.conteudo-btn');
    btnsComecarAgora.forEach(btn => {
        btn.addEventListener('click', redirecionarParaLogin);
    });

    // Serviço
    if (window.location.pathname.includes('servico')) {
        function adicionarCarrinho(servico, preco) {
            const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
            servicosSelecionados.push({ nome: servico, preco: preco });
            localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
            alert(`${servico} adicionado ao carrinho!`);
        }

        window.adicionarCarrinho = adicionarCarrinho;
    }

    // Carrinho
    if (window.location.pathname.includes('carrinho')) {
        function atualizarServicosSelecionados() {
            const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
            const servicosList = document.getElementById('servicos-selecionados');
            const resumoTotal = document.getElementById('resumo-total');

            let total = 0;
            servicosList.innerHTML = ''; 

            servicosSelecionados.forEach((servico, index) => {
                const li = document.createElement('li');
                li.textContent = `${servico.nome} - R$${servico.preco.toFixed(2)}`;

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remover';
                removeBtn.classList.add('btn-remover');
                removeBtn.setAttribute('type', 'button'); 
                removeBtn.addEventListener('click', function() {
                    removerServico(index);
                });

                li.appendChild(removeBtn);
                servicosList.appendChild(li);
                total += servico.preco;
            });

            resumoTotal.textContent = `R$${total.toFixed(2)}`;
            const btnPagamento = document.getElementById('btn-pagamento');
            btnPagamento.textContent = total > 0 ? `Pague R$${total.toFixed(2)}` : 'Pague';
        }

        function removerServico(index) {
            const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
            servicosSelecionados.splice(index, 1); 
            localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
            atualizarServicosSelecionados();
        }

        atualizarServicosSelecionados();
    }

    // Newsletter
    const btnReceberNovidades = document.querySelector('.conteudo-btn3');
    if (btnReceberNovidades) {
        btnReceberNovidades.addEventListener('click', function() {
            alert('Você receberá novidades por e-mail!');
        });
    }

    // Contato
    const btnEnviarMensagem = document.querySelector('.conteudo-btn4');
    if (btnEnviarMensagem) {
        btnEnviarMensagem.addEventListener('click', function() {
            alert('Sua mensagem foi enviada com sucesso!');
        });
    }

    // Informações Pessoais - Clientes
    if (window.location.pathname.includes('informacoes-pessoais-clientes')) {
        function carregarDadosCliente() {
            console.log('Carregando dados do cliente...');
            const cliente = {
                nome: "Nome do Cliente",
                email: "email@cliente.com",
                cpf: "000.000.000-00",
                telefone: "(00) 00000-0000",
                endereco: "Rua Exemplo, 123",
                pets: [
                    { nome: "Nome do Pet 1", idade: "Idade do Pet 1" }
                ]
            };

            document.getElementById('profile-name').textContent = cliente.nome;
            document.getElementById('profile-email').textContent = cliente.email;
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('cpf').value = cliente.cpf;
            document.getElementById('email').value = cliente.email;
            document.getElementById('telefone').value = cliente.telefone;
            document.getElementById('endereco').value = cliente.endereco;

            cliente.pets.forEach((pet, index) => {
                if (index < 2) { 
                    document.getElementById(`pet${index + 1}`).value = pet.nome;
                    document.getElementById(`idade${index + 1}`).value = pet.idade;
                }
            });
        }

        carregarDadosCliente();

        let petCount = 1; 

        function adicionarPet() {
            petCount++;
            const petsContainer = document.getElementById('pets'); 

            const newPetGroup = document.createElement('div');
            newPetGroup.className = 'pet-group';
            newPetGroup.innerHTML = `
                <label for="pet${petCount}">Nome do Pet ${petCount}:</label>
                <input type="text" id="pet${petCount}" name="pet${petCount}">
                
                <label for="idade${petCount}">Idade do Pet ${petCount}:</label>
                <input type="text" id="idade${petCount}" name="idade${petCount}">
            `;

            petsContainer.appendChild(newPetGroup);
        }

        const addPetButton = document.getElementById('add-pet-btn');
        if (addPetButton) {
            addPetButton.addEventListener('click', adicionarPet);
        }
    }

    // Cartão - Cliente
    if (window.location.pathname.includes('cartao')) {
        function preencherFormulario() {
            const dadosCartao = JSON.parse(localStorage.getItem('dadosCartao'));

            if (dadosCartao) {
                document.getElementById('cartao').value = dadosCartao.numero;
                document.getElementById('nome-titular').value = dadosCartao.titular;
                document.getElementById('validade').value = dadosCartao.validade;
                document.getElementById('cvv').value = dadosCartao.cvv;
            }
        }

        preencherFormulario();
    }

    // Histórico de Pedidos - Cliente
    if (window.location.pathname.includes('historico-pedidos')) {
        function carregarHistoricoPedidos() {
            const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
            const tbody = document.querySelector('table tbody');

            tbody.innerHTML = '';

            pedidos.forEach(pedido => {
                const tr = document.createElement('tr');

                const tdData = document.createElement('td');
                tdData.textContent = pedido.data;
                tr.appendChild(tdData);

                const tdTipo = document.createElement('td');
                tdTipo.textContent = pedido.tipo;
                tr.appendChild(tdTipo);

                const tdDetalhes = document.createElement('td');
                tdDetalhes.textContent = pedido.detalhes;
                tr.appendChild(tdDetalhes);

                const tdPreco = document.createElement('td');
                tdPreco.textContent = pedido.preco;
                tr.appendChild(tdPreco);

                tbody.appendChild(tr);
            });
        }

        carregarHistoricoPedidos();
    }

    // Informações Pessoais - Walkers
    if (window.location.pathname.includes('informacoes-pessoais-walkers')) {
        function carregarDadosWalker() {
            const walker = {
                nome: "Nome",
                cpf: "000.000.000-00",
                email: "email@walker.com",
                telefone: "00 00000-0000",
                endereco: "Rua Exemplo, 123"
            };

            document.getElementById('profile-name').textContent = walker.nome;
            document.getElementById('profile-email').textContent = walker.email;
            document.getElementById('nome').value = walker.nome;
            document.getElementById('cpf').value = walker.cpf;
            document.getElementById('email').value = walker.email;
            document.getElementById('telefone').value = walker.telefone;
            document.getElementById('endereco').value = walker.endereco;
        }

        carregarDadosWalker();
    }
});
