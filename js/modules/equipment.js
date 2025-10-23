// ==========================
// EQUIPMENT MODULE
// Equipment catalog, filtering, and cart operations
// ==========================

(function(window) {
    'use strict';
    
    // Equipment filters state
    const filters = {
        category: 'all',
        location: 'all',
        powerRange: 'all',
        availability: 'all',
        searchTerm: ''
    };
    
    /**
     * Filter equipment based on current filters
     * @returns {Array} Filtered equipment items
     */
    function filterEquipment() {
        return window.EquipmentData.inventory.filter(item => {
            // Category filter
            if (filters.category !== 'all') {
                if (filters.category === 'generator' && item.category !== 'generator') return false;
                if (filters.category === 'battery' && item.category !== 'battery') return false;
                if (filters.category === 'hybrid' && item.type !== 'hybrid') return false;
                if (filters.category === 'accessory' && item.category !== 'accessory') return false;
            }
            
            // Location filter
            if (filters.location !== 'all' && item.location !== filters.location) {
                return false;
            }
            
            // Power range filter
            if (filters.powerRange !== 'all') {
                if (filters.powerRange === 'under100' && item.power >= 100) return false;
                if (filters.powerRange === '100-300' && (item.power < 100 || item.power > 300)) return false;
                if (filters.powerRange === '300-500' && (item.power < 300 || item.power > 500)) return false;
                if (filters.powerRange === '500plus' && item.power < 500) return false;
            }
            
            // Availability filter
            if (filters.availability === 'now' && item.available === 0) return false;
            if (filters.availability === '7days' && item.available < 3) return false;
            if (filters.availability === '30days' && item.available < 1) return false;
            
            // Search filter
            if (filters.searchTerm) {
                const search = filters.searchTerm.toLowerCase();
                return item.name.toLowerCase().includes(search) || 
                       item.specs.toLowerCase().includes(search) ||
                       item.location.toLowerCase().includes(search);
            }
            
            return true;
        });
    }
    
    /**
     * Render equipment grid
     * @param {Array} equipment - Equipment items to display
     */
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
                        <button class="btn btn-primary" style="width: 100%;" onclick="Equipment.addToCart('${item.id}')" ${item.available === 0 ? 'disabled' : ''}>
                            ${item.available > 0 ? 'Add to Quote' : 'Unavailable'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    /**
     * Update equipment display based on current filters
     */
    function updateEquipmentDisplay() {
        renderEquipmentGrid(filterEquipment());
    }
    
    /**
     * Set equipment category filter
     * @param {string} category - Category to filter by
     */
    function setCategory(category) {
        filters.category = category;
        
        // Remove active class from all tabs
        document.querySelectorAll('#equipment .tab').forEach(tab => tab.classList.remove('active'));
        
        // Map category to tab index
        const categoryIndexMap = {
            'all': 0,
            'generator': 1,
            'battery': 2,
            'hybrid': 3,
            'accessory': 4
        };
        
        // Activate the corresponding tab
        const tabIndex = categoryIndexMap[category];
        if (tabIndex !== undefined) {
            const tabs = document.querySelectorAll('#equipment .tabs .tab');
            if (tabs[tabIndex]) {
                tabs[tabIndex].classList.add('active');
            }
        }
        
        updateEquipmentDisplay();
    }
    
    /**
     * Set location filter
     * @param {string} location - Location to filter by
     */
    function setLocation(location) {
        filters.location = location;
        updateEquipmentDisplay();
    }
    
    /**
     * Set power range filter
     * @param {string} range - Power range to filter by
     */
    function setPowerRange(range) {
        filters.powerRange = range;
        updateEquipmentDisplay();
    }
    
    /**
     * Set availability filter
     * @param {string} availability - Availability to filter by
     */
    function setAvailability(availability) {
        filters.availability = availability;
        updateEquipmentDisplay();
    }
    
    /**
     * Set search term filter
     * @param {string} searchTerm - Search term
     */
    function search(searchTerm) {
        filters.searchTerm = searchTerm;
        updateEquipmentDisplay();
    }
    
    /**
     * Add equipment to quote cart
     * @param {string} equipmentId - Equipment ID to add
     */
    function addToCart(equipmentId) {
        // This will be handled by Quotes module
        if (window.Quotes) {
            window.Quotes.addToCart(equipmentId);
        }
    }
    
    /**
     * Reset all filters
     */
    function resetFilters() {
        filters.category = 'all';
        filters.location = 'all';
        filters.powerRange = 'all';
        filters.availability = 'all';
        filters.searchTerm = '';
        updateEquipmentDisplay();
    }
    
    // Export to window
    window.Equipment = {
        filterEquipment,
        renderEquipmentGrid,
        updateEquipmentDisplay,
        setCategory,
        setLocation,
        setPowerRange,
        setAvailability,
        search,
        addToCart,
        resetFilters,
        filters
    };
    
    // Make functions globally accessible for onclick attributes
    window.setEquipmentCategory = setCategory;
    window.setEquipmentLocation = setLocation;
    window.setEquipmentPowerRange = setPowerRange;
    window.setEquipmentAvailability = setAvailability;
    window.searchEquipment = search;
    window.updateEquipmentDisplay = updateEquipmentDisplay;
    
    console.log('✅ Equipment module loaded');
    
})(window);