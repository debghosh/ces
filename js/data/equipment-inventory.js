// ==========================
// EQUIPMENT INVENTORY DATA
// Centralized equipment catalog
// ==========================

(function(window) {
    'use strict';
    
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
    
    // Export to window
    window.EquipmentData = {
        inventory: equipmentInventory,
        
        // Helper methods
        getById: function(id) {
            return equipmentInventory.find(item => item.id === id);
        },
        
        getByCategory: function(category) {
            return equipmentInventory.filter(item => item.category === category);
        },
        
        getAvailable: function() {
            return equipmentInventory.filter(item => item.available > 0);
        }
    };
    
    console.log('✅ Equipment data loaded:', equipmentInventory.length, 'items');
    
})(window);