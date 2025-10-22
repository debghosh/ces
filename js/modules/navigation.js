// ==========================
// NAVIGATION MODULE
// Handles mobile menu and sidebar
// ==========================

(function(window) {
    'use strict';
    
    /**
     * Toggle mobile sidebar menu
     */
    function toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');
        const body = document.body;
        
        if (!sidebar || !overlay) {
            console.error('⚠️ Sidebar elements not found');
            return;
        }
        
        // Toggle classes
        const isOpening = !sidebar.classList.contains('open');
        
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        body.style.overflow = isOpening ? 'hidden' : '';
    }
    
    /**
     * Close sidebar when clicking nav items on mobile
     */
    function closeSidebarOnNavClick() {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            
            if (sidebar?.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    }
    
    /**
     * Initialize mobile menu
     */
    function initMobileMenu() {
        // Add click handlers to nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', closeSidebarOnNavClick);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar?.classList.contains('open')) {
                    toggleSidebar();
                }
            }
        });
        
        console.log('✅ Mobile menu initialized');
    }
    
    /**
     * Update active navigation item
     * @param {string} pageName - Page name to activate
     */
    function setActiveNavItem(pageName) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const navItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
    }
    
    // Export to window
    window.Navigation = {
        toggleSidebar,
        closeSidebarOnNavClick,
        initMobileMenu,
        setActiveNavItem
    };
    
    // Make toggleSidebar globally accessible for onclick attributes
    window.toggleSidebar = toggleSidebar;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }
    
    console.log('✅ Navigation module loaded');
    
})(window);