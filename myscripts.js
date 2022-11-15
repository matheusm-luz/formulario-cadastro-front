function mascaraCPF(number) {

    var v = number.value;

    if (isNaN(v[v.length - 1])) {
        number.value = v.substring(0, v.length - 1);
        return;
    }

    number.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) number.value += ".";
    if (v.length == 11) number.value += "-";

}

function numeroNegativo(number) {
    number.value = Math.abs(number.value);
}

function mascaraCep(number) {

    var v = number.value;

    if (isNaN(v[v.length - 1])) {
        number.value = v.substring(0, v.length - 1);
        return;
    }

    number.setAttribute("maxlength", "10");
    if (v.length == 2) number.value += ".";
    if (v.length == 6) number.value += "-";

}

function salvarForm() {
    let podeSalvar = (!validaForm());

    if (podeSalvar) {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let pessoaCadastro = {
        nome: $('#nome').val(),
        sobrenome: $('#sobrenome').val(),
        dataNascimento: $('#dtNascimento').val(),
        cpf: $('#cpf').val(),
        telefone: $('#telefone').val(),
        email: $('#email').val(),
        cep: $('#cep').val(),
        logradouro: $('#logradouro').val(),
        complemento: $('#complemento').val(),
        bairro: $('#bairro').val(),
        dataCadastro: `${day}-${month}-${year}`,
        idCidade: ''};

        let cidadeCadastro = {
            nome: $('#cidade').val(),
            ibge: $('#ibge').val(),
            uf: $('#uf').val()
        };

        cidadeJson = JSON.stringify(cidadeCadastro);


        $.ajax({
            url: 'http://localhost:3000/cidade/addCidade/' + cidadeJson,
            contentType: 'application/json',
            cache: false,
            method: 'Put',
            dataType: 'json',
            success: function (response) {
                let idCidade = response.idCidade;
                pessoaCadastro.idCidade = idCidade;
                pessoaJson = JSON.stringify(pessoaCadastro);
                $.ajax({
                    url: 'http://localhost:3000/cliente/addCliente/' + pessoaJson,
                    contentType: 'application/json',
                    cache: false,
                    method: 'Put',
                    dataType: 'json',
                    success: function (data) {
                        alert(`Dados cadastrados com sucesso. \nCliente: ${pessoaCadastro.nome}. \nTelefone: ${pessoaCadastro.telefone}. \nCidade: ${cidadeCadastro.nome} - ${cidadeCadastro.uf}\nBairro: ${pessoaCadastro.bairro}.`)
                    }
                });
            }
        });
    }
}

function validaForm() {
    let isNomeValid = validaNome();
    let isSobrenomeValid = validaSobrenome();
    let isDtNascimentoValid = validaDtNascimento();
    let isCpfValid = validaCpf();
    let isTelefoneValid = validaTelefone();
    let isCepValid = validaCep();
    let isCidadeValid = validaCidade();
    let isUfValid = validaUf();
    let isBairroValid = validaBairro();
    let isCodIbgeValid = validaCodIbge();
    const grupoCondicoes = [
        isNomeValid,
        isSobrenomeValid,
        isDtNascimentoValid,
        isCpfValid,
        isTelefoneValid,
        isCepValid,
        isCidadeValid,
        isUfValid,
        isBairroValid,
        isCodIbgeValid,
    ];

    return grupoCondicoes.includes(false);
}

function validaNome() {
    let campoNome = $('#nome');

    if (campoNome.val() == '' || campoNome.val() == undefined) {
        campoNome.addClass('error')
        return false
    }
    campoNome.removeClass('error')
    return true

}

function validaSobrenome() {
    let campoSobrenome = $('#sobrenome');

    if (campoSobrenome.val() == '' || campoSobrenome.val() == undefined) {
        campoSobrenome.addClass('error')
        return false
    }
    campoSobrenome.removeClass('error')
    return true

}

function validaDtNascimento() {
    let campoDtNascimento = $('#dtNascimento');

    if (campoDtNascimento.val() == '' || campoDtNascimento.val() == undefined) {
        campoDtNascimento.addClass('error')
        return false
    }
    campoDtNascimento.removeClass('error')
    return true

}

function validaCpf() {
    let campoCpf = $('#cpf');

    if (campoCpf.val() == '' || campoCpf.val() == undefined) {
        campoCpf.addClass('error')
        return false
    }
    campoCpf.removeClass('error')
    return true

}

function validaTelefone() {
    let campoTelefone = $('#telefone');

    if (campoTelefone.val() == '' || campoTelefone.val() == undefined) {
        campoTelefone.addClass('error')
        return false
    }
    campoTelefone.removeClass('error')
    return true

}

function validaCep() {
    let campoCep = $('#cep');

    if (campoCep.val() == '' || campoCep.val() == undefined) {
        campoCep.addClass('error')
        return false
    }
    campoCep.removeClass('error')
    return true

}

function validaCidade() {
    let campoCidade = $('#cidade');

    if (campoCidade.val() == '' || campoCidade.val() == undefined) {
        campoCidade.addClass('error')
        return false
    }
    campoCidade.removeClass('error')
    return true

}

function validaUf() {
    let campoUf = $('#uf');

    if (campoUf.val() == '' || campoUf.val() == undefined) {
        campoUf.addClass('error')
        return false
    }
    campoUf.removeClass('error')
    return true

}

function validaBairro() {
    let campoBairro = $('#bairro');

    if (campoBairro.val() == '' || campoBairro.val() == undefined) {
        campoBairro.addClass('error')
        return false
    }
    campoBairro.removeClass('error')
    return true

}

function validaCodIbge() {
    let campoCodIbge = $('#ibge');

    if (campoCodIbge.val() == '' || campoCodIbge.val() == undefined) {
        campoCodIbge.addClass('error')
        return false
    }
    campoCodIbge.removeClass('error')
    return true

}

function buscarCep() {
    let cep = $('#cep').val().replace(/\D+/g, '')
    $.ajax({
        url: 'http://localhost:3000/cep/findByCep/' + cep,
        contentType: 'application/json',
        cache: false,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $('#cidade').val(data.localidade);
            $('#uf').val(data.uf);
            $('#bairro').val(data.bairro);
            $('#logradouro').val(data.logradouro);
            $('#ibge').val(data.ibge);
            $('#complemento').val(data.complemento);
        }
    });
}
