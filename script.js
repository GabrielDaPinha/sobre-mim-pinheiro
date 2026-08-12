// isso aqui "liga o script" no botao
const botao = document.getElementById('modos');
const htmlElement = document.documentElement;

// isso ativa o modo escuro
botao.addEventListener('click', () => {
    htmlElement.classList.toggle('modo-escuro');
    
// isso aqui muda o texto do botao dependendo do modo
    if (htmlElement.classList.contains('modo-escuro')) {
        botao.textContent = 'Modo Claro';
    } else {
        botao.textContent = 'Modo Escuro';
    }
});