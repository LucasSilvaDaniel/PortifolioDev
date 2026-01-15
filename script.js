document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // 1. Tradução (Inglês/Português)
    // ===============================================

    const langToggle = document.getElementById('lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    let currentLang = localStorage.getItem('lang') || 'en';

    // Função para aplicar a tradução
    const applyTranslation = (lang) => {
        elementsToTranslate.forEach(element => {
            const translationKey = `data-${lang}`;
            const text = element.getAttribute(translationKey);
            if (text) {
                element.textContent = text;
            }

            // Tratamento especial para placeholders de formulário
            const placeholderKey = `data-${lang}-placeholder`;
            const placeholder = element.getAttribute(placeholderKey);
            if (placeholder) {
                element.placeholder = placeholder;
            }
        });

        // Atualiza o texto do botão de toggle
        const toggleText = langToggle.querySelector('span');
        toggleText.textContent = toggleText.getAttribute(`data-${lang === 'en' ? 'pt' : 'en'}`);
        langToggle.setAttribute('data-current-lang', lang);

        // Atualiza o HTML lang attribute para acessibilidade
        document.documentElement.lang = lang;
        currentLang = lang;
        localStorage.setItem('lang', lang);
    };

    // Aplica a linguagem salva ao carregar
    applyTranslation(currentLang);

    // Listener para o botão de toggle
    langToggle.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'pt' : 'en';
        applyTranslation(newLang);
    });

    // ===============================================
    // 2. Modo Escuro (Dark Mode)
    // ===============================================

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Inicializa o tema
    if (currentTheme) {
        body.classList.add(currentTheme);
        updateDarkModeIcon(currentTheme === 'dark-mode');
    } else {
        updateDarkModeIcon(false);
    }

    // Listener para o Dark Mode
    darkModeToggle.addEventListener('click', () => {
        const isDarkMode = body.classList.toggle('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
        updateDarkModeIcon(isDarkMode);
    });

    // Função para trocar o ícone (lua/sol)
    function updateDarkModeIcon(isDarkMode) {
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-moon', 'fa-sun');
            icon.classList.add(isDarkMode ? 'fa-sun' : 'fa-moon');
        }
    }

    // ===============================================
    // 3. Efeito de Revelação na Rolagem (Scroll Reveal)
    // ===============================================

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-slide-up, .reveal-fade-in');

    const observerOptions = {
        threshold: 0.15, // Revela quando 15% do elemento está visível
        rootMargin: '0px 0px -50px 0px' 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
});