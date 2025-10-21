/* =====================================================
   PAGE ROUTER - Template Loading System
   Load page templates dynamically while keeping old system as fallback
   ===================================================== */

const PageRouter = {
    currentPage: null,
    templateCache: {},
    useTemplates: true, // Set to false to use old system
    
    /**
     * Load a page template dynamically
     * Falls back to old showPage() if template not found
     */
    async loadPage(pageName) {
        // If templates disabled, use old system
        if (!this.useTemplates) {
            this.fallbackToOldSystem(pageName);
            return;
        }
        
        try {
            console.log(`Loading template: ${pageName}`);
            
            // Show loading state
            this.showLoading();
            
            // Check cache first
            if (this.templateCache[pageName]) {
                console.log(`Using cached template: ${pageName}`);
                this.renderPage(pageName, this.templateCache[pageName]);
                return;
            }
            
            // Load template from server
            const response = await fetch(`templates/${pageName}.html`);
            
            if (!response.ok) {
                throw new Error(`Template not found: ${pageName} (${response.status})`);
            }
            
            const html = await response.text();
            
            // Cache it
            this.templateCache[pageName] = html;
            
            // Render it
            this.renderPage(pageName, html);
            
            console.log(`Template loaded successfully: ${pageName}`);
            
        } catch (error) {
            console.error('Error loading page template:', error);
            console.log('Falling back to old system...');
            
            // Fallback to old system
            this.fallbackToOldSystem(pageName);
        }
    },
    
    /**
     * Render page HTML into container
     */
    renderPage(pageName, html) {
        // Get container (try new first, then old)
        const container = document.getElementById('dynamicContent') || 
                         document.getElementById('mainContent');
        
        if (!container) {
            console.error('No content container found');
            this.fallbackToOldSystem(pageName);
            return;
        }
        
        // Hide old pages if they exist
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Render new content
        container.innerHTML = html;
        container.style.display = 'block';
        
        // Update current page
        this.currentPage = pageName;
        
        // Update navigation active state
        this.updateNavigation(pageName);
        
        // Hide loading state
        this.hideLoading();
        
        // Initialize page-specific code
        this.initializePage(pageName);
        
        // Update URL hash
        this.updateURL(pageName);
        
        // Scroll to top
        window.scrollTo(0, 0);
    },
    
    /**
     * Initialize page-specific functionality
     */
    initializePage(pageName) {
        // Call page-specific init if exists
        if (window.PageHandlers && window.PageHandlers[pageName]?.init) {
            console.log(`Initializing page handler: ${pageName}`);
            window.PageHandlers[pageName].init();
        }
        
        // Common initializations
        switch(pageName) {
            case 'dashboard':
                if (typeof drawSpendingChart === 'function') {
                    setTimeout(() => drawSpendingChart('12'), 100);
                }
                break;
                
            case 'analytics':
                if (typeof drawSpendingChart === 'function') {
                    setTimeout(() => drawSpendingChart('12'), 100);
                }
                break;
                
            case 'sustainability':
                if (typeof drawCarbonChart === 'function') {
                    setTimeout(() => drawCarbonChart('12'), 100);
                }
                break;
                
            case 'equipment':
                if (typeof updateEquipmentDisplay === 'function') {
                    updateEquipmentDisplay();
                }
                break;
                
            case 'quotes':
                if (typeof renderQuotesPage === 'function') {
                    renderQuotesPage();
                }
                break;
        }
    },
    
    /**
     * Update navigation active state
     */
    updateNavigation(pageName) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Find and activate the nav item for this page
        const navItem = document.querySelector(`.nav-item[data-page="${pageName}"]`);
        if (navItem) {
            navItem.classList.add('active');
        }
    },
    
    /**
     * Update browser URL
     */
    updateURL(pageName) {
        if (window.history && window.history.pushState) {
            window.history.pushState(
                { page: pageName }, 
                '', 
                `#${pageName}`
            );
        }
    },
    
    /**
     * Show loading indicator
     */
    showLoading() {
        const container = document.getElementById('dynamicContent') || 
                         document.getElementById('mainContent');
        
        if (container) {
            container.style.opacity = '0.5';
            container.style.pointerEvents = 'none';
        }
    },
    
    /**
     * Hide loading indicator
     */
    hideLoading() {
        const container = document.getElementById('dynamicContent') || 
                         document.getElementById('mainContent');
        
        if (container) {
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
        }
    },
    
    /**
     * Fallback to original showPage system
     */
    fallbackToOldSystem(pageName) {
        console.log(`Using old system for: ${pageName}`);
        
        // Show old pages, hide dynamic content
        const dynamicContent = document.getElementById('dynamicContent');
        if (dynamicContent) {
            dynamicContent.style.display = 'none';
        }
        
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'block';
        });
        
        // Call existing showPage function
        if (typeof showPage === 'function') {
            showPage(pageName);
        }
    },
    
    /**
     * Preload a template
     */
    async preload(pageName) {
        if (this.templateCache[pageName]) {
            return; // Already cached
        }
        
        try {
            const response = await fetch(`templates/${pageName}.html`);
            if (response.ok) {
                const html = await response.text();
                this.templateCache[pageName] = html;
                console.log(`Preloaded template: ${pageName}`);
            }
        } catch (error) {
            console.log(`Could not preload template: ${pageName}`);
        }
    },
    
    /**
     * Clear template cache
     */
    clearCache() {
        this.templateCache = {};
        console.log('Template cache cleared');
    }
};

// Handle browser back/forward
window.addEventListener('popstate', (event) => {
    if (event.state?.page) {
        PageRouter.loadPage(event.state.page);
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Check for hash in URL
    const hash = window.location.hash.slice(1);
    if (hash && PageRouter.useTemplates) {
        PageRouter.loadPage(hash);
    }
    
    // Preload common templates
    setTimeout(() => {
        PageRouter.preload('dashboard');
        PageRouter.preload('equipment');
        PageRouter.preload('quotes');
    }, 1000);
});

// Export to global scope
window.PageRouter = PageRouter;

// Helper function for navigation
window.navigateTo = function(pageName) {
    PageRouter.loadPage(pageName);
};

console.log('✅ Page Router initialized');
console.log('Use: navigateTo("pageName") or PageRouter.loadPage("pageName")');
console.log('Toggle templates with: PageRouter.useTemplates = false');