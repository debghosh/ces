// ==========================
// CHART DATA
// Historical spending and carbon data
// ==========================

(function(window) {
    'use strict';
    
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
    
    // Export to window
    window.ChartData = {
        spending: spendingData,
        carbon: carbonData,
        
        // Helper methods
        getSpendingData: function(period) {
            return spendingData[period] || spendingData[12];
        },
        
        getCarbonData: function(period) {
            return carbonData[period] || carbonData[12];
        }
    };
    
    console.log('✅ Chart data loaded');
    
})(window);