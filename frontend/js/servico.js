function adicionarCarrinho(servico, preco) {

    const servicosSelecionados = JSON.parse(localStorage.getItem('servicosSelecionados')) || [];
    servicosSelecionados.push({ nome: servico, preco: preco });
    localStorage.setItem('servicosSelecionados', JSON.stringify(servicosSelecionados));
    alert(`${servico} adicionado ao carrinho!`);
}
document.body.style.visibility = 'visible';
window.adicionarCarrinho = adicionarCarrinho;