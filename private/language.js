// language.js - Gestión de idiomas con banderas (versión corregida)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌍 Inicializando sistema de idiomas...');
    initLanguage();
});

function initLanguage() {
    const languageToggle = document.getElementById('languageToggle');

    if (!languageToggle) {
        console.error('❌ No se encontró el botón languageToggle');
        setTimeout(initLanguage, 100); // Reintentar después de 100ms
        return;
    }

    console.log('✅ Botón de idioma encontrado');

    // Detectar idioma del dispositivo
    const deviceLanguage = navigator.language || navigator.userLanguage || 'es';
    const isSpanish = deviceLanguage.startsWith('es');

    console.log('🌍 Idioma del dispositivo:', deviceLanguage, '¿Es español?:', isSpanish);

    // Prioridad: 1. Guardado en localStorage, 2. Idioma del dispositivo, 3. Español por defecto
    const savedLanguage = localStorage.getItem('language');
    let currentLanguage;

    if (savedLanguage) {
        currentLanguage = savedLanguage;
        console.log('💾 Usando idioma guardado:', currentLanguage);
    } else if (isSpanish) {
        currentLanguage = 'es';
        console.log('📱 Usando español (dispositivo)');
    } else {
        currentLanguage = 'en';
        console.log('🌐 Usando inglés (dispositivo no-español)');
    }

    // Aplicar idioma inicial
    applyLanguage(currentLanguage);

    // Configurar evento del botón
    languageToggle.addEventListener('click', function() {
        console.log('🔄 Click en botón de idioma detectado');
        handleLanguageToggle();
    });

    console.log('✅ Sistema de idiomas inicializado correctamente');
}

function handleLanguageToggle() {
    const currentLang = document.documentElement.getAttribute('lang') || 'es';
    const newLang = currentLang === 'es' ? 'en' : 'es';

    console.log('🔄 Cambiando idioma:', currentLang, '→', newLang);

    applyLanguage(newLang);
    localStorage.setItem('language', newLang);
}

function applyLanguage(lang) {
    console.log('🎯 Aplicando idioma:', lang);

    // Cambiar atributo lang del HTML
    document.documentElement.setAttribute('lang', lang);

    // Actualizar icono del botón (bandera)
    updateLanguageIcon(lang);

    // Actualizar todo el texto
    updateAllText(lang);
}

function updateLanguageIcon(lang) {
    const languageIcon = document.querySelector('.language-icon');
    if (languageIcon) {
        languageIcon.textContent = lang === 'es' ? '🇺🇸' : '🇪🇸';
        console.log('🎌 Bandera actualizada:', languageIcon.textContent);
    }
}

function updateAllText(lang) {
    console.log('📝 Actualizando textos para:', lang);

    // Textos traducidos
    const translations = {
        es: {
            contact: "Contactar",
            linkedinDesc: "Conecta profesionalmente",
            devbydapDesc: "Blog de desarrollo"
        },
        en: {
            contact: "Contact",
            linkedinDesc: "Professional network",
            devbydapDesc: "Development blog"
        }
    };

    const t = translations[lang];

    // Actualizar elementos específicos
    try {
        const contactButton = document.querySelector('.cta-button span');
        if (contactButton) {
            contactButton.textContent = t.contact;
            console.log('✅ Contacto actualizado:', t.contact);
        }

        const linkedinDesc = document.querySelector('.link-item:nth-child(1) .link-text p');
        if (linkedinDesc) {
            linkedinDesc.textContent = t.linkedinDesc;
            console.log('✅ LinkedIn actualizado:', t.linkedinDesc);
        }

        const devbydapDesc = document.querySelector('.link-item:nth-child(2) .link-text p');
        if (devbydapDesc) {
            devbydapDesc.textContent = t.devbydapDesc;
            console.log('✅ DevByDAP actualizado:', t.devbydapDesc);
        }

    } catch (error) {
        console.error('❌ Error actualizando textos:', error);
    }

    // Actualizar meta description
    updateMetaDescription(lang);
}

function updateMetaDescription(lang) {
    const descriptions = {
        es: "davidalvarezp: Administrador de sistemas, especialista en ciberseguridad y desarrollador. Ofrece soluciones digitales, optimización de servidores y diseño web profesional.",
        en: "davidalvarezp: Systems Administrator, Cybersecurity specialist and developer. Offers digital solutions, server optimization and professional web design."
    };

    const metaDescription = document.querySelector('meta[name="description"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (metaDescription) metaDescription.setAttribute('content', descriptions[lang]);
    if (ogDescription) ogDescription.setAttribute('content', descriptions[lang]);

    console.log('🔍 Meta description actualizada');
}
