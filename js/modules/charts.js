// ==========================
// CHARTS MODULE
// Canvas-based chart rendering
// ==========================

(function(window) {
    'use strict';
    
    /**
     * Draw spending chart on canvas
     * @param {string} period - '3', '6', or '12' months
     */
    function drawSpendingChart(period = '12') {
        const canvas = document.getElementById('spendingChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = window.ChartData.getSpendingData(period);
        
        // Set canvas size with DPR for sharp rendering
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
        
        // Draw grid and Y-axis
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
    
    /**
     * Draw carbon savings chart on canvas
     * @param {string} period - '3', '6', or '12' months
     */
    function drawCarbonChart(period = '12') {
        const canvas = document.getElementById('carbonChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const data = window.ChartData.getCarbonData(period);
        
        // Set canvas size with DPR
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
        
        // Draw grid and Y-axis
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
            
            // Baseline bar (red/transparent)
            const baselineHeight = (data.baseline[i] / maxValue) * chartHeight;
            const baselineY = height - padding - baselineHeight;
            ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
            ctx.fillRect(x, baselineY, barWidth, baselineHeight);
            
            // Avoided bar (green)
            const avoidedHeight = (data.avoided[i] / maxValue) * chartHeight;
            const avoidedY = height - padding - avoidedHeight;
            ctx.fillStyle = '#10b981';
            ctx.fillRect(x + barWidth, avoidedY, barWidth, avoidedHeight);
            
            // Value labels
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
    
    /**
     * Update chart period
     * @param {string} chartType - 'spending' or 'carbon'
     * @param {string} period - '3', '6', or '12'
     */
    function updateChart(chartType, period) {
        if (chartType === 'spending') {
            drawSpendingChart(period);
        } else if (chartType === 'carbon') {
            drawCarbonChart(period);
        }
    }
    
    /**
     * Initialize charts with resize handlers
     */
    function initCharts() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (document.getElementById('spendingChart')) {
                    drawSpendingChart('12');
                }
                if (document.getElementById('carbonChart')) {
                    drawCarbonChart('12');
                }
            }, 250);
        });
        
        console.log('✅ Charts module initialized');
    }
    
    // Export to window
    window.Charts = {
        drawSpendingChart,
        drawCarbonChart,
        updateChart,
        initCharts
    };
    
    // Make chart functions globally accessible
    window.drawSpendingChart = drawSpendingChart;
    window.drawCarbonChart = drawCarbonChart;
    window.updateSpendingChart = updateChart.bind(null, 'spending');
    window.updateCarbonChart = updateChart.bind(null, 'carbon');
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCharts);
    } else {
        initCharts();
    }
    
    console.log('✅ Charts module loaded');
    
})(window);