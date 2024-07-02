document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.sidebar li');
    const experiences = document.querySelectorAll('.experience');

    items.forEach((item, index) => {
        item.addEventListener('click', function () {
            // Remove a classe 'active' de todos os itens
            items.forEach(i => i.classList.remove('active'));
            // Adiciona a classe 'active' ao item clicado
            item.classList.add('active');
            // Esconde todas as experiências
            experiences.forEach(exp => exp.style.display = 'none');
            // Mostra a experiência selecionada
            experiences[index].style.display = 'block';
        });
    });
});
