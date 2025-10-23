// ==========================
// QUOTES MODULE
// Quote cart, saved quotes, templates, and AI generation
// ==========================

(function(window) {
    'use strict';
    
    // State
    let quoteCart = [];
    let savedQuotes = [];
    let quoteTemplates = [];
    let activeQuote = {
        id: null,
        name: '',
        items: [],
        eventDetails: {},
        createdAt: null,
        updatedAt: null
    };
    
    let quotesPageFilters = {
        searchTerm: '',
        sortBy: 'date'
    };
    
    /**
     * Initialize quotes system from localStorage
     */
    function initializeQuotesSystem() {
        const savedQuotesData = localStorage.getItem('cespower_savedQuotes');
        const templatesData = localStorage.getItem('cespower_quoteTemplates');
        
        if (savedQuotesData) savedQuotes = JSON.parse(savedQuotesData);
        if (templatesData) quoteTemplates = JSON.parse(templatesData);
        
        if (quoteCart.length > 0) activeQuote.items = quoteCart;
        
        console.log('✅ Quotes system initialized:', savedQuotes.length, 'quotes,', quoteTemplates.length, 'templates');
    }
    
    /**
     * Persist quotes to localStorage
     */
    function persistQuotes() {
        localStorage.setItem('cespower_savedQuotes', JSON.stringify(savedQuotes));
        localStorage.setItem('cespower_quoteTemplates', JSON.stringify(quoteTemplates));
    }
    
    /**
     * Update quote cart badge
     */
    function updateQuoteCartBadge() {
        const totalItems = quoteCart.reduce((sum, item) => sum + item.quantity, 0);
        const badge = document.getElementById('quoteBadge');
        
        if (badge) {
            badge.textContent = totalItems;
            badge.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    /**
     * Add equipment to quote cart
     * @param {string} equipmentId - Equipment ID to add
     */
    function addToCart(equipmentId) {
        const equipment = window.EquipmentData.getById(equipmentId);
        if (!equipment) return;
        
        // Check if already in cart
        const existingIndex = quoteCart.findIndex(item => item.id === equipmentId);
        
        if (existingIndex >= 0) {
            quoteCart[existingIndex].quantity++;
        } else {
            quoteCart.push({
                ...equipment,
                quantity: 1,
                days: 1
            });
        }
        
        updateQuoteCartBadge();
        window.Utils.showNotification(`✅ ${equipment.name} added to quote!`, 'success');
        
        // Show clickable notification to view quote
        setTimeout(() => showQuoteNotification(), 500);
    }
    
    /**
     * Show notification with link to quote page
     */
    function showQuoteNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            padding: 20px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            cursor: pointer;
            animation: slideIn 0.3s ease-out;
            font-weight: 500;
            min-width: 280px;
        `;
        notification.innerHTML = `
            <div style="font-size: 1.1em; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                <span>📋</span>
                <span>View Your Quote</span>
            </div>
            <div style="font-size: 0.85em; opacity: 0.9;">
                Click here to review and save your quote
            </div>
            <div style="font-size: 0.75em; opacity: 0.7; margin-top: 8px;">
                Auto-closes in 10 seconds
            </div>
        `;
        notification.onclick = () => {
            window.navigateTo('quotes');
            setTimeout(() => switchQuoteTab('active'), 100);
            notification.remove();
        };
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 10000);
    }
    
    /**
     * Remove item from cart
     * @param {number} index - Cart item index
     */
    function removeFromCart(index) {
        const item = quoteCart[index];
        quoteCart.splice(index, 1);
        updateQuoteCartBadge();
        renderQuoteCartPanel();
        window.Utils.showNotification(`${item.name} removed from cart`, 'info');
    }
    
    /**
     * Update cart item quantity
     * @param {number} index - Cart item index
     * @param {number} change - Quantity change (+1 or -1)
     */
    function updateCartQuantity(index, change) {
        quoteCart[index].quantity += change;
        
        if (quoteCart[index].quantity <= 0) {
            removeFromCart(index);
        } else {
            renderQuoteCartPanel();
            updateQuoteCartBadge();
        }
    }
    
    /**
     * Clear entire cart
     */
    function clearCart() {
        if (confirm('Clear all items from cart?')) {
            quoteCart = [];
            updateQuoteCartBadge();
            renderQuoteCartPanel();
            window.Utils.showNotification('Cart cleared', 'info');
        }
    }
    
    /**
     * Toggle quote cart panel
     */
    function toggleQuoteCart() {
        let panel = document.getElementById('quoteCartPanel');
        
        if (!panel) {
            createQuoteCartPanel();
            panel = document.getElementById('quoteCartPanel');
        }
        
        panel.classList.toggle('open');
        
        if (panel.classList.contains('open')) {
            renderQuoteCartPanel();
        }
    }
    
    /**
     * Create quote cart panel HTML
     */
    function createQuoteCartPanel() {
        const panel = document.createElement('div');
        panel.id = 'quoteCartPanel';
        panel.className = 'quote-cart-panel';
        panel.innerHTML = `
            <div class="quote-cart-header">
                <h3>Quote Cart</h3>
                <button class="quote-cart-close" onclick="Quotes.toggleQuoteCart()">✕</button>
            </div>
            <div class="quote-cart-content" id="quoteCartContent"></div>
        `;
        
        document.body.appendChild(panel);
    }
    
    /**
     * Render quote cart panel content
     */
    function renderQuoteCartPanel() {
        const content = document.getElementById('quoteCartContent');
        if (!content) return;
        
        if (quoteCart.length === 0) {
            content.innerHTML = `
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h4 style="margin-bottom: 8px;">Your cart is empty</h4>
                    <p>Add equipment to get started</p>
                </div>
            `;
            return;
        }
        
        const subtotal = quoteCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;
        
        content.innerHTML = `
            ${quoteCart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-header">
                        <div class="cart-item-name">${item.emoji} ${item.name}</div>
                        <button class="cart-item-remove" onclick="Quotes.removeFromCart(${index})" title="Remove">🗑️</button>
                    </div>
                    <div style="color: #64748b; font-size: 0.85em; margin-bottom: 8px;">${item.specs}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="Quotes.updateCartQuantity(${index}, -1)">−</button>
                            <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button class="qty-btn" onclick="Quotes.updateCartQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                </div>
            `).join('')}
            
            <div class="cart-summary">
                <div class="cart-summary-row">
                    <span>Subtotal</span>
                    <span>$${subtotal.toLocaleString()}</span>
                </div>
                <div class="cart-summary-row">
                    <span>Tax (8%)</span>
                    <span>$${tax.toFixed(2)}</span>
                </div>
                <div class="cart-summary-total">
                    <span>Total</span>
                    <span>$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
            </div>
            
            <div class="cart-actions">
                <button class="btn btn-primary" onclick="Quotes.viewFullQuote()" style="width: 100%;">
                    📋 View Full Quote
                </button>
                <button class="btn btn-outline" onclick="Quotes.clearCart()" style="width: 100%;">
                    🗑️ Clear Cart
                </button>
            </div>
        `;
    }
    
    /**
     * Navigate to full quote view
     */
    function viewFullQuote() {
        toggleQuoteCart();
        window.navigateTo('quotes');
        setTimeout(() => switchQuoteTab('active'), 100);
    }
    
    /**
     * Switch quote tab
     * @param {string} tabName - Tab name: 'new', 'active', 'past', 'templates'
     */
    function switchQuoteTab(tabName) {
        document.querySelectorAll('.quote-tab-content').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('#quotes .tab').forEach(tab => tab.classList.remove('active'));
        
        let contentId = '';
        let tabIndex = 0;
        
        switch(tabName) {
            case 'new':
                contentId = 'newQuoteTab';
                tabIndex = 0;
                break;
            case 'active':
                contentId = 'activeQuoteTab';
                tabIndex = 1;
                renderActiveQuoteSection();
                break;
            case 'past':
                contentId = 'pastQuotesTab';
                tabIndex = 2;
                renderPastQuotesSection();
                break;
            case 'templates':
                contentId = 'templatesTab';
                tabIndex = 3;
                renderQuoteTemplatesSection();
                break;
        }
        
        // Activate the content
        document.getElementById(contentId)?.classList.add('active');
        
        // Activate the corresponding tab button
        const tabs = document.querySelectorAll('#quotes .tabs .tab');
        if (tabs[tabIndex]) {
            tabs[tabIndex].classList.add('active');
        }
    }
    
    /**
     * Render quotes page
     */
    function renderQuotesPage() {
        renderActiveQuoteSection();
        renderPastQuotesSection();
        renderQuoteTemplatesSection();
    }
    
    /**
     * Render active quote section
     */
    function renderActiveQuoteSection() {
        const container = document.getElementById('activeQuoteSection');
        if (!container) return;
        
        if (quoteCart.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border-radius: 12px;">
                    <div style="font-size: 3em; margin-bottom: 15px;">🛒</div>
                    <h3 style="margin-bottom: 10px; color: #64748b;">No active quote</h3>
                    <p style="color: #94a3b8; margin-bottom: 20px;">Start by adding equipment from the catalog</p>
                    <button class="btn btn-primary" onclick="navigateTo('equipment')">Browse Equipment</button>
                </div>
            `;
            return;
        }
        
        const subtotal = quoteCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        container.innerHTML = `
            <div style="background: white; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h3 style="margin-bottom: 20px;">📋 Current Quote</h3>
                
                <div style="margin-bottom: 20px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #475569;">Quote Name</label>
                    <input type="text" id="quoteNameInput" class="filter-select" style="width: 100%;" placeholder="e.g., Summer Music Festival 2025" value="${activeQuote.name || ''}">
                </div>
                
                <div style="margin-bottom: 20px;">
                    <h4 style="margin-bottom: 15px; color: #475569;">Equipment (${quoteCart.length} items)</h4>
                    ${quoteCart.map((item, index) => `
                        <div style="display: flex; justify-content: space-between; padding: 12px; background: #f8fafc; border-radius: 8px; margin-bottom: 8px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">${item.emoji} ${item.name}</div>
                                <div style="font-size: 0.85em; color: #64748b;">Qty: ${item.quantity} × $${item.price}/day</div>
                            </div>
                            <div style="font-weight: 600; color: #3b82f6;">$${(item.price * item.quantity).toLocaleString()}</div>
                            <button onclick="Quotes.removeFromCart(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; margin-left: 15px;">🗑️</button>
                        </div>
                    `).join('')}
                </div>
                
                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #64748b;">
                        <span>Subtotal</span>
                        <span>$${subtotal.toLocaleString()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #64748b;">
                        <span>Tax (8%)</span>
                        <span>$${(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 1.3em; font-weight: 700; color: #0f172a; padding-top: 10px; border-top: 2px solid #e2e8f0;">
                        <span>Total</span>
                        <span>$${(subtotal * 1.08).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-success" onclick="Quotes.saveCurrentQuote()" style="flex: 1;">💾 Save Quote</button>
                    <button class="btn btn-outline" onclick="Quotes.saveQuoteAsTemplate()" style="flex: 1;">📌 Save as Template</button>
                    <button class="btn btn-outline" onclick="Quotes.clearCart()">🗑️ Clear</button>
                </div>
            </div>
        `;
    }
    
    /**
     * Render past quotes section
     */
    function renderPastQuotesSection() {
        const container = document.getElementById('pastQuotesSection');
        if (!container) return;
        
        let filtered = savedQuotes.filter(quote => {
            if (!quotesPageFilters.searchTerm) return true;
            const search = quotesPageFilters.searchTerm.toLowerCase();
            return quote.name.toLowerCase().includes(search) ||
                   quote.items.some(item => item.name.toLowerCase().includes(search));
        });
        
        filtered.sort((a, b) => {
            if (quotesPageFilters.sortBy === 'date') {
                return new Date(b.createdAt) - new Date(a.createdAt);
            } else if (quotesPageFilters.sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
        
        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border-radius: 12px;">
                    <div style="font-size: 3em; margin-bottom: 15px; opacity: 0.3;">📋</div>
                    <h4 style="margin-bottom: 8px; color: #64748b;">No saved quotes</h4>
                    <p style="color: #94a3b8;">Your saved quotes will appear here</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filtered.map(quote => {
            const total = quote.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.08;
            const itemCount = quote.items.reduce((sum, item) => sum + item.quantity, 0);
            
            return `
                <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 15px; cursor: pointer; transition: all 0.3s;" 
                     onmouseover="this.style.boxShadow='0 4px 12px rgba(0,0,0,0.1)'" 
                     onmouseout="this.style.boxShadow='none'">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                        <div>
                            <h4 style="margin-bottom: 5px;">${quote.name || 'Untitled Quote'}</h4>
                            <div style="font-size: 0.85em; color: #64748b;">
                                ${new Date(quote.createdAt).toLocaleDateString()} • ${itemCount} items
                            </div>
                        </div>
                        <div style="font-size: 1.2em; font-weight: 700; color: #3b82f6;">
                            $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px;">
                        ${quote.items.slice(0, 3).map(item => 
                            `<span class="badge badge-info">${item.emoji} ${item.name}</span>`
                        ).join('')}
                        ${quote.items.length > 3 ? `<span class="badge" style="background: #f1f5f9; color: #64748b;">+${quote.items.length - 3} more</span>` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-primary" onclick="Quotes.loadQuote('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em;">📋 Load</button>
                        <button class="btn btn-outline" onclick="Quotes.duplicateQuote('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em;">📑 Duplicate</button>
                        <button class="btn btn-outline" onclick="Quotes.convertQuoteToTemplate('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em;">📌 To Template</button>
                        <button class="btn btn-outline" onclick="Quotes.deleteQuote('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em; color: #ef4444; border-color: #fecaca;">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    /**
     * Render quote templates section
     */
    function renderQuoteTemplatesSection() {
        const container = document.getElementById('quoteTemplatesSection');
        if (!container) return;
        
        if (quoteTemplates.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border-radius: 12px;">
                    <div style="font-size: 3em; margin-bottom: 15px; opacity: 0.3;">📌</div>
                    <h4 style="margin-bottom: 8px; color: #64748b;">No templates</h4>
                    <p style="color: #94a3b8;">Save frequently used quotes as templates</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = quoteTemplates.map(template => {
            const itemCount = template.items.reduce((sum, item) => sum + item.quantity, 0);
            
            return `
                <div style="background: linear-gradient(135deg, rgba(59,130,246,0.05), rgba(139,92,246,0.05)); padding: 20px; border-radius: 12px; border: 2px solid #dbeafe; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                        <div>
                            <h4 style="margin-bottom: 5px;">📌 ${template.name}</h4>
                            <div style="font-size: 0.85em; color: #64748b;">${itemCount} items</div>
                        </div>
                    </div>
                    
                    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px;">
                        ${template.items.slice(0, 4).map(item => 
                            `<span class="badge badge-info">${item.emoji} ${item.name} (${item.quantity})</span>`
                        ).join('')}
                    </div>
                    
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-primary" onclick="Quotes.useTemplate('${template.id}')" style="padding: 8px 16px; font-size: 0.9em;">✨ Use Template</button>
                        <button class="btn btn-outline" onclick="Quotes.editTemplate('${template.id}')" style="padding: 8px 16px; font-size: 0.9em;">✏️ Edit</button>
                        <button class="btn btn-outline" onclick="Quotes.deleteTemplate('${template.id}')" style="padding: 8px 16px; font-size: 0.9em; color: #ef4444; border-color: #fecaca;">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    /**
     * Save current quote
     */
    function saveCurrentQuote() {
        const nameInput = document.getElementById('quoteNameInput');
        const name = nameInput?.value.trim();
        
        if (!name) {
            alert('Please enter a quote name');
            return;
        }
        
        if (quoteCart.length === 0) {
            alert('Cart is empty');
            return;
        }
        
        const quote = {
            id: 'quote_' + Date.now(),
            name: name,
            items: window.Utils.deepClone(quoteCart),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        savedQuotes.unshift(quote);
        persistQuotes();
        
        window.Utils.showNotification(`✅ Quote "${name}" saved!`, 'success');
        renderPastQuotesSection();
    }
    
    /**
     * Save quote as template
     */
    function saveQuoteAsTemplate() {
        const nameInput = document.getElementById('quoteNameInput');
        let name = nameInput?.value.trim();
        
        if (!name) {
            name = prompt('Enter template name:');
            if (!name) return;
        }
        
        if (quoteCart.length === 0) {
            alert('Cart is empty');
            return;
        }
        
        const template = {
            id: 'template_' + Date.now(),
            name: name + ' (Template)',
            items: window.Utils.deepClone(quoteCart),
            createdAt: new Date().toISOString()
        };
        
        quoteTemplates.unshift(template);
        persistQuotes();
        
        window.Utils.showNotification(`✅ Template "${name}" created!`, 'success');
        renderQuoteTemplatesSection();
    }
    
    /**
     * Load a saved quote
     * @param {string} quoteId - Quote ID to load
     */
    function loadQuote(quoteId) {
        const quote = savedQuotes.find(q => q.id === quoteId);
        if (!quote) return;
        
        quoteCart = window.Utils.deepClone(quote.items);
        activeQuote.name = quote.name;
        
        updateQuoteCartBadge();
        renderActiveQuoteSection();
        window.Utils.showNotification(`📋 Quote "${quote.name}" loaded`, 'success');
        
        document.getElementById('activeQuoteSection')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Duplicate a quote
     * @param {string} quoteId - Quote ID to duplicate
     */
    function duplicateQuote(quoteId) {
        const quote = savedQuotes.find(q => q.id === quoteId);
        if (!quote) return;
        
        const newQuote = {
            ...quote,
            id: 'quote_' + Date.now(),
            name: quote.name + ' (Copy)',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        savedQuotes.unshift(newQuote);
        persistQuotes();
        
        window.Utils.showNotification(`📋 Quote duplicated!`, 'success');
        renderPastQuotesSection();
    }
    
    /**
     * Convert quote to template
     * @param {string} quoteId - Quote ID to convert
     */
    function convertQuoteToTemplate(quoteId) {
        const quote = savedQuotes.find(q => q.id === quoteId);
        if (!quote) return;
        
        const template = {
            id: 'template_' + Date.now(),
            name: quote.name + ' (Template)',
            items: window.Utils.deepClone(quote.items),
            createdAt: new Date().toISOString()
        };
        
        quoteTemplates.unshift(template);
        persistQuotes();
        
        window.Utils.showNotification(`📌 Template created from quote!`, 'success');
        renderQuoteTemplatesSection();
    }
    
    /**
     * Delete a quote
     * @param {string} quoteId - Quote ID to delete
     */
    function deleteQuote(quoteId) {
        const quote = savedQuotes.find(q => q.id === quoteId);
        if (!quote) return;
        
        if (confirm(`Delete quote "${quote.name}"?`)) {
            savedQuotes = savedQuotes.filter(q => q.id !== quoteId);
            persistQuotes();
            renderPastQuotesSection();
            window.Utils.showNotification('Quote deleted', 'info');
        }
    }
    
    /**
     * Use a template
     * @param {string} templateId - Template ID to use
     */
    function useTemplate(templateId) {
        const template = quoteTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        quoteCart = window.Utils.deepClone(template.items);
        activeQuote.name = template.name.replace(' (Template)', '');
        
        updateQuoteCartBadge();
        renderActiveQuoteSection();
        window.Utils.showNotification(`✨ Template "${template.name}" loaded!`, 'success');
        
        document.getElementById('activeQuoteSection')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Edit a template
     * @param {string} templateId - Template ID to edit
     */
    function editTemplate(templateId) {
        const template = quoteTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        const newName = prompt('Edit template name:', template.name);
        if (newName && newName !== template.name) {
            template.name = newName;
            persistQuotes();
            renderQuoteTemplatesSection();
            window.Utils.showNotification('Template updated', 'success');
        }
    }
    
    /**
     * Delete a template
     * @param {string} templateId - Template ID to delete
     */
    function deleteTemplate(templateId) {
        const template = quoteTemplates.find(t => t.id === templateId);
        if (!template) return;
        
        if (confirm(`Delete template "${template.name}"?`)) {
            quoteTemplates = quoteTemplates.filter(t => t.id !== templateId);
            persistQuotes();
            renderQuoteTemplatesSection();
            window.Utils.showNotification('Template deleted', 'info');
        }
    }
    
    /**
     * Search quotes
     * @param {string} searchTerm - Search term
     */
    function searchQuotes(searchTerm) {
        quotesPageFilters.searchTerm = searchTerm;
        renderPastQuotesSection();
    }
    
    /**
     * Sort quotes
     * @param {string} sortBy - Sort by 'date' or 'name'
     */
    function sortQuotes(sortBy) {
        quotesPageFilters.sortBy = sortBy;
        renderPastQuotesSection();
    }
    
    // Export to window
    window.Quotes = {
        initializeQuotesSystem,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleQuoteCart,
        renderQuoteCartPanel,
        viewFullQuote,
        switchQuoteTab,
        renderQuotesPage,
        renderActiveQuoteSection,
        renderPastQuotesSection,
        renderQuoteTemplatesSection,
        saveCurrentQuote,
        saveQuoteAsTemplate,
        loadQuote,
        duplicateQuote,
        convertQuoteToTemplate,
        deleteQuote,
        useTemplate,
        editTemplate,
        deleteTemplate,
        searchQuotes,
        sortQuotes,
        getCart: () => quoteCart,
        getSavedQuotes: () => savedQuotes,
        getTemplates: () => quoteTemplates
    };
    
    // Make functions globally accessible
    window.addToQuote = addToCart;
    window.toggleQuoteCart = toggleQuoteCart;
    window.searchQuotes = searchQuotes;
    window.sortQuotes = sortQuotes;
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeQuotesSystem);
    } else {
        initializeQuotesSystem();
    }
    
    console.log('✅ Quotes module loaded');
    
})(window);