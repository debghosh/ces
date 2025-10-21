// ==========================
// CES POWER PRO - CUSTOMER PORTAL
// Clean, Consolidated JavaScript
// ==========================

// ==========================
// DATA STRUCTURES
// ==========================

// Equipment inventory
const equipmentInventory = [
    {
        id: 'gen-500-hybrid-1',
        name: '500kW Hybrid Generator',
        category: 'generator',
        type: 'hybrid',
        power: 500,
        price: 1200,
        specs: 'Ultra-quiet • 70% fuel savings • GPS tracked',
        available: 12,
        location: 'Austin',
        emoji: '⚡',
        features: ['Ultra-quiet operation', 'Hybrid battery system', 'GPS tracking', 'Remote monitoring', 'Tier 4 Final']
    },
    {
        id: 'bat-storage-1',
        name: 'Battery Storage System',
        category: 'battery',
        type: 'battery',
        power: 100,
        price: 800,
        specs: 'Silent • Zero emissions • 8hr runtime',
        available: 8,
        location: 'Dallas',
        emoji: '🔋',
        features: ['Silent operation', 'Zero emissions', '8-hour runtime', 'Fast recharge', 'Scalable']
    },
    {
        id: 'gen-300-hybrid-1',
        name: '300kW Hybrid Generator',
        category: 'generator',
        type: 'hybrid',
        power: 300,
        price: 750,
        specs: 'Quiet operation • 65% fuel savings',
        available: 15,
        location: 'Houston',
        emoji: '⚡',
        features: ['Quiet operation', 'Hybrid technology', '65% fuel reduction', 'Remote monitoring']
    },
    {
        id: 'gen-150-hybrid-1',
        name: '150kW Hybrid Generator',
        category: 'generator',
        type: 'hybrid',
        power: 150,
        price: 450,
        specs: 'Perfect for weddings • Silent mode',
        available: 3,
        location: 'Austin',
        emoji: '⚡',
        features: ['Silent mode', 'Compact design', 'Perfect for events', 'Low emissions']
    },
    {
        id: 'gen-750-diesel-1',
        name: '750kW Diesel Generator',
        category: 'generator',
        type: 'diesel',
        power: 750,
        price: 950,
        specs: 'High capacity • Industrial grade • Reliable',
        available: 6,
        location: 'Houston',
        emoji: '⚡',
        features: ['High capacity', 'Industrial grade', 'Proven reliability', 'Tier 4 Final']
    },
    {
        id: 'bat-storage-2',
        name: '200kW Battery System',
        category: 'battery',
        type: 'battery',
        power: 200,
        price: 1400,
        specs: 'Silent • Zero emissions • 12hr runtime',
        available: 4,
        location: 'Austin',
        emoji: '🔋',
        features: ['Extended runtime', 'Silent operation', 'Zero emissions', 'Rapid deployment']
    },
    {
        id: 'gen-250-diesel-1',
        name: '250kW Diesel Generator',
        category: 'generator',
        type: 'diesel',
        power: 250,
        price: 600,
        specs: 'Standard power • Fuel efficient • Reliable',
        available: 10,
        location: 'Dallas',
        emoji: '⚡',
        features: ['Fuel efficient', 'Reliable performance', 'Easy transport', 'Weather resistant']
    },
    {
        id: 'gen-1000-hybrid-1',
        name: '1000kW Hybrid Generator',
        category: 'generator',
        type: 'hybrid',
        power: 1000,
        price: 2100,
        specs: 'Maximum capacity • Ultra-efficient • Silent',
        available: 2,
        location: 'Houston',
        emoji: '⚡',
        features: ['Maximum power output', 'Ultra-efficient', 'Minimal noise', 'Advanced monitoring']
    },
    {
        id: 'solar-panel-1',
        name: 'Solar Panel Array',
        category: 'accessory',
        type: 'solar',
        power: 50,
        price: 400,
        specs: 'Renewable • Supplement power • Eco-friendly',
        available: 20,
        location: 'Austin',
        emoji: '☀️',
        features: ['100% renewable', 'Supplement power', 'Reduce fuel costs', 'Easy setup']
    },
    {
        id: 'dist-panel-1',
        name: 'Power Distribution Panel',
        category: 'accessory',
        type: 'distribution',
        power: 0,
        price: 150,
        specs: 'Safe distribution • Multiple circuits • Weather resistant',
        available: 25,
        location: 'Dallas',
        emoji: '🔌',
        features: ['Multiple circuits', 'Circuit breakers', 'Weather resistant', 'Easy connection']
    },
    {
        id: 'cable-pack-1',
        name: 'Heavy Duty Cable Pack',
        category: 'accessory',
        type: 'cables',
        power: 0,
        price: 75,
        specs: '100ft cables • Weather resistant • Various gauges',
        available: 50,
        location: 'Houston',
        emoji: '🔗',
        features: ['100ft length', 'Various gauges', 'Weather resistant', 'Industrial grade']
    },
    {
        id: 'fuel-tank-1',
        name: 'Extended Fuel Tank',
        category: 'accessory',
        type: 'fuel',
        power: 0,
        price: 200,
        specs: '500 gallon capacity • Spill containment • Auto-fill ready',
        available: 15,
        location: 'Austin',
        emoji: '⛽',
        features: ['500 gallon capacity', 'Spill containment', 'Auto-fill compatible', 'DOT certified']
    }
];

// Chart data
const spendingData = {
    12: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        spending: [8500, 12300, 9800, 11200, 14500, 13800, 15200, 12900, 14100, 13500, 11800, 9200],
        savings: [1200, 1800, 1500, 1700, 2100, 2000, 2300, 1900, 2100, 2000, 1800, 1400],
        events: [3, 5, 4, 4, 6, 5, 6, 5, 5, 5, 4, 3]
    },
    6: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        spending: [15200, 12900, 14100, 13500, 11800, 9200],
        savings: [2300, 1900, 2100, 2000, 1800, 1400],
        events: [6, 5, 5, 5, 4, 3]
    },
    3: {
        labels: ['Aug', 'Sep', 'Oct'],
        spending: [13500, 11800, 9200],
        savings: [2000, 1800, 1400],
        events: [5, 4, 3]
    }
};

const carbonData = {
    12: {
        labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        avoided: [2.8, 4.2, 3.5, 3.9, 5.1, 4.8, 5.4, 4.5, 4.9, 4.7, 4.1, 3.2],
        baseline: [4.5, 6.8, 5.6, 6.3, 8.2, 7.7, 8.7, 7.3, 7.9, 7.6, 6.6, 5.2]
    },
    6: {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        avoided: [5.4, 4.5, 4.9, 4.7, 4.1, 3.2],
        baseline: [8.7, 7.3, 7.9, 7.6, 6.6, 5.2]
    },
    3: {
        labels: ['Aug', 'Sep', 'Oct'],
        avoided: [4.7, 4.1, 3.2],
        baseline: [7.6, 6.6, 5.2]
    }
};

// State management
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

let equipmentFilters = {
    category: 'all',
    location: 'all',
    powerRange: 'all',
    availability: 'all',
    searchTerm: ''
};

let quotesPageFilters = {
    searchTerm: '',
    sortBy: 'date'
};

// ==========================
// INITIALIZATION
// ==========================

window.addEventListener('load', () => {
    setTimeout(() => {
        // Initialize charts
        drawSpendingChart('12');
        drawCarbonChart('12');
        
        // Initialize equipment display
        updateEquipmentDisplay();
        
        // Initialize quotes system from localStorage
        initializeQuotesSystem();
        
        // Render quotes page if active
        if (document.getElementById('quotes')?.classList.contains('active')) {
            renderQuotesPage();
        }
    }, 100);
});

// Handle window resize - redraw charts
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const analyticsPage = document.getElementById('analytics');
        const sustainabilityPage = document.getElementById('sustainability');
        
        if (analyticsPage?.classList.contains('active')) {
            drawSpendingChart('12');
        }
        if (sustainabilityPage?.classList.contains('active')) {
            drawCarbonChart('12');
        }
    }, 250);
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==========================
// NAVIGATION
// ==========================

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId)?.classList.add('active');
    
    // Add active to clicked nav item
    if (event?.target) {
        event.target.closest('.nav-item')?.classList.add('active');
    }
    
    // Page-specific initialization
    setTimeout(() => {
        switch(pageId) {
            case 'analytics':
                drawSpendingChart('12');
                break;
            case 'sustainability':
                drawCarbonChart('12');
                break;
            case 'equipment':
                updateEquipmentDisplay();
                break;
            case 'quotes':
                renderQuotesPage();
                break;
        }
    }, 50);
}

// ==========================
// EQUIPMENT CATALOG
// ==========================

function filterEquipment() {
    return equipmentInventory.filter(item => {
        // Category filter
        if (equipmentFilters.category !== 'all') {
            if (equipmentFilters.category === 'generator' && item.category !== 'generator') return false;
            if (equipmentFilters.category === 'battery' && item.category !== 'battery') return false;
            if (equipmentFilters.category === 'hybrid' && item.type !== 'hybrid') return false;
            if (equipmentFilters.category === 'accessory' && item.category !== 'accessory') return false;
        }
        
        // Location filter
        if (equipmentFilters.location !== 'all' && item.location !== equipmentFilters.location) {
            return false;
        }
        
        // Power range filter
        if (equipmentFilters.powerRange !== 'all') {
            if (equipmentFilters.powerRange === 'under100' && item.power >= 100) return false;
            if (equipmentFilters.powerRange === '100-300' && (item.power < 100 || item.power > 300)) return false;
            if (equipmentFilters.powerRange === '300-500' && (item.power < 300 || item.power > 500)) return false;
            if (equipmentFilters.powerRange === '500plus' && item.power < 500) return false;
        }
        
        // Availability filter
        if (equipmentFilters.availability === 'now' && item.available === 0) return false;
        if (equipmentFilters.availability === '7days' && item.available < 3) return false;
        if (equipmentFilters.availability === '30days' && item.available < 1) return false;
        
        // Search filter
        if (equipmentFilters.searchTerm) {
            const search = equipmentFilters.searchTerm.toLowerCase();
            return item.name.toLowerCase().includes(search) || 
                   item.specs.toLowerCase().includes(search) ||
                   item.location.toLowerCase().includes(search);
        }
        
        return true;
    });
}

function renderEquipmentGrid(equipment) {
    const grid = document.querySelector('.equipment-grid');
    if (!grid) return;
    
    if (equipment.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 4em; margin-bottom: 20px; opacity: 0.3;">🔍</div>
                <h3 style="color: #64748b; margin-bottom: 10px;">No equipment found</h3>
                <p style="color: #94a3b8;">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = equipment.map(item => {
        const badgeColor = item.available > 5 ? '#10b981' : (item.available > 0 ? '#f59e0b' : '#ef4444');
        const badgeText = item.available > 5 ? 'AVAILABLE' : (item.available > 0 ? 'LIMITED' : 'UNAVAILABLE');
        const availabilityBadge = item.available > 0 ? 
            `<span class="badge ${item.available > 5 ? 'badge-success' : 'badge-warning'}">${item.available} Available</span>` :
            `<span class="badge" style="background: #fee2e2; color: #991b1b;">Out of Stock</span>`;
        
        return `
            <div class="equipment-card">
                <div class="equipment-image">
                    ${item.emoji}
                    <div class="equipment-badge" style="background: ${badgeColor};">${badgeText}</div>
                </div>
                <div class="equipment-content">
                    <div class="equipment-name">${item.name}</div>
                    <div class="equipment-specs">${item.specs}</div>
                    <div class="equipment-price">$${item.price.toLocaleString()}<span style="font-size: 0.5em; color: #64748b;">/day</span></div>
                    <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                        ${availabilityBadge}
                        <span class="badge badge-info">${item.location}</span>
                    </div>
                    <button class="btn btn-primary" style="width: 100%;" onclick="addToQuote('${item.id}')" ${item.available === 0 ? 'disabled' : ''}>
                        ${item.available > 0 ? 'Add to Quote' : 'Unavailable'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function updateEquipmentDisplay() {
    renderEquipmentGrid(filterEquipment());
}

function setEquipmentCategory(category) {
    equipmentFilters.category = category;
    document.querySelectorAll('#equipment .tab').forEach(tab => tab.classList.remove('active'));
    if (event?.target) event.target.classList.add('active');
    updateEquipmentDisplay();
}

function setEquipmentLocation(location) {
    equipmentFilters.location = location;
    updateEquipmentDisplay();
}

function setEquipmentPowerRange(range) {
    equipmentFilters.powerRange = range;
    updateEquipmentDisplay();
}

function setEquipmentAvailability(availability) {
    equipmentFilters.availability = availability;
    updateEquipmentDisplay();
}

function searchEquipment(searchTerm) {
    equipmentFilters.searchTerm = searchTerm;
    updateEquipmentDisplay();
}

// ==========================
// QUOTE CART MANAGEMENT
// ==========================

function addToQuote(equipmentId) {
    const equipment = equipmentInventory.find(item => item.id === equipmentId);
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
    
    // Update badge
    updateQuoteCartBadge();
    
    // Show success notification
    showNotification(`✅ ${equipment.name} added to quote!`, 'success');
    
    // Show clickable "View Quote" notification
    setTimeout(() => {
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
            showPage('quotes');
            setTimeout(() => switchQuoteTab('active'), 100);
            notification.remove();
        };
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 10000);
    }, 500);
}

function updateQuoteCartBadge() {
    const totalItems = quoteCart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('quoteBadge');
    
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function removeFromCart(index) {
    const item = quoteCart[index];
    quoteCart.splice(index, 1);
    updateQuoteCartBadge();
    renderQuoteCartPanel();
    showNotification(`${item.name} removed from cart`, 'info');
}

function updateCartQuantity(index, change) {
    quoteCart[index].quantity += change;
    
    if (quoteCart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        renderQuoteCartPanel();
        updateQuoteCartBadge();
    }
}

function clearCart() {
    if (confirm('Clear all items from cart?')) {
        quoteCart = [];
        updateQuoteCartBadge();
        renderQuoteCartPanel();
        showNotification('Cart cleared', 'info');
    }
}

// ==========================
// QUOTE CART PANEL (DROPDOWN)
// ==========================

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

function createQuoteCartPanel() {
    const panel = document.createElement('div');
    panel.id = 'quoteCartPanel';
    panel.className = 'quote-cart-panel';
    panel.innerHTML = `
        <div class="quote-cart-header">
            <h3>Quote Cart</h3>
            <button class="quote-cart-close" onclick="toggleQuoteCart()">✕</button>
        </div>
        <div class="quote-cart-content" id="quoteCartContent"></div>
    `;
    
    document.body.appendChild(panel);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .quote-cart-panel {
            position: fixed;
            top: 70px;
            right: -400px;
            width: 400px;
            height: calc(100vh - 70px);
            background: white;
            box-shadow: -4px 0 20px rgba(0,0,0,0.15);
            z-index: 999;
            transition: right 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        .quote-cart-panel.open { right: 0; }
        .quote-cart-header {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8fafc;
        }
        .quote-cart-header h3 { font-size: 1.2em; color: #0f172a; }
        .quote-cart-close {
            background: none;
            border: none;
            font-size: 1.5em;
            cursor: pointer;
            color: #64748b;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        .quote-cart-close:hover { background: #e2e8f0; }
        .quote-cart-content { flex: 1; overflow-y: auto; padding: 20px; }
        .cart-item {
            padding: 15px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 12px;
            background: #f8fafc;
        }
        .cart-item-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            margin-bottom: 10px;
        }
        .cart-item-name { font-weight: 600; color: #0f172a; font-size: 0.95em; }
        .cart-item-remove {
            background: none;
            border: none;
            color: #ef4444;
            cursor: pointer;
            font-size: 1.1em;
            padding: 0;
        }
        .cart-item-details {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }
        .cart-item-qty { display: flex; align-items: center; gap: 10px; }
        .qty-btn {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            width: 24px;
            height: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9em;
        }
        .qty-btn:hover { background: #f1f5f9; }
        .cart-item-price { font-weight: 600; color: #3b82f6; }
        .cart-empty {
            text-align: center;
            padding: 60px 20px;
            color: #94a3b8;
        }
        .cart-empty-icon {
            font-size: 4em;
            margin-bottom: 15px;
            opacity: 0.3;
        }
        .cart-summary {
            border-top: 2px solid #e2e8f0;
            padding: 15px 0;
            margin-top: 15px;
        }
        .cart-summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            color: #64748b;
        }
        .cart-summary-total {
            display: flex;
            justify-content: space-between;
            font-size: 1.2em;
            font-weight: 700;
            color: #0f172a;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #e2e8f0;
        }
        .cart-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
        }
    `;
    document.head.appendChild(style);
}

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
                    <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Remove">🗑️</button>
                </div>
                <div style="color: #64748b; font-size: 0.85em; margin-bottom: 8px;">${item.specs}</div>
                <div class="cart-item-details">
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateCartQuantity(${index}, -1)">−</button>
                        <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
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
            <button class="btn btn-primary" onclick="viewFullQuote()" style="width: 100%;">
                📋 View Full Quote
            </button>
            <button class="btn btn-outline" onclick="clearCart()" style="width: 100%;">
                🗑️ Clear Cart
            </button>
        </div>
    `;
}

function viewFullQuote() {
    toggleQuoteCart();
    showPage('quotes');
    setTimeout(() => switchQuoteTab('active'), 100);
}

// ==========================
// QUOTES SYSTEM
// ==========================

function initializeQuotesSystem() {
    const savedQuotesData = localStorage.getItem('cespower_savedQuotes');
    const templatesData = localStorage.getItem('cespower_quoteTemplates');
    
    if (savedQuotesData) savedQuotes = JSON.parse(savedQuotesData);
    if (templatesData) quoteTemplates = JSON.parse(templatesData);
    
    if (quoteCart.length > 0) activeQuote.items = quoteCart;
}

function persistQuotes() {
    localStorage.setItem('cespower_savedQuotes', JSON.stringify(savedQuotes));
    localStorage.setItem('cespower_quoteTemplates', JSON.stringify(quoteTemplates));
}

function switchQuoteTab(tabName) {
    document.querySelectorAll('.quote-tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('#quotes .tab').forEach(tab => tab.classList.remove('active'));
    
    let contentId = '';
    switch(tabName) {
        case 'new':
            contentId = 'newQuoteTab';
            break;
        case 'active':
            contentId = 'activeQuoteTab';
            renderActiveQuoteSection();
            break;
        case 'past':
            contentId = 'pastQuotesTab';
            renderPastQuotesSection();
            break;
        case 'templates':
            contentId = 'templatesTab';
            renderQuoteTemplatesSection();
            break;
    }
    
    document.getElementById(contentId)?.classList.add('active');
    if (event?.target) event.target.classList.add('active');
}

function renderQuotesPage() {
    renderActiveQuoteSection();
    renderPastQuotesSection();
    renderQuoteTemplatesSection();
}

function renderActiveQuoteSection() {
    const container = document.getElementById('activeQuoteSection');
    if (!container) return;
    
    if (quoteCart.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border-radius: 12px;">
                <div style="font-size: 3em; margin-bottom: 15px;">🛒</div>
                <h3 style="margin-bottom: 10px; color: #64748b;">No active quote</h3>
                <p style="color: #94a3b8; margin-bottom: 20px;">Start by adding equipment from the catalog</p>
                <button class="btn btn-primary" onclick="showPage('equipment')">Browse Equipment</button>
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
                        <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; margin-left: 15px;">🗑️</button>
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
                <button class="btn btn-success" onclick="saveCurrentQuote()" style="flex: 1;">💾 Save Quote</button>
                <button class="btn btn-outline" onclick="saveQuoteAsTemplate()" style="flex: 1;">📑 Save as Template</button>
                <button class="btn btn-outline" onclick="clearCart()">🗑️ Clear</button>
            </div>
        </div>
    `;
}

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
                    <button class="btn btn-primary" onclick="loadQuote('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em;">📋 Load</button>
                    <button class="btn btn-outline" onclick="duplicateQuote('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em;">📑 Duplicate</button>
                    <button class="btn btn-outline" onclick="convertQuoteToTemplate('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em;">📌 To Template</button>
                    <button class="btn btn-outline" onclick="deleteQuote('${quote.id}')" style="padding: 8px 16px; font-size: 0.9em; color: #ef4444; border-color: #fecaca;">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

function renderQuoteTemplatesSection() {
    const container = document.getElementById('quoteTemplatesSection');
    if (!container) return;
    
    if (quoteTemplates.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; background: #f8fafc; border-radius: 12px;">
                <div style="font-size: 3em; margin-bottom: 15px; opacity: 0.3;">📑</div>
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
                        <h4 style="margin-bottom: 5px;">📑 ${template.name}</h4>
                        <div style="font-size: 0.85em; color: #64748b;">${itemCount} items</div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 15px;">
                    ${template.items.slice(0, 4).map(item => 
                        `<span class="badge badge-info">${item.emoji} ${item.name} (${item.quantity})</span>`
                    ).join('')}
                </div>
                
                <div style="display: flex; gap: 8px;">
                    <button class="btn btn-primary" onclick="useTemplate('${template.id}')" style="padding: 8px 16px; font-size: 0.9em;">✨ Use Template</button>
                    <button class="btn btn-outline" onclick="editTemplate('${template.id}')" style="padding: 8px 16px; font-size: 0.9em;">✏️ Edit</button>
                    <button class="btn btn-outline" onclick="deleteTemplate('${template.id}')" style="padding: 8px 16px; font-size: 0.9em; color: #ef4444; border-color: #fecaca;">🗑️</button>
                </div>
            </div>
        `;
    }).join('');
}

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
        items: JSON.parse(JSON.stringify(quoteCart)),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    savedQuotes.unshift(quote);
    persistQuotes();
    
    showNotification(`✅ Quote "${name}" saved!`, 'success');
    renderPastQuotesSection();
}

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
        items: JSON.parse(JSON.stringify(quoteCart)),
        createdAt: new Date().toISOString()
    };
    
    quoteTemplates.unshift(template);
    persistQuotes();
    
    showNotification(`✅ Template "${name}" created!`, 'success');
    renderQuoteTemplatesSection();
}

function loadQuote(quoteId) {
    const quote = savedQuotes.find(q => q.id === quoteId);
    if (!quote) return;
    
    quoteCart = JSON.parse(JSON.stringify(quote.items));
    activeQuote.name = quote.name;
    
    updateQuoteCartBadge();
    renderActiveQuoteSection();
    showNotification(`📋 Quote "${quote.name}" loaded`, 'success');
    
    document.getElementById('activeQuoteSection')?.scrollIntoView({ behavior: 'smooth' });
}

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
    
    showNotification(`📋 Quote duplicated!`, 'success');
    renderPastQuotesSection();
}

function convertQuoteToTemplate(quoteId) {
    const quote = savedQuotes.find(q => q.id === quoteId);
    if (!quote) return;
    
    const template = {
        id: 'template_' + Date.now(),
        name: quote.name + ' (Template)',
        items: JSON.parse(JSON.stringify(quote.items)),
        createdAt: new Date().toISOString()
    };
    
    quoteTemplates.unshift(template);
    persistQuotes();
    
    showNotification(`📑 Template created from quote!`, 'success');
    renderQuoteTemplatesSection();
}

function deleteQuote(quoteId) {
    const quote = savedQuotes.find(q => q.id === quoteId);
    if (!quote) return;
    
    if (confirm(`Delete quote "${quote.name}"?`)) {
        savedQuotes = savedQuotes.filter(q => q.id !== quoteId);
        persistQuotes();
        renderPastQuotesSection();
        showNotification('Quote deleted', 'info');
    }
}

function useTemplate(templateId) {
    const template = quoteTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    quoteCart = JSON.parse(JSON.stringify(template.items));
    activeQuote.name = template.name.replace(' (Template)', '');
    
    updateQuoteCartBadge();
    renderActiveQuoteSection();
    showNotification(`✨ Template "${template.name}" loaded!`, 'success');
    
    document.getElementById('activeQuoteSection')?.scrollIntoView({ behavior: 'smooth' });
}

function editTemplate(templateId) {
    const template = quoteTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    const newName = prompt('Edit template name:', template.name);
    if (newName && newName !== template.name) {
        template.name = newName;
        persistQuotes();
        renderQuoteTemplatesSection();
        showNotification('Template updated', 'success');
    }
}

function deleteTemplate(templateId) {
    const template = quoteTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    if (confirm(`Delete template "${template.name}"?`)) {
        quoteTemplates = quoteTemplates.filter(t => t.id !== templateId);
        persistQuotes();
        renderQuoteTemplatesSection();
        showNotification('Template deleted', 'info');
    }
}

function searchQuotes(searchTerm) {
    quotesPageFilters.searchTerm = searchTerm;
    renderPastQuotesSection();
}

function sortQuotes(sortBy) {
    quotesPageFilters.sortBy = sortBy;
    renderPastQuotesSection();
}

// ==========================
// AI QUOTE GENERATION
// ==========================

function generateAIQuote() {
    const quoteName = document.getElementById('newQuoteName')?.value.trim();
    const eventType = document.getElementById('newQuoteEventType')?.value;
    const eventDate = document.getElementById('newQuoteDate')?.value;
    const duration = document.getElementById('newQuoteDuration')?.value;
    const location = document.getElementById('newQuoteLocation')?.value;
    const attendance = document.getElementById('newQuoteAttendance')?.value;
    const requirements = document.getElementById('newQuoteRequirements')?.value;
    
    const locationTypeRadio = document.querySelector('input[name="location-type"]:checked');
    const locationType = locationTypeRadio?.value || '';
    
    if (!quoteName) {
        alert('Please enter a quote name');
        return;
    }
    
    if (eventType === 'Select event type...') {
        alert('Please select an event type');
        return;
    }
    
    const recommendedEquipment = getAIRecommendedEquipment(eventType, attendance, locationType, requirements);
    
    quoteCart = [];
    recommendedEquipment.forEach(equipId => {
        const equipment = equipmentInventory.find(e => e.id === equipId.id);
        if (equipment) {
            quoteCart.push({
                ...equipment,
                quantity: equipId.quantity,
                days: 1
            });
        }
    });
    
    activeQuote.name = quoteName;
    updateQuoteCartBadge();
    displayAIQuoteResult(quoteName, eventType, attendance);
    showNotification('✨ AI-powered quote generated!', 'success');
}

function getAIRecommendedEquipment(eventType, attendance, locationType, requirements) {
    const recommended = [];
    const attendanceNum = parseInt(attendance) || 0;
    const requiresSilent = requirements?.toLowerCase().includes('silent') || 
                          requirements?.toLowerCase().includes('quiet') ||
                          eventType === 'Wedding';
    const prioritizeHybrid = document.getElementById('newQuoteHybrid')?.checked;
    
    if (attendanceNum < 500) {
        if (requiresSilent || prioritizeHybrid) {
            recommended.push({ id: 'gen-150-hybrid-1', quantity: 1 });
        } else {
            recommended.push({ id: 'gen-250-diesel-1', quantity: 1 });
        }
        if (requiresSilent) {
            recommended.push({ id: 'bat-storage-1', quantity: 1 });
        }
    } else if (attendanceNum < 2000) {
        if (prioritizeHybrid) {
            recommended.push({ id: 'gen-300-hybrid-1', quantity: 1 });
            recommended.push({ id: 'gen-150-hybrid-1', quantity: 1 });
        } else {
            recommended.push({ id: 'gen-500-hybrid-1', quantity: 1 });
        }
        recommended.push({ id: 'bat-storage-1', quantity: 1 });
    } else if (attendanceNum < 5000) {
        recommended.push({ id: 'gen-500-hybrid-1', quantity: 1 });
        recommended.push({ id: 'gen-300-hybrid-1', quantity: 1 });
        recommended.push({ id: 'bat-storage-2', quantity: 1 });
    } else {
        recommended.push({ id: 'gen-1000-hybrid-1', quantity: 1 });
        recommended.push({ id: 'gen-500-hybrid-1', quantity: 1 });
        recommended.push({ id: 'bat-storage-2', quantity: 2 });
    }
    
    recommended.push({ id: 'dist-panel-1', quantity: Math.ceil(recommended.length / 2) });
    recommended.push({ id: 'cable-pack-1', quantity: recommended.length });
    
    if (prioritizeHybrid && locationType === 'outdoor') {
        recommended.push({ id: 'solar-panel-1', quantity: 2 });
    }
    
    return recommended;
}

function displayAIQuoteResult(quoteName, eventType, attendance) {
    const resultDiv = document.getElementById('aiQuoteResult');
    if (!resultDiv) return;
    
    const subtotal = quoteCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal * 1.08;
    const itemCount = quoteCart.reduce((sum, item) => sum + item.quantity, 0);
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white; padding: 30px; border-radius: 16px; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 1.2em; margin-bottom: 10px; opacity: 0.9;">✨ AI-Generated Quote</div>
            <div style="font-size: 3em; font-weight: 800; margin-bottom: 10px;">$${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
            <div style="opacity: 0.9;">${quoteName} • ${itemCount} items recommended</div>
        </div>
        
        <div class="card">
            <h3 style="margin-bottom: 20px;">📦 AI Recommended Solution</h3>
            
            <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; align-items: start; gap: 10px;">
                    <span style="font-size: 1.5em;">🤖</span>
                    <div>
                        <div style="font-weight: 600; color: #1e40af; margin-bottom: 5px;">Why These Recommendations?</div>
                        <div style="font-size: 0.9em; color: #1e3a8a;">
                            Based on your ${eventType.toLowerCase()} with ${attendance} attendees, our AI selected equipment 
                            optimized for capacity, reliability, and sustainability. This solution provides ${Math.round(quoteCart.reduce((sum, item) => item.power * item.quantity + sum, 0))}kW total capacity 
                            with built-in redundancy.
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                <h4 style="margin-bottom: 15px; color: #3b82f6;">Equipment Included:</h4>
                <div style="display: grid; gap: 12px;">
                    ${quoteCart.map(item => `
                        <div style="display: flex; justify-content: space-between; padding: 12px; background: white; border-radius: 8px;">
                            <span>${item.emoji} ${item.quantity}x ${item.name}</span>
                            <span style="font-weight: 600;">$${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="grid-2" style="margin-bottom: 20px;">
                <div style="background: #dcfce7; padding: 20px; border-radius: 12px; border: 2px solid #10b981;">
                    <div style="font-weight: 600; color: #065f46; margin-bottom: 8px;">🌱 Sustainability Impact</div>
                    <div style="color: #047857; font-size: 0.95em; line-height: 1.6;">
                        • Hybrid systems save 65% fuel<br>
                        • Estimated 3.8 tons CO₂ saved<br>
                        • Equivalent to 88 trees planted
                    </div>
                </div>
                <div style="background: #dbeafe; padding: 20px; border-radius: 12px; border: 2px solid #3b82f6;">
                    <div style="font-weight: 600; color: #1e40af; margin-bottom: 8px;">💰 Pricing Breakdown</div>
                    <div style="color: #1e3a8a; font-size: 0.95em; line-height: 1.6;">
                        • Subtotal: $${subtotal.toLocaleString()}<br>
                        • Tax (8%): $${(subtotal * 0.08).toFixed(2)}<br>
                        • <strong>Total: $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 15px;">
                <button class="btn btn-success" style="flex: 1; padding: 16px; font-size: 1.05em;" onclick="switchQuoteTab('active')">
                    ✅ Review & Save Quote
                </button>
                <button class="btn btn-outline" style="padding: 16px;" onclick="showPage('equipment')">
                    ✏️ Customize Equipment
                </button>
                <button class="btn btn-outline" style="padding: 16px;" onclick="document.getElementById('aiQuoteResult').style.display='none'; quoteCart=[]; updateQuoteCartBadge();">
                    🔄 Start Over
                </button>
            </div>
        </div>
    `;
    
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==========================
// CHARTS
// ==========================

function drawSpendingChart(period = '12') {
    const canvas = document.getElementById('spendingChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = spendingData[period];
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 700;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 350;
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxSpending = Math.max(...data.spending);
    const maxEvents = Math.max(...data.events);
    
    // Grid and Y-axis
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        const value = Math.round(maxSpending * (1 - i / 5) / 1000);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('$' + value + 'K', padding - 10, y + 4);
    }
    
    // Spending line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    data.spending.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        const y = padding + chartHeight - (value / maxSpending) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Spending points
    data.spending.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        const y = padding + chartHeight - (value / maxSpending) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // Savings line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    data.savings.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        const y = padding + chartHeight - (value / maxSpending) * chartHeight;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Savings points
    data.savings.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        const y = padding + chartHeight - (value / maxSpending) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
    });
    
    // Events bars
    const barWidth = (chartWidth / data.labels.length) * 0.3;
    data.events.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i - barWidth / 2;
        const barHeight = (value / maxEvents) * (chartHeight * 0.3);
        const y = height - padding - barHeight;
        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(x, y, barWidth, barHeight);
    });
    
    // X-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    data.labels.forEach((label, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        ctx.fillText(label, x, height - padding + 20);
    });
}

function drawCarbonChart(period = '12') {
    const canvas = document.getElementById('carbonChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = carbonData[period];
    
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 700;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 350;
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...data.baseline);
    
    // Grid and Y-axis
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        const value = (maxValue * (1 - i / 5)).toFixed(1);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(value + 't', padding - 10, y + 4);
    }
    
    // Bars
    const barWidth = (chartWidth / data.labels.length) * 0.35;
    const barSpacing = (chartWidth / data.labels.length);
    
    data.labels.forEach((label, i) => {
        const x = padding + barSpacing * i + (barSpacing - barWidth * 2) / 2;
        
        // Baseline bar
        const baselineHeight = (data.baseline[i] / maxValue) * chartHeight;
        const baselineY = height - padding - baselineHeight;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fillRect(x, baselineY, barWidth, baselineHeight);
        
        // Avoided bar
        const avoidedHeight = (data.avoided[i] / maxValue) * chartHeight;
        const avoidedY = height - padding - avoidedHeight;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x + barWidth, avoidedY, barWidth, avoidedHeight);
        
        // Labels
        ctx.fillStyle = '#047857';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(data.avoided[i].toFixed(1) + 't', x + barWidth * 1.5, avoidedY - 5);
    });
    
    // X-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    data.labels.forEach((label, i) => {
        const x = padding + barSpacing * i + barSpacing / 2;
        ctx.fillText(label, x, height - padding + 20);
    });
}

function updateSpendingChart(period) {
    drawSpendingChart(period);
}

function updateCarbonChart(period) {
    drawCarbonChart(period);
}

// ==========================
// CHAT FUNCTIONS
// ==========================

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow?.classList.toggle('open');
}

function sendChatMessage() {
    const input = document.getElementById('chatInputField');
    const message = input?.value.trim();
    
    if (!message) return;
    
    const messagesDiv = document.getElementById('chatMessages');
    if (messagesDiv) {
        messagesDiv.innerHTML += `
            <div class="chat-message user-message" style="flex-direction: row-reverse;">
                <div class="chat-avatar user-avatar">👤</div>
                <div class="chat-bubble">${escapeHtml(message)}</div>
            </div>
        `;
        
        input.value = '';
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        setTimeout(() => {
            messagesDiv.innerHTML += `
                <div class="chat-message">
                    <div class="chat-avatar ai-avatar">🤖</div>
                    <div class="chat-bubble">
                        I'd be happy to help! Let me look that up for you right away. One moment...
                    </div>
                </div>
            `;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 1000);
    }
}

// ==========================
// UTILITIES
// ==========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 30px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================
// DEBUG EXPORTS
// ==========================

if (typeof window !== 'undefined') {
    window.cesPortal = {
        // Chart functions
        drawSpendingChart,
        drawCarbonChart,
        
        // Navigation
        showPage,
        
        // Equipment
        filterEquipment,
        addToQuote,
        equipmentInventory,
        
        // Quotes
        quoteCart,
        savedQuotes,
        quoteTemplates,
        
        // Chat
        toggleChat
    };
}