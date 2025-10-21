/* =====================================================
   PAGE ROUTER - Template Loading System (OPTIMIZED)
   All pages migrated - production ready
   ===================================================== */

const PageRouter = {
    currentPage: null,
    templateCache: {},
    useTemplates: true,
    
    /**
     * Load a page template dynamically
     */
    async loadPage(pageName) {
        if (!this.useTemplates) {
            console.warn('Templates disabled - check configuration');
            return;
        }
        
        try {
            console.log(`Loading page: ${pageName}`);
            
            // Show loading state
            this.showLoading();
            
            // Check cache first (performance optimization)
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
            
            // Cache it for future use
            this.templateCache[pageName] = html;
            
            // Render it
            this.renderPage(pageName, html);
            
            console.log(`✅ Page loaded: ${pageName}`);
            
        } catch (error) {
            console.error('Error loading page template:', error);
            this.showError(pageName);
        }
    },
    
    /**
     * Render page HTML into container
     */
    renderPage(pageName, html) {
        const container = document.getElementById('dynamicContent');
        
        if (!container) {
            console.error('Dynamic content container not found');
            return;
        }
        
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    
    /**
     * Initialize page-specific functionality
     * Best practice: All page initialization in one place
     */
    initializePage(pageName) {
        // Call custom page handlers if defined
        if (window.PageHandlers?.[pageName]?.init) {
            console.log(`Initializing page handler: ${pageName}`);
            try {
                window.PageHandlers[pageName].init();
            } catch (error) {
                console.error(`Error in page handler for ${pageName}:`, error);
            }
        }
        
        // Common page initializations
        switch(pageName) {
            case 'dashboard':
                // Initialize dashboard charts
                this.initDashboardCharts();
                break;
                
            case 'analytics':
                // Initialize analytics charts
                this.initAnalyticsCharts();
                break;
                
            case 'sustainability':
                // Initialize sustainability charts
                this.initSustainabilityCharts();
                break;
                
            case 'equipment':
                // Initialize equipment catalog
                this.initEquipmentCatalog();
                break;
                
            case 'quotes':
                // Initialize quotes page
                this.initQuotesPage();
                break;
                
            case 'my-events':
                // Initialize events table/filters
                this.initMyEventsPage();
                break;
                
            case 'live-monitoring':
                // Initialize live monitoring (could add real-time updates)
                this.initLiveMonitoring();
                break;
        }
    },
    
    /**
     * Dashboard initialization
     */
    initDashboardCharts() {
        if (typeof drawSpendingChart === 'function') {
            setTimeout(() => {
                try {
                    drawSpendingChart('12');
                } catch (error) {
                    console.error('Error drawing spending chart:', error);
                }
            }, 100);
        }
    },
    
    /**
     * Analytics initialization
     */
    initAnalyticsCharts() {
        if (typeof drawSpendingChart === 'function') {
            setTimeout(() => {
                try {
                    drawSpendingChart('12');
                } catch (error) {
                    console.error('Error drawing analytics chart:', error);
                }
            }, 100);
        }
    },
    
    /**
     * Sustainability initialization
     */
    initSustainabilityCharts() {
        if (typeof drawCarbonChart === 'function') {
            setTimeout(() => {
                try {
                    drawCarbonChart('12');
                } catch (error) {
                    console.error('Error drawing carbon chart:', error);
                }
            }, 100);
        }
    },
    
    /**
     * Equipment catalog initialization
     */
    initEquipmentCatalog() {
        if (typeof updateEquipmentDisplay === 'function') {
            try {
                updateEquipmentDisplay();
            } catch (error) {
                console.error('Error updating equipment display:', error);
            }
        }
    },
    
    /**
     * Quotes page initialization
     */
    initQuotesPage() {
        if (typeof renderQuotesPage === 'function') {
            try {
                renderQuotesPage();
            } catch (error) {
                console.error('Error rendering quotes page:', error);
            }
        }
    },
    
    /**
     * My Events page initialization
     */
    initMyEventsPage() {
        // Add any events-specific initialization here
        console.log('My Events page loaded');
    },
    
    /**
     * Live Monitoring initialization
     */
    initLiveMonitoring() {
        // Add real-time monitoring initialization here
        console.log('Live Monitoring page loaded');
        
        // Future: Could add WebSocket connection for real-time updates
        // Future: Could add auto-refresh for live data
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
        if (window.history?.pushState) {
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
        const container = document.getElementById('dynamicContent');
        if (container) {
            container.style.opacity = '0.5';
            container.style.pointerEvents = 'none';
        }
    },
    
    /**
     * Hide loading indicator
     */
    hideLoading() {
        const container = document.getElementById('dynamicContent');
        if (container) {
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
        }
    },
    
    /**
     * Show error message
     */
    showError(pageName) {
        const container = document.getElementById('dynamicContent');
        if (container) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center;">
                    <div style="font-size: 3em; margin-bottom: 20px;">⚠️</div>
                    <h2 style="color: #ef4444; margin-bottom: 10px;">Page Not Found</h2>
                    <p style="color: #64748b; margin-bottom: 20px;">
                        Could not load the ${pageName} page.
                    </p>
                    <button class="btn btn-primary" onclick="navigateTo('dashboard')">
                        Return to Dashboard
                    </button>
                </div>
            `;
            container.style.display = 'block';
        }
    },
    
    /**
     * Preload a template for better performance
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
                console.log(`✅ Preloaded: ${pageName}`);
            }
        } catch (error) {
            // Silently fail for preloading
            console.log(`⚠️ Could not preload: ${pageName}`);
        }
    },
    
    /**
     * Preload all templates for instant navigation
     */
    async preloadAll() {
        const pages = [
            'dashboard',
            'ai-recommendations',
            'quotes',
            'my-events',
            'live-monitoring',
            'equipment',
            'analytics',
            'sustainability',
            'billing',
            'team'
        ];
        
        console.log('🚀 Preloading all templates...');
        
        for (const page of pages) {
            await this.preload(page);
        }
        
        console.log('✅ All templates preloaded!');
    },
    
    /**
     * Clear template cache (useful for development)
     */
    clearCache() {
        this.templateCache = {};
        console.log('🗑️ Template cache cleared');
    }
};

// Handle browser back/forward buttons
window.addEventListener('popstate', (event) => {
    if (event.state?.page) {
        PageRouter.loadPage(event.state.page);
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Page Router initializing...');
    
    // Check for hash in URL and load that page
    const hash = window.location.hash.slice(1);
    if (hash && PageRouter.useTemplates) {
        PageRouter.loadPage(hash);
    } else {
        // Default to dashboard
        PageRouter.loadPage('dashboard');
    }
    
    // Preload common templates for instant navigation (best practice)
    setTimeout(() => {
        PageRouter.preload('equipment');
        PageRouter.preload('quotes');
        PageRouter.preload('my-events');
    }, 1000);
    
    // Optional: Preload all templates after 3 seconds for super-fast navigation
    // Uncomment if you want instant page loads (uses more memory)
    // setTimeout(() => PageRouter.preloadAll(), 3000);
});

// Export to global scope
window.PageRouter = PageRouter;

// Global navigation helper
window.navigateTo = function(pageName) {
    PageRouter.loadPage(pageName);
};

console.log('✅ Page Router initialized - Production ready');
console.log('📄 All templates: dashboard, equipment, quotes, my-events, live-monitoring, ai-recommendations, analytics, sustainability, billing, team');
console.log('💡 Use: navigateTo("pageName")');
console.log('🔧 Dev tools: PageRouter.clearCache(), PageRouter.preloadAll()');