function formatarCVV(event) {
    const input = event.target;
    let value = input.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Limita a 3 dígitos
    if (value.length > 3) {
        value = value.slice(0, 3);
    }

    // Atualiza o valor do campo
    input.value = value;

    // Valida o formato (apenas 3 dígitos)
    const pattern = /^\d{0,3}$/;
    if (!pattern.test(value)) {
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
    }
}
function formatarCartaoCredito(event) {
    const input = event.target;
    let value = input.value;

    // Remove caracteres não numéricos
    value = value.replace(/\D/g, '');

    // Limita a 16 dígitos
    if (value.length > 16) {
        value = value.slice(0, 16);
    }

    // Adiciona espaços a cada 4 dígitos
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    // Atualiza o valor do campo
    input.value = value;

    // Valida o formato (apenas números e espaços, até 16 dígitos)
    const pattern = /^(\d{4} \d{4} \d{4} \d{4})?$/;
    if (!pattern.test(value)) {
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
    }
}
function formatarDataExpiracao(event) {
    const input = event.target;
    let value = input.value;

    // Remove caracteres não permitidos, mantendo apenas dígitos e '/'
    value = value.replace(/[^0-9\/]/g, '');

    // Adiciona '/' após dois dígitos
    if (value.length > 2 && value[2] !== '/') {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }

    // Limita o ano a dois dígitos
    const parts = value.split('/');
    if (parts[1]) {
        parts[1] = parts[1].slice(0, 2);
    }

    // Recombina partes e atualiza o valor do campo
    value = parts.join('/');

    // Atualiza o valor do campo de entrada
    input.value = value;

    // Valida o formato
    const pattern = /^(0[1-9]|1[0-2])\/\d{0,2}$/;
    if (!pattern.test(value)) {
        input.classList.add('invalid');
    } else {
        input.classList.remove('invalid');
    }
}