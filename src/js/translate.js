import GLightbox from 'glightbox';

// Variabilă globală pentru limba curentă
let currentLangData = {};

// Fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
}

// Set language and scroll
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    const scrollY = window.scrollY;
    localStorage.setItem('scrollPosition', scrollY);
}

// Apply translations
function updateContent(langData) {
    if (Object.keys(langData).length > 0) {
        document.querySelectorAll('[data-tr]').forEach(element => {
            const key = element.getAttribute('data-tr');
            if (key && langData[key]) {
                element.textContent = langData[key];
            }
        });

        document.querySelectorAll('[data-attr-tr]').forEach(element => {
            const key = element.getAttribute('data-attr-tr');
            if (key && langData[key]) {
                if (element.hasAttribute('data-typed-items')) {
                    element.setAttribute('data-typed-items', langData[key]);
                }
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', langData[key]);
                }
            }
        });
    }
}

// Change language (globally accessible)
window.changeLanguage = async function (lang) {
    setLanguagePreference(lang);
    currentLangData = await fetchLanguageData(lang);
    updateContent(currentLangData);
}

// On page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('lang', userPreferredLanguage);

    const langButton = document.querySelector(`[data-id="${userPreferredLanguage}"]`);
    if (langButton) {
        langButton.classList.add('active');
    }

    currentLangData = await fetchLanguageData(userPreferredLanguage);
    updateContent(currentLangData);

    setTimeout(() => {
        const savedPosition = localStorage.getItem("scrollPosition");
        if (savedPosition !== null) {
            window.scrollTo({
                top: parseInt(savedPosition),
                behavior: "smooth"
            });
        }
    }, 100);

    // GLightbox initialization
    GLightbox();
});
