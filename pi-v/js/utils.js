//Expressão regular que obriga o usuario a digitar o cvv no formato 999
function formatarCVV(event) {
    const input = event.target;
    let value = input.value;

    value = value.replace(/\D/g, '');

    // Limita a 3 dígitos
    if (value.length > 3) {
        value = value.slice(0, 3);
    }

    input.value = value;
}
//Expressão regular que obriga o usuario a digitar o cartão de crédito no formato 9999 9999 9999 9999
function formatarCartaoCredito(event) {
    const input = event.target;
    let value = input.value;

    value = value.replace(/\D/g, '');

    if (value.length > 16) {
        value = value.slice(0, 16);
    }

    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Atualiza o valor do campo
    input.value = value;
}
//Expressão regular que obriga o usuario a digitar a data de expiração no formato MM/YY
function formatarDataExpiracao(event) {
    const input = event.target;
    let value = input.value;

    value = value.replace(/[^0-9\/]/g, '');

    if (value.length > 2 && value[2] !== '/') {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }

    const parts = value.split('/');
    if (parts[1]) {
        parts[1] = parts[1].slice(0, 2);
    }

    value = parts.join('/');

    input.value = value;
}
function formatarDisponibilidade(event)
{
    let valor = event.target.value;
    
    // Remove todos os caracteres não numéricos
    valor = valor.replace(/\D/g, '');
    
    // Limita a 8 caracteres
    if (valor.length > 8) {
        valor = valor.slice(0, 8);
    }
    
    // Formata a string no formato 00:00 - 00:00
    let horas1 = valor.slice(0, 2);
    let minutos1 = valor.slice(2, 4);
    let horas2 = valor.slice(4, 6);
    let minutos2 = valor.slice(6, 8);
    
    // Constrói o valor formatado
    let resultado = `${horas1 || ''}${minutos1 ? ':' + minutos1 : ''}${valor.length > 4 ? ' - ' : ''}${horas2 || ''}${minutos2 ? ':' + minutos2 : ''}`;
    
    // Atualiza o campo de entrada com o valor formatado
    event.target.value = resultado;
}
