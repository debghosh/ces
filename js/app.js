// ==========================
// CES POWER PRO - MAIN APP
// Coordination and initialization only
// All features are modularized
// ==========================

(function(window) {
    'use strict';
    
    console.log('🚀 CES Power Pro initializing...');
    
    /**
     * Initialize application on page load
     */
    function initializeApp() {
        console.log('📱 Initializing app modules...');
        
        // Initialize charts on first load
        setTimeout(() => {
            if (document.getElementById('spendingChart')) {
                window.Charts.drawSpendingChart('12');
            }
            if (document.getElementById('carbonChart')) {
                window.Charts.drawCarbonChart('12');
            }
        }, 100);
        
        // Initialize equipment display
        if (document.querySelector('.equipment-grid')) {
            window.Equipment.updateEquipmentDisplay();
        }
        
        // Initialize quotes system
        window.Quotes.initializeQuotesSystem();
        
        // Render quotes page if active
        if (document.getElementById('quotes')?.classList.contains('active')) {
            window.Quotes.renderQuotesPage();
        }
        
        console.log('✅ App initialization complete');
    }
    
    /**
     * Handle window resize - redraw charts
     */
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const analyticsPage = document.getElementById('analytics');
            const sustainabilityPage = document.getElementById('sustainability');
            
            if (analyticsPage?.classList.contains('active')) {
                window.Charts.drawSpendingChart('12');
            }
            if (sustainabilityPage?.classList.contains('active')) {
                window.Charts.drawCarbonChart('12');
            }
        }, 250);
    });
    
    /**
     * TEMPORARY FIX: Mobile table sticky column overlap
     * TODO: Find source of inline position:relative on table cells
     * This JS override is a workaround until root cause is found
     */
    function fixMobileTableSticky() {
        if (window.innerWidth <= 768) {
            const firstCells = document.querySelectorAll('.table td:first-child, .table th:first-child');
            firstCells.forEach(cell => {
                cell.style.removeProperty('position');
                cell.style.removeProperty('left');
                cell.style.removeProperty('transform');
                cell.style.removeProperty('z-index');
                
                cell.style.setProperty('position', 'static', 'important');
                cell.style.setProperty('background', '#f0f9ff', 'important');
                cell.style.setProperty('border-right', '2px solid #3b82f6', 'important');
            });
        }
    }
    
    /**
     * Hook into PageRouter to run initialization after page loads
     */
    if (window.PageRouter) {
        const originalRenderPage = PageRouter.renderPage;
        PageRouter.renderPage = function(pageName, html) {
            originalRenderPage.call(this, pageName, html);
            
            // Run page-specific initialization
            setTimeout(() => {
                switch(pageName) {
                    case 'dashboard':
                    case 'analytics':
                        window.Charts.drawSpendingChart('12');
                        break;
                    case 'sustainability':
                        window.Charts.drawCarbonChart('12');
                        break;
                    case 'equipment':
                        window.Equipment.updateEquipmentDisplay();
                        break;
                    case 'quotes':
                        window.Quotes.renderQuotesPage();
                        break;
                    case 'my-events':
                        // Apply table fix for mobile
                        fixMobileTableSticky();
                        break;
                }
            }, 150);
        };
    }
    
    /**
     * Also run mobile table fix on window resize
     */
    let tableFixTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(tableFixTimeout);
        tableFixTimeout = setTimeout(fixMobileTableSticky, 100);
    });
    
    /**
     * Initialize on page load
     */
    window.addEventListener('load', () => {
        initializeApp();
    });
    
    /**
     * Export debug interface
     */
    window.CESPortal = {
        version: '2.0.0',
        modules: {
            utils: window.Utils,
            navigation: window.Navigation,
            chat: window.Chat,
            charts: window.Charts,
            equipment: window.Equipment,
            quotes: window.Quotes,
            data: {
                equipment: window.EquipmentData,
                charts: window.ChartData
            }
        },
        // Helper methods
        getQuoteCart: () => window.Quotes.getCart(),
        getSavedQuotes: () => window.Quotes.getSavedQuotes(),
        getEquipment: () => window.EquipmentData.inventory,
        // Debug helpers
        clearLocalStorage: () => {
            localStorage.removeItem('cespower_savedQuotes');
            localStorage.removeItem('cespower_quoteTemplates');
            console.log('✅ LocalStorage cleared');
        },
        resetFilters: () => {
            window.Equipment.resetFilters();
            console.log('✅ Filters reset');
        }
    };
    
    console.log('✅ CES Power Pro loaded');
    console.log('💡 Access debug interface: window.CESPortal');
    
})(window);