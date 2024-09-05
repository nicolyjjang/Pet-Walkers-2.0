function lerPedidos() {
    document.body.style.visibility = 'visible';

    obterSessao().then((user) => {
        console.log(user)
        const tableBody = document.querySelector('#tb_historico tbody');
        tableBody.innerHTML = '';

        const listaPasseios = [];
        var horario;
        var tipo;
        for (let i = 0; i < 8; i++) {
            const randomName = faker.name.findName();
            const randomDate = faker.date.past();
            i % 3 ? horario = 'Manhã' : horario = 'Tarde';
            i % 2 ? tipo = 'Passeio Solo' : tipo = 'Dia do Parque';

            listaPasseios.push({
                nome: randomName,
                data: randomDate.toISOString(),
                horario: horario,
                tipo: tipo
            });
        }
        const passeioJson = {
            dadosPasseio: listaPasseios
        };
        passeioJson.dadosPasseio.forEach(passeio => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td>${passeio.data}</td>
                <td>${passeio.horario}</td>
                <td>${passeio.nome}</td>
                <td>${passeio.tipo}</td>
                                    `;
            tableBody.appendChild(linha);

        })
        document.getElementById('profile-email').textContent = user.email;
        var apiUrlWalker = `${baseUrl}/walker/user/${user.id}`;
        axios.get(apiUrlWalker).then(walker => {
            document.getElementById('profile-name').textContent = walker.data.nome_tutor;
        })
    }).catch(error => {
        console.error(error)
        alert('Erro ao obter sessão da lista de passeios:', error);
    });
}

window.onload = lerPedidos;