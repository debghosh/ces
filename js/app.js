// ==========================
// CES POWER PRO - MAIN APP
// Coordination and initialization only
// All features are modularized
// ==========================

(function(window) {
    'use strict';
    
    console.log('🚀 CES Power Pro initializing...');
    
    /**
     * Event Delegation Setup
     * Handles all dynamically loaded content interactions
     */
    function initializeEventDelegation() {
        console.log('🎯 Setting up event delegation...');
        
        // Central event delegation handler
        document.addEventListener('click', function(e) {
            const target = e.target;
            
            // Handle Quote Tabs - detect by tab content
            const tab = target.closest('.tab');
            if (tab) {
                const tabsContainer = tab.parentElement;
                const tabText = tab.textContent.trim();
                
                // Check if this is a quotes tab by its content
                const isQuoteTab = tabText.includes('New Quote') || 
                                  tabText.includes('Active Quote') || 
                                  tabText.includes('Past Quotes') || 
                                  tabText.includes('Templates') ||
                                  tabText.includes('⚡') || 
                                  tabText.includes('🛒') || 
                                  tabText.includes('📋') || 
                                  tabText.includes('📑');
                
                if (isQuoteTab && tabsContainer && tabsContainer.classList.contains('tabs')) {
                    console.log('🎯 Quote tab clicked:', tabText);
                    
                    if (tabText.includes('New Quote') || tabText.includes('⚡')) {
                        window.Quotes.switchQuoteTab('new');
                    } else if (tabText.includes('Active Quote') || tabText.includes('🛒')) {
                        window.Quotes.switchQuoteTab('active');
                    } else if (tabText.includes('Past Quotes') || tabText.includes('📋')) {
                        window.Quotes.switchQuoteTab('past');
                    } else if (tabText.includes('Templates') || tabText.includes('📑')) {
                        window.Quotes.switchQuoteTab('templates');
                    }
                    
                    e.preventDefault();
                    return;
                }
                
                // Let Equipment module handle its own tabs - check for equipment page
                if (tabsContainer && tabsContainer.classList.contains('tabs') && 
                    tabsContainer.closest('#equipment')) {
                    
                    const equipTabText = tab.textContent.trim().toLowerCase();
                    
                    if (equipTabText.includes('all equipment')) {
                        window.Equipment.setCategory('all');
                    } else if (equipTabText.includes('generators')) {
                        window.Equipment.setCategory('generator');
                    } else if (equipTabText.includes('battery')) {
                        window.Equipment.setCategory('battery');
                    } else if (equipTabText.includes('hybrid')) {
                        window.Equipment.setCategory('hybrid');
                    } else if (equipTabText.includes('accessories')) {
                        window.Equipment.setCategory('accessory');
                    }
                    
                    e.preventDefault();
                    return;
                }
            }
            
            // Handle Quick Action cards (if they have data attributes)
            if (target.closest('.quick-action[data-page]')) {
                const quickAction = target.closest('.quick-action');
                const targetPage = quickAction.getAttribute('data-page');
                if (targetPage && window.PageRouter) {
                    window.PageRouter.loadPage(targetPage);
                    e.preventDefault();
                    return;
                }
            }
            
            // Handle nav items with data-page attribute
            if (target.closest('.nav-item[data-page]')) {
                const navItem = target.closest('.nav-item');
                const targetPage = navItem.getAttribute('data-page');
                if (targetPage && window.PageRouter) {
                    window.PageRouter.loadPage(targetPage);
                    e.preventDefault();
                    return;
                }
            }
        });
        
        // Handle keyboard navigation for tabs
        document.addEventListener('keydown', function(e) {
            if (e.target.closest('.tabs .tab')) {
                const tab = e.target.closest('.tab');
                
                // Enter or Space triggers click
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    tab.click();
                }
                
                // Arrow key navigation within tabs
                if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    const tabs = Array.from(tab.parentElement.querySelectorAll('.tab'));
                    const currentIndex = tabs.indexOf(tab);
                    let nextIndex;
                    
                    if (e.key === 'ArrowLeft') {
                        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    } else {
                        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    }
                    
                    const nextTab = tabs[nextIndex];
                    if (nextTab) {
                        nextTab.focus();
                        nextTab.click();
                    }
                    
                    e.preventDefault();
                }
            }
        });
        
        console.log('✅ Event delegation setup complete');
    }
    
    /**
     * Initialize application on page load
     */
    function initializeApp() {
        console.log('📱 Initializing app modules...');
        
        // Set up event delegation first
        initializeEventDelegation();
        
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

        // Initialize AI Assistant if available
        if (typeof window.AIAssistant !== 'undefined') {
            window.AIAssistant.init();
            console.log('✅ AI Assistant initialized');
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
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        // DOM already loaded
        initializeApp();
    }
    
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