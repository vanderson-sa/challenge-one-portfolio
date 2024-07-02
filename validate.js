//Seu JavaScript de validação aqui
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formulario');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        // Resetar mensagens de erro
        const mensagensErro = form.querySelectorAll('.mensagem__erro');
        mensagensErro.forEach(mensagem => mensagem.textContent = '');

        // Validar campos
        let camposValidos = true;

        // Validar Nome
        const nome = form.elements['nome'].value.trim();
        if (nome.length < 4) {
            document.getElementById('erro-nome').textContent = 'Nome deve ter pelo menos 4 caracteres.';
            camposValidos = false;
        }

        // Validar Email
        const email = form.elements['email'].value.trim();
        if (!isValidEmail(email)) {
            document.getElementById('erro-email').textContent = 'Email inválido.';
            camposValidos = false;
        }

        // Validar Assunto
        const assunto = form.elements['assunto'].value.trim();
        if (assunto.length < 4) {
            document.getElementById('erro-assunto').textContent = 'Assunto deve ter pelo menos 4 caracteres.';
            camposValidos = false;
        }

        // Validar Mensagem
        const mensagem = form.elements['mensagem'].value.trim();
        if (mensagem.length < 4) {
            document.getElementById('erro-mensagem').textContent = 'Mensagem deve ter pelo menos 4 caracteres.';
            camposValidos = false;
        }

        // Se todos os campos forem válidos, enviar o formulário
        if (camposValidos) {
            // Simular envio do formulário
            setTimeout(function () {
                form.style.display = 'none'; // Oculta o formulário
                mensagemSucesso.style.display = 'block'; // Exibe mensagem de sucesso
                mensagemSucesso.textContent = 'Mensagem enviada com sucesso!';
            }, 1000);

            // Salvar no LocalStorage
            const listaRespostas = {
                "nome": nome,
                "email": email,
                "assunto": assunto,
                "mensagem": mensagem,
            };
            localStorage.setItem("Contato", JSON.stringify(listaRespostas));
        }
    });

    // Validação do formato de email
    function isValidEmail(email) {
        // Lógica simples para verificar se o email tem um formato válido
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Adicionar eventos de blur para verificar campos individualmente
    const camposDoFormulario = document.querySelectorAll("[required]");
    camposDoFormulario.forEach((campo) => {
        campo.addEventListener("blur", () => verificarCampo(campo));
        campo.addEventListener("invalid", (evento) => evento.preventDefault()); // Evita a mensagem padrão do HTML
    });

    // Mensagens de erro por tipo de validação
    const possiveisErros = ['valueMissing', 'typeMismatch', 'tooShort'];
    const mensagensDeErro = {
        "nome": {
            "valueMissing": "Este campo não pode estar vazio",
            "tooShort": "Nome muito curto. Por favor, insira um nome válido"
        },
        "email": {
            "valueMissing": "Este campo não pode estar vazio",
            "typeMismatch": "Por favor, insira um e-mail válido",
            "tooShort": "E-mail muito curto. Por favor, insira um e-mail válido"
        },
        "assunto": {
            "valueMissing": "Este campo não pode estar vazio",
            "tooShort": "Assunto muito curto. Por favor, insira um assunto válido"
        },
        "mensagem": {
            "valueMissing": "Este campo não pode estar vazio",
            "tooShort": "Mensagem muito curta. Por favor, insira uma mensagem válida"
        }
    };

    // Verificação de cada campo individualmente
    function verificarCampo(campo) {
        const tipoCampo = campo.getAttribute("name");
        let mensagemDeErro = "";

        possiveisErros.forEach((erro) => {
            if (campo.validity[erro]) {
                mensagemDeErro = mensagensDeErro[tipoCampo][erro];
            }
        });

        const erroNaTela = campo.parentNode.querySelector('.mensagem__erro');
        if (!campo.checkValidity()) {
            erroNaTela.textContent = mensagemDeErro;
        } else {
            erroNaTela.textContent = "";
        }
    }
});