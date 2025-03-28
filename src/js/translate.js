// Function to fetch language data
async function fetchLanguageData(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
}
// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);

    // Salvează poziția de scroll
    const scrollY = window.scrollY;
    localStorage.setItem('scrollPosition', scrollY);

    //location.reload();
}
// Function to update content based on selected language
function updateContent(langData) {
    // alert(JSON.stringify(langData, null, 2));
    if (Object.keys(langData).length > 0) {
        document.querySelectorAll('[data-tr]').forEach(element => {
            const key = element.getAttribute('data-tr');
            if (key !== 'undefined' || langData[key] !== 'undefined') {
                element.textContent = langData[key];
            }

        });
        document.querySelectorAll('[data-attr-tr]').forEach(element => {
            const key = element.getAttribute('data-attr-tr');
            if (key !== 'undefined' || langData[key] !== 'undefined') {
                // Verifică dacă elementul are atributul placeholder
                if (element.hasAttribute('data-typed-items')) {
                    element.setAttribute('data-typed-items', langData[key]);
                }
                // Verifică dacă elementul are atributul placeholder
                if (element.hasAttribute('placeholder')) {
                    element.setAttribute('placeholder', langData[key]);
                }
            }
        });
    } else {
        console.log("Obiectul este gol!");
    }



}

// Function to change language
// !!!Ca sa o putem folosi in fisierul HTML se declara cu window
window.changeLanguage = function (lang) {
    //console.log('limba aleasa', lang);
    setLanguagePreference(lang);

    const langData = fetchLanguageData(lang);
    updateContent(langData);


}
// Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    //console.log('limba aleasa2', userPreferredLanguage);
    document.documentElement.setAttribute('lang', userPreferredLanguage);
    document.querySelector('[data-id= "' + userPreferredLanguage + '"]').classList.add('active');
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);

    setTimeout(() => {
        const savedPosition = localStorage.getItem("scrollPosition");
        if (savedPosition !== null) {
            window.scrollTo({
                top: parseInt(savedPosition),
                behavior: "smooth"
            });
        }
    }, 100); // Așteaptă 100ms înainte de repoziționare

});
