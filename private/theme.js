// theme.js - Gestión del tema claro/oscuro sin guardar preferencias
function initTheme() {
    console.log('🎨 Inicializando tema...');
    
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
        console.error('❌ No se encontró el botón themeToggle');
        return;
    }
    
    // Detectar preferencia del sistema
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemTheme = systemPrefersDark ? 'dark' : 'light';
    
    console.log('💻 Tema del sistema:', systemTheme);
    
    // Aplicar tema del sistema
    applyTheme(systemTheme);
    
    // Configurar evento del botón
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('🔄 Cambiando tema:', currentTheme, '→', newTheme);
        
        applyTheme(newTheme);
        // NO se guarda en localStorage - cambio temporal solamente
    });
    
    // Escuchar cambios en el tema del sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', function(e) {
        const newSystemTheme = e.matches ? 'dark' : 'light';
        console.log('🔄 Sistema cambió a tema:', newSystemTheme);
        applyTheme(newSystemTheme);
    });
    
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
    }
    
    function updateThemeIcon(theme) {
        const themeIcon = themeToggle.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Esperar a que el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}
