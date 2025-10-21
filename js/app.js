// ==========================
// EQUIPMENT DATA
// ==========================

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

// Quote cart to store selected equipment
let quoteCart = [];

// ==========================
// EQUIPMENT FILTERING
// ==========================

// Current filter state
let equipmentFilters = {
    category: 'all',
    location: 'all',
    powerRange: 'all',
    availability: 'all',
    searchTerm: ''
};

function filterEquipment() {
    let filtered = equipmentInventory.filter(item => {
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
            const searchLower = equipmentFilters.searchTerm.toLowerCase();
            return item.name.toLowerCase().includes(searchLower) || 
                   item.specs.toLowerCase().includes(searchLower) ||
                   item.location.toLowerCase().includes(searchLower);
        }
        
        return true;
    });
    
    return filtered;
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
    const filtered = filterEquipment();
    renderEquipmentGrid(filtered);
}

function setEquipmentCategory(category) {
    equipmentFilters.category = category;
    
    // Update active tab
    document.querySelectorAll('#equipment .tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
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

function addToQuote(equipmentId) {
    const equipment = equipmentInventory.find(item => item.id === equipmentId);
    if (!equipment) return;
    
    // Check if already in cart
    const existingIndex = quoteCart.findIndex(item => item.id === equipmentId);
    
    if (existingIndex >= 0) {
        // Increment quantity
        quoteCart[existingIndex].quantity++;
    } else {
        // Add new item
        quoteCart.push({
            ...equipment,
            quantity: 1,
            days: 1
        });
    }
    
    // Show confirmation
    showNotification(`✅ ${equipment.name} added to quote!`, 'success');
    updateQuoteCartBadge();
}

function showNotification(message, type = 'info') {
    // Create notification element
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
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateQuoteCartBadge() {
    const totalItems = quoteCart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update notification badge (we'll use this as quote cart indicator for now)
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.style.display = 'flex';
        }
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================
// CHART DATA
// ==========================

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

// ==========================
// CHART DRAWING FUNCTIONS
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
    
    data.savings.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        const y = padding + chartHeight - (value / maxSpending) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
    });
    
    const barWidth = (chartWidth / data.labels.length) * 0.3;
    data.events.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i - barWidth / 2;
        const barHeight = (value / maxEvents) * (chartHeight * 0.3);
        const y = height - padding - barHeight;
        
        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(x, y, barWidth, barHeight);
    });
    
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
    
    const barWidth = (chartWidth / data.labels.length) * 0.35;
    const barSpacing = (chartWidth / data.labels.length);
    
    data.labels.forEach((label, i) => {
        const x = padding + barSpacing * i + (barSpacing - barWidth * 2) / 2;
        
        const baselineHeight = (data.baseline[i] / maxValue) * chartHeight;
        const baselineY = height - padding - baselineHeight;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fillRect(x, baselineY, barWidth, baselineHeight);
        
        const avoidedHeight = (data.avoided[i] / maxValue) * chartHeight;
        const avoidedY = height - padding - avoidedHeight;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x + barWidth, avoidedY, barWidth, avoidedHeight);
        
        ctx.fillStyle = '#047857';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(data.avoided[i].toFixed(1) + 't', x + barWidth * 1.5, avoidedY - 5);
    });
    
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
// PAGE NAVIGATION
// ==========================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.getElementById(pageId).classList.add('active');
    
    if (event && event.target) {
        const navItem = event.target.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }
    }
    
    if (pageId === 'analytics') {
        setTimeout(() => drawSpendingChart('12'), 100);
    } else if (pageId === 'sustainability') {
        setTimeout(() => drawCarbonChart('12'), 100);
    } else if (pageId === 'equipment') {
        setTimeout(() => updateEquipmentDisplay(), 50);
    }
}

// ==========================
// CHAT FUNCTIONS
// ==========================

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('open');
}

function sendChatMessage() {
    const input = document.getElementById('chatInputField');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesDiv = document.getElementById('chatMessages');
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

function generateQuote() {
    const quoteResult = document.getElementById('quoteResult');
    if (quoteResult) {
        quoteResult.style.display = 'block';
        quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================
// INITIALIZATION
// ==========================

window.addEventListener('load', () => {
    setTimeout(() => {
        drawSpendingChart('12');
        drawCarbonChart('12');
        updateEquipmentDisplay();
    }, 100);
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const analyticsPage = document.getElementById('analytics');
        const sustainabilityPage = document.getElementById('sustainability');
        
        if (analyticsPage && analyticsPage.classList.contains('active')) {
            drawSpendingChart('12');
        }
        if (sustainabilityPage && sustainabilityPage.classList.contains('active')) {
            drawCarbonChart('12');
        }
    }, 250);
});

if (typeof window !== 'undefined') {
    window.cesPortal = {
        drawSpendingChart,
        drawCarbonChart,
        showPage,
        toggleChat,
        generateQuote,
        filterEquipment,
        addToQuote,
        equipmentInventory,
        quoteCart
    };
}