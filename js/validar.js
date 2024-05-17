//criando os objetos dos elementos de texto do form

var nome = document.querySelector("#inputName");
var nomeHelp = document.querySelector("#inputNameHelp");
nome.addEventListener('focusout', validarNome);

var ano = document.querySelector("#inputYear");
var anoHelp = document.querySelector("#inputYearHelp");
ano.addEventListener('focusout', validarAno);

var email = document.querySelector("#inputEmail");
var emailHelp = document.querySelector("#inputEmailHelp");
email.addEventListener('focusout', validarEmail);

var password = document.querySelector("#inputPassword");
var passwordHelp = document.querySelector("#inputPasswordHelp");
var passStrengthMeter = document.querySelector("#passStrengthMeter");
var inputResult = document.querySelector("#inputResult");
password.addEventListener('focusout', validarPassword);


function validarNome(e){ 
    //declaração da expressão regular para definir o formato de um nome válido
    //inclusão de acentuações
    const regexNome = /^[\p{L}]{6,}(?: [\p{L}]+)*$/u;
    
    console.log(e); //impressão em console do objeto evento e
    console.log(e.target.value); //impressão em console do valor do objeto 'nome' que originou o evento   

    if(e.target.value.trim().match(regexNome) === null){
        //muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id = inputNameHelp
        nomeHelp.textContent = "Formato de nome inválido"; 
        nomeHelp.style.color = "red";
    }
    else {
        nomeHelp.textContent = "";
    }       
}

function validarAno() {
    // declaração da expressão regular para definir o formato de um ano válido
    const regexAno = /^[0-9]{4}$/;
    // tirar (trim) espaços em branco antes e depois da string
    const anoTrimado = ano.value.trim();
    console.log(ano.value);

    if (anoTrimado.match(regexAno) === null) {
        // muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
        anoHelp.textContent = "Formato de ano inválido";
        anoHelp.style.color = "red";
        
    } else {
        // objeto Date
        var date = new Date();
        // obtem o ano atual
        console.log(date.getFullYear());

        if (parseInt(anoTrimado) > parseInt(date.getFullYear())) {
            // muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser maior que ${date.getFullYear()}.`;
            anoHelp.style.color = "red";
        } else if (parseInt(anoTrimado) < parseInt(date.getFullYear()) - 120) {
            // muda o conteúdo e o estilo do objeto nomeHelp que referencia o elemento html com id=inputYearHelp
            anoHelp.textContent = `Ano inválido. O ano não pode ser menor que ${date.getFullYear() - 120}.`;
            anoHelp.style.color = "red";
        } else {
            anoHelp.textContent = "";
        }

    }
}

function validarEmail() {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})?(?:\.br|\.com|\.net|\.org)$/

    if (!regexEmail.test(email.value.trim())) {
        emailHelp.textContent = "Formato de e-mail inválido";
        emailHelp.style.color = "red";
    } else {
        emailHelp.textContent = "";
    }
}

function validarPassword() {
    const senha = password.value.trim();
    const nome = document.querySelector("#inputName").value.trim();
    const anoNascimento = document.querySelector("#inputYear").value.trim();
    const nomeAnoRegex = new RegExp(nome.toLowerCase() + "|" + anoNascimento);

    if (senha.length < 6 || senha.length > 20) {
        passwordHelp.textContent = "A senha deve ter entre 6 e 20 caracteres";
        passwordHelp.style.color = "red";
        return;
    }

    const regexCaractereEspecial = /[@#$%&!+_\-]/;
    const regexNumero = /[0-9]/;
    const regexLetra = /[a-zA-Z]/;

    if (!regexCaractereEspecial.test(senha) || !regexNumero.test(senha)) {
        passwordHelp.textContent = "A senha deve conter pelo menos um caractere especial e um número";
        passwordHelp.style.color = "red";
        return;
    }

    let forcaSenha = "";
    if (senha.length < 8) {
        forcaSenha = "fraca";
        passwordHelp.style.color = "red";
    } else if (senha.length <= 12) {
        if (regexLetra.test(senha) && senha !== senha.toLowerCase()) {
            forcaSenha = "moderada";
            passwordHelp.style.color = "orange";
        } else {
            forcaSenha = "fraca";
            passwordHelp.style.color = "red";
        }
    } else {
        let caractereEspecialCount = (senha.match(/[@#$%&!+_\-]+/g) || []).length;
        let numeroCount = (senha.match(/[0-9]/g) || []).length;
        let letraMaiusculaCount = (senha.match(/[A-Z]/g) || []).length;

        if (caractereEspecialCount > 1 && numeroCount > 1 && letraMaiusculaCount > 1) {
            forcaSenha = "forte";
            passwordHelp.style.color = "green";
        } else {
            forcaSenha = "moderada";
            passwordHelp.style.color = "orange";
        }
    }

    if (nomeAnoRegex.test(senha.toLowerCase())) {
        passwordHelp.textContent = "A senha não pode conter o nome ou o ano de nascimento do usuário";
        passwordHelp.style.color = "red";
        return;
    }

    passwordHelp.textContent = `Força da senha: ${forcaSenha}`;
}
