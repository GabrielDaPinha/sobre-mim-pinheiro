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
    window.scrollTo({ top: 0, behavior: 'smooth' }); // volta a tela pro todo
});



//===================EFEITOS DE SESSAO===========================


document.addEventListener("DOMContentLoaded", () => {
    const sessoes = document.querySelectorAll(".sessao-1, .sessao-2, .sessao-3, .sessao-4");

    function fadeAudio(audio, targetVolume, duration = 1500) {
        if (!audio) return;
        
        // Se for para tocar e estiver pausado, inicia no volume 0 e dá o play
        if (targetVolume > 0 && audio.paused) {
            audio.volume = 0;
            audio.play().catch(() => {});
        }

        const stepTime = 50; 
        const steps = duration / stepTime;
        const volumeStep = (targetVolume - audio.volume) / steps;

        if (audio.fadeInterval) clearInterval(audio.fadeInterval);

        audio.fadeInterval = setInterval(() => {
            let newVolume = audio.volume + volumeStep;
            
            if (newVolume >= targetVolume) {
                audio.volume = targetVolume;
                clearInterval(audio.fadeInterval);
            } else if (newVolume <= 0) {
                audio.volume = 0;
                audio.pause();
                // NOTA: Removi o "audio.currentTime = 0" para ela continuar de onde parou!
                clearInterval(audio.fadeInterval);
            } else {
                audio.volume = newVolume;
            }
        }, stepTime);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sessao = entry.target;
            const audioAtual = sessao.querySelector("audio");

            if (entry.isIntersecting) {
                sessao.classList.add("visivel");

                if (audioAtual) {
                    // Para as outras músicas suavemente
                    document.querySelectorAll("audio").forEach(outroAudio => {
                        if (outroAudio !== audioAtual && !outroAudio.paused) {
                            fadeAudio(outroAudio, 0, 1500); // 1.5 segundos de fade out
                        }
                    });
                    
                    // AQUI VOCÊ MUDA O TEMPO DO FADE-IN:
                    // 3000 significa 3 segundos subindo o volume bem devagarzinho
                    fadeAudio(audioAtual, 1, 3000); 
                }
            } else {
                sessao.classList.remove("visivel");

                if (audioAtual) {
                    fadeAudio(audioAtual, 0, 1500); // 1.5 segundos de fade out ao sair
                }
            }
        });
    }, { threshold: 0.5 });

    sessoes.forEach(sessao => observer.observe(sessao));
});