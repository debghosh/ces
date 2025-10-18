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
    
    // Set canvas size for retina displays
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 700;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 350;
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const maxSpending = Math.max(...data.spending);
    const maxEvents = Math.max(...data.events);
    
    // Draw grid lines and Y-axis labels
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = Math.round(maxSpending * (1 - i / 5) / 1000);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText('$' + value + 'K', padding - 10, y + 4);
    }
    
    // Draw spending line
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
    
    // Draw spending points
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
    
    // Draw savings line
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
    
    // Draw savings points
    data.savings.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i;
        const y = padding + chartHeight - (value / maxSpending) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
    });
    
    // Draw events bars
    const barWidth = (chartWidth / data.labels.length) * 0.3;
    data.events.forEach((value, i) => {
        const x = padding + (chartWidth / (data.labels.length - 1)) * i - barWidth / 2;
        const barHeight = (value / maxEvents) * (chartHeight * 0.3);
        const y = height - padding - barHeight;
        
        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(x, y, barWidth, barHeight);
    });
    
    // Draw X-axis labels
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
    
    // Set canvas size for retina displays
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 700;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 350;
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    const maxValue = Math.max(...data.baseline);
    
    // Draw grid lines and Y-axis labels
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = (maxValue * (1 - i / 5)).toFixed(1);
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(value + 't', padding - 10, y + 4);
    }
    
    // Draw bars
    const barWidth = (chartWidth / data.labels.length) * 0.35;
    const barSpacing = (chartWidth / data.labels.length);
    
    data.labels.forEach((label, i) => {
        const x = padding + barSpacing * i + (barSpacing - barWidth * 2) / 2;
        
        // Baseline bar (faded red - diesel only)
        const baselineHeight = (data.baseline[i] / maxValue) * chartHeight;
        const baselineY = height - padding - baselineHeight;
        ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
        ctx.fillRect(x, baselineY, barWidth, baselineHeight);
        
        // Avoided bar (green - hybrid savings)
        const avoidedHeight = (data.avoided[i] / maxValue) * chartHeight;
        const avoidedY = height - padding - avoidedHeight;
        ctx.fillStyle = '#10b981';
        ctx.fillRect(x + barWidth, avoidedY, barWidth, avoidedHeight);
        
        // Value labels on avoided bars
        ctx.fillStyle = '#047857';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(data.avoided[i].toFixed(1) + 't', x + barWidth * 1.5, avoidedY - 5);
    });
    
    // Draw X-axis labels
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    data.labels.forEach((label, i) => {
        const x = padding + barSpacing * i + barSpacing / 2;
        ctx.fillText(label, x, height - padding + 20);
    });
}

// ==========================
// CHART UPDATE FUNCTIONS
// ==========================

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
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Add active to clicked nav item
    if (event && event.target) {
        const navItem = event.target.closest('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }
    }
    
    // Redraw charts when navigating to analytics or sustainability pages
    // Delay ensures page is visible before drawing
    if (pageId === 'analytics') {
        setTimeout(() => drawSpendingChart('12'), 100);
    } else if (pageId === 'sustainability') {
        setTimeout(() => drawCarbonChart('12'), 100);
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
    
    // Add user message
    const messagesDiv = document.getElementById('chatMessages');
    messagesDiv.innerHTML += `
        <div class="chat-message user-message" style="flex-direction: row-reverse;">
            <div class="chat-avatar user-avatar">👤</div>
            <div class="chat-bubble">${escapeHtml(message)}</div>
        </div>
    `;
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    
    // Simulate AI response
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

// ==========================
// QUOTE GENERATION
// ==========================

function generateQuote() {
    const quoteResult = document.getElementById('quoteResult');
    if (quoteResult) {
        quoteResult.style.display = 'block';
        quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ==========================
// UTILITY FUNCTIONS
// ==========================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================
// INITIALIZATION
// ==========================

// Initialize charts when page loads
window.addEventListener('load', () => {
    // Draw charts with a small delay to ensure DOM is ready
    setTimeout(() => {
        drawSpendingChart('12');
        drawCarbonChart('12');
    }, 100);
});

// Handle window resize - redraw charts
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Only redraw if charts are visible
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

// ==========================
// EXPORT FOR DEBUGGING
// ==========================

// Make functions available in console for debugging
if (typeof window !== 'undefined') {
    window.cesPortal = {
        drawSpendingChart,
        drawCarbonChart,
        showPage,
        toggleChat,
        generateQuote
    };
}