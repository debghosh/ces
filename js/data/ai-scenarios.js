// ==========================
// AI SCENARIOS DATA
// Conversation scenarios for AI Assistant
// ==========================

(function(window) {
    'use strict';
    
    // Festival Scenario - 50,000 attendees, 3-day event
    const festivalScenario = {
        name: 'Horizon Music Festival',
        messages: [
            {
                type: 'user',
                text: 'Hi! I\'m Sarah from Horizon Events. We\'re planning a 3-day music festival called "Summer Sonic" expecting 50,000 attendees. We need a complete power solution. Can you help?',
                timestamp: '10:42 AM'
            },
            {
                type: 'ai',
                text: 'Hi Sarah! Absolutely, I can help with that. A 3-day festival for 50,000 people is a major event! Let me work on this for you.',
                timestamp: '10:42 AM',
                thinking: 'Analyzing event requirements and checking inventory availability...',
                autonomous: {
                    title: '🤖 Autonomous Actions Taken',
                    actions: [
                        'Checked equipment availability for your dates',
                        'Calculated power requirements based on 50,000 attendees',
                        'Generated redundancy plan for mission-critical systems',
                        'Estimated logistics and delivery timeline'
                    ]
                },
                clarification: {
                    title: '❓ I need a few details to optimize your solution:',
                    questions: [
                        '1. What\'s the event date range?',
                        '2. Indoor venue, outdoor, or mixed?',
                        '3. Main stages count and size?',
                        '4. Are you interested in our hybrid/sustainable options?',
                        '5. What\'s your sustainability priority level?'
                    ]
                },
                recommendation: {
                    badge: 'Preliminary Assessment',
                    title: 'Initial Power Solution for 50,000 Attendees',
                    priority: 'high',
                    equipment: [
                        { name: '2000 kVA Hybrid Generator', spec: 'Main stage primary', qty: 2, reason: 'High capacity with 40% fuel savings' },
                        { name: '1000 kVA Hybrid Generator', spec: 'Secondary stage', qty: 3, reason: 'Redundancy and load distribution' },
                        { name: '500 kVA Generators', spec: 'Vendor power & lighting', qty: 4, reason: 'Distributed power zones' },
                        { name: 'Battery Storage Systems (500kWh)', spec: 'Peak shaving & backup', qty: 4, reason: 'Reduces emissions by 65%' },
                        { name: 'Load Banks & Distribution', spec: 'Complete infrastructure', qty: 1, reason: 'Full power distribution' }
                    ],
                    cost: {
                        label: 'Estimated 3-Day Cost',
                        amount: '$324,500',
                        details: 'Includes delivery, setup, 24/7 monitoring, fuel, teardown'
                    }
                },
                actions: [
                    { icon: '📋', title: 'View Full Quote', subtitle: 'Detailed breakdown' },
                    { icon: '📅', title: 'Check Availability', subtitle: 'Reserve equipment' },
                    { icon: '🌱', title: 'Sustainability Report', subtitle: 'Carbon impact' },
                    { icon: '💬', title: 'Schedule Call', subtitle: 'Speak with expert' }
                ]
            },
            {
                type: 'user',
                text: 'Wow, that\'s comprehensive! The event is July 15-17, 2026. It\'s an outdoor venue with 2 main stages and a VIP area. Yes, very interested in sustainable options - that\'s a key requirement from our sponsors.',
                timestamp: '10:45 AM'
            },
            {
                type: 'ai',
                text: 'Perfect! I love that sustainability is a priority. Let me optimize this solution for your outdoor July event with maximum green credentials.',
                timestamp: '10:45 AM',
                thinking: 'Optimizing for outdoor setup and sustainability requirements...',
                autonomous: {
                    title: '🤖 Optimizing Your Solution',
                    actions: [
                        'Confirmed equipment available for July 15-17, 2026',
                        'Added solar arrays for daytime power offset',
                        'Calculated 72% emission reduction vs. diesel-only',
                        'Reserved Tier 4 Final generators (lowest emissions)',
                        'Prepared sustainability certification documents'
                    ]
                },
                recommendation: {
                    badge: 'Priority: High - Sustainable Solution',
                    title: '🌱 Optimized Hybrid Power Solution',
                    priority: 'high',
                    equipment: [
                        { name: '2000 kVA Hybrid Generators', spec: 'Tier 4 Final, HVO fuel ready', qty: 2, reason: 'PRIMARY - 96% cleaner than standard diesel' },
                        { name: 'Solar Array System (200kW)', spec: 'Rapid deployment panels', qty: 2, reason: 'RECOMMENDED - Offsets 30% daytime power' },
                        { name: 'Battery Storage (500kWh each)', spec: 'Li-Ion with smart management', qty: 4, reason: 'PRIORITY - Stores solar, peak shaving' },
                        { name: '1000 kVA Hybrid Generators', spec: 'With load-on-demand', qty: 3, reason: 'Intelligent load management' },
                        { name: 'Smart Distribution Hub', spec: 'Real-time monitoring', qty: 1, reason: 'Optimization and analytics' }
                    ],
                    sustainability: {
                        emission_reduction: '72%',
                        fuel_savings: '8,200 gallons',
                        carbon_offset: '82 metric tons CO₂',
                        renewable_percentage: '31%'
                    },
                    cost: {
                        label: 'Total 3-Day Investment',
                        amount: '$387,900',
                        details: 'Premium hybrid solution - $63,400 more than diesel-only, saves $12,400 in fuel'
                    }
                },
                approval: {
                    icon: '⚠️',
                    title: 'Budget Increase - Approval Suggested',
                    subtitle: 'Hybrid solution is 19% more upfront but delivers strong sustainability ROI and sponsor appeal'
                },
                actions: [
                    { icon: '✅', title: 'Approve & Reserve', subtitle: 'Lock in equipment' },
                    { icon: '📊', title: 'ROI Calculator', subtitle: 'Compare options' },
                    { icon: '🎯', title: 'Alternative Options', subtitle: 'See other solutions' },
                    { icon: '📄', title: 'Sustainability Report', subtitle: 'For sponsor pitch' }
                ]
            },
            {
                type: 'user',
                text: 'This looks great! The sustainability metrics will be perfect for our sponsor deck. Can you show me what a diesel-only option would cost for comparison?',
                timestamp: '10:48 AM'
            },
            {
                type: 'ai',
                text: 'Smart thinking! Here\'s the side-by-side comparison. While diesel-only is cheaper upfront, the hybrid solution pays for itself in fuel savings and gives you powerful marketing angles.',
                timestamp: '10:48 AM',
                thinking: 'Generating comparison analysis...',
                comparison: {
                    options: [
                        {
                            title: 'Diesel-Only Solution',
                            priority: 'medium',
                            cost: '$324,500',
                            equipment_count: '11 units',
                            fuel_cost: '$48,200',
                            emissions: '285 metric tons CO₂',
                            pros: ['Lower upfront cost', 'Proven technology', 'Simpler logistics'],
                            cons: ['High fuel consumption', 'Loud operation', 'Poor sustainability optics', 'Sponsor concerns']
                        },
                        {
                            title: '✨ Hybrid-Solar Solution (RECOMMENDED)',
                            priority: 'high',
                            cost: '$387,900',
                            equipment_count: '12 units + solar',
                            fuel_cost: '$35,800',
                            emissions: '82 metric tons CO₂',
                            pros: ['72% emission reduction', 'Perfect for sponsor story', 'Quieter operation', 'Premium brand image', 'Future-proof'],
                            cons: ['Higher initial cost', 'More complex setup']
                        }
                    ],
                    recommendation_reason: 'For a high-profile event with sustainability-conscious sponsors, the hybrid solution offers compelling ROI beyond just cost savings. The emission reduction story alone could justify premium sponsorship tiers.'
                },
                actions: [
                    { icon: '⚡', title: 'Select Hybrid', subtitle: 'Recommended option' },
                    { icon: '💰', title: 'Select Diesel', subtitle: 'Budget option' },
                    { icon: '🔧', title: 'Custom Mix', subtitle: 'Build your own' },
                    { icon: '📞', title: 'Discuss Options', subtitle: 'Call specialist' }
                ]
            },
            {
                type: 'user',
                text: 'Perfect! Let\'s go with the hybrid solution. How do we move forward?',
                timestamp: '10:52 AM'
            },
            {
                type: 'ai',
                text: 'Excellent choice, Sarah! I\'m reserving the equipment now and creating your contract.',
                timestamp: '10:52 AM',
                thinking: 'Finalizing reservation and generating contract documents...',
                autonomous: {
                    title: '✅ Autonomous Actions Completed',
                    actions: [
                        'Equipment reserved for July 15-17, 2026 (72-hour hold)',
                        'Generated detailed contract with payment schedule',
                        'Created sustainability impact report for sponsors',
                        'Scheduled site assessment for June 1, 2026',
                        'Added 24/7 monitoring team to your event',
                        'Prepared logistics timeline and delivery schedule'
                    ]
                },
                nextSteps: {
                    title: '📋 Next Steps - Action Required',
                    steps: [
                        { step: '1', task: 'Review & sign contract', deadline: 'Within 48 hours', status: 'pending' },
                        { step: '2', task: '50% deposit ($193,950)', deadline: 'With signed contract', status: 'pending' },
                        { step: '3', task: 'Site assessment coordination', deadline: 'June 1, 2026', status: 'scheduled' },
                        { step: '4', task: 'Final walkthrough', deadline: 'July 8, 2026', status: 'scheduled' },
                        { step: '5', task: 'Equipment delivery & setup', deadline: 'July 13-14, 2026', status: 'scheduled' }
                    ]
                },
                documents: [
                    '📄 Equipment Reservation Agreement',
                    '💰 Payment Schedule & Terms',
                    '🌱 Sustainability Impact Report',
                    '📊 Technical Specifications Sheet',
                    '🗺️ Logistics & Timeline',
                    '☎️ 24/7 Support Contact Card'
                ],
                actions: [
                    { icon: '✍️', title: 'Sign Contract', subtitle: 'E-signature ready' },
                    { icon: '💳', title: 'Make Deposit', subtitle: 'Secure payment' },
                    { icon: '📥', title: 'Download All Docs', subtitle: 'PDF package' },
                    { icon: '📧', title: 'Email to Team', subtitle: 'Share details' }
                ]
            }
        ]
    };
    
    // Wedding Scenario - 250 guests, luxury outdoor wedding
    const weddingScenario = {
        name: 'Luxury Wedding',
        messages: [
            {
                type: 'user',
                text: 'Hi, I\'m planning a luxury outdoor wedding for 250 guests. We need whisper-quiet power for the reception. Can you help?',
                timestamp: '2:15 PM'
            },
            {
                type: 'ai',
                text: 'Congratulations on your upcoming wedding! Absolutely - for luxury weddings, silent power is essential. Let me design a solution that\'s completely invisible to your guests.',
                timestamp: '2:15 PM',
                thinking: 'Designing ultra-quiet power solution for luxury event...',
                autonomous: {
                    title: '🤖 Smart Analysis Complete',
                    actions: [
                        'Selected ultra-quiet hybrid generators (< 55 dB)',
                        'Added battery systems for zero-noise peak periods',
                        'Included white noise enclosures with elegant finish',
                        'Calculated power for lighting, AV, catering, HVAC'
                    ]
                },
                recommendation: {
                    badge: 'Luxury Wedding Package',
                    title: 'Silent Hybrid Power Solution',
                    priority: 'high',
                    equipment: [
                        { name: 'Whisper-Quiet 150 kVA Hybrid', spec: '< 55 dB at 7m', qty: 2, reason: 'Virtually silent operation' },
                        { name: 'Battery System (100kWh)', spec: 'Zero noise during ceremony', qty: 1, reason: 'Peak periods run on battery' },
                        { name: 'White noise enclosures', spec: 'Custom wedding finish', qty: 2, reason: 'Elegant appearance' },
                        { name: 'Premium distribution panel', spec: 'Hidden installation', qty: 1, reason: 'Discreet power delivery' }
                    ],
                    cost: {
                        label: 'Wedding Power Package',
                        amount: '$8,750',
                        details: 'Includes setup, 12-hour coverage, white-glove service'
                    }
                },
                actions: [
                    { icon: '💍', title: 'Book Package', subtitle: 'Reserve your date' },
                    { icon: '📸', title: 'View Setup Photos', subtitle: 'See installations' },
                    { icon: '⭐', title: 'Add Extras', subtitle: 'Lighting, heating' },
                    { icon: '📞', title: 'Wedding Specialist', subtitle: 'Personal consultation' }
                ]
            },
            {
                type: 'user',
                text: 'That sounds perfect! What about backup in case something fails?',
                timestamp: '2:18 PM'
            },
            {
                type: 'ai',
                text: 'Great question! For weddings, we include automatic redundancy - you won\'t even notice if we switch systems. Let me show you our reliability features.',
                timestamp: '2:18 PM',
                thinking: 'Analyzing redundancy requirements...',
                autonomous: {
                    title: '✅ Premium Reliability Features Included',
                    actions: [
                        'Dual generator setup with auto-failover (< 1 second)',
                        'Battery backup provides seamless transition',
                        'On-site technician during entire event',
                        'Pre-event testing 24 hours before ceremony',
                        'Real-time monitoring with instant alerts'
                    ]
                },
                recommendation: {
                    badge: 'Zero-Worry Guarantee',
                    title: 'Premium Reliability Package',
                    priority: 'high',
                    equipment: [
                        { name: 'Auto-Transfer Switch', spec: 'Instant failover', qty: 1, reason: 'Seamless backup switching' },
                        { name: 'Backup Generator', spec: 'Hot standby mode', qty: 1, reason: 'Ready in < 1 second' },
                        { name: 'UPS System', spec: '15-minute bridge power', qty: 1, reason: 'Zero power interruption' }
                    ],
                    cost: {
                        label: 'Total with Premium Reliability',
                        amount: '$11,200',
                        details: 'Complete peace of mind - we\'ve never had a wedding power failure'
                    }
                },
                actions: [
                    { icon: '✅', title: 'Book Complete Package', subtitle: 'Best choice' },
                    { icon: '💬', title: 'Ask Questions', subtitle: 'Chat with expert' },
                    { icon: '📋', title: 'View Contract', subtitle: 'See terms' },
                    { icon: '🎁', title: 'Wedding Extras', subtitle: 'Special touches' }
                ]
            }
        ]
    };
    
    // Corporate Event Scenario - 5,000 attendees, 2-day conference
    const corporateScenario = {
        name: 'Corporate Conference',
        messages: [
            {
                type: 'user',
                text: 'We\'re hosting a 2-day tech conference with 5,000 attendees. Need reliable power for AV, booths, and demo areas.',
                timestamp: '11:30 AM'
            },
            {
                type: 'ai',
                text: 'Perfect! Tech conferences require ultra-reliable power with zero downtime. I\'ll design a redundant solution with real-time monitoring.',
                timestamp: '11:30 AM',
                thinking: 'Analyzing tech conference power requirements...',
                autonomous: {
                    title: '🤖 Smart Analysis Complete',
                    actions: [
                        'Calculated power load for typical tech conference setup',
                        'Added N+1 redundancy for mission-critical systems',
                        'Integrated real-time monitoring dashboard',
                        'Scheduled pre-event load testing',
                        'Assigned dedicated on-site technician team'
                    ]
                },
                clarification: {
                    title: '❓ Quick questions to optimize your setup:',
                    questions: [
                        '1. How many demo stations need dedicated circuits?',
                        '2. Main stage AV power requirements (kW)?',
                        '3. Do you need backup internet/networking power?',
                        '4. Any outdoor elements (tents, lighting)?',
                        '5. Peak attendance timing (for load planning)?'
                    ]
                },
                recommendation: {
                    badge: 'Enterprise Solution',
                    title: 'Redundant Power System with Monitoring',
                    priority: 'high',
                    equipment: [
                        { name: '500 kVA Generators', spec: 'Primary power (N+1)', qty: 3, reason: 'Redundancy ensures zero downtime' },
                        { name: 'UPS Systems (50kVA)', spec: 'Instant backup', qty: 2, reason: 'Zero-switchover time for critical loads' },
                        { name: 'Smart Monitoring System', spec: 'Real-time dashboard', qty: 1, reason: '24/7 oversight & alerts' },
                        { name: 'Distribution Panels', spec: 'Zoned power delivery', qty: 4, reason: 'Isolated circuits for demo areas' }
                    ],
                    cost: {
                        label: '2-Day Conference Package',
                        amount: '$42,900',
                        details: 'Includes redundancy, monitoring, 24/7 on-site technicians'
                    }
                },
                actions: [
                    { icon: '📋', title: 'Full Proposal', subtitle: 'Detailed specs' },
                    { icon: '📊', title: 'Load Analysis', subtitle: 'Power breakdown' },
                    { icon: '🔒', title: 'Book Now', subtitle: 'Reserve equipment' },
                    { icon: '📞', title: 'Enterprise Team', subtitle: 'Discuss needs' }
                ]
            },
            {
                type: 'user',
                text: 'Looks good. What\'s the lead time for a conference in 3 months?',
                timestamp: '11:35 AM'
            },
            {
                type: 'ai',
                text: 'Three months is perfect timing! I can reserve equipment now and we\'ll do a site visit 4 weeks before your event.',
                timestamp: '11:35 AM',
                thinking: 'Checking availability and planning timeline...',
                autonomous: {
                    title: '✅ Timeline Confirmed',
                    actions: [
                        'Equipment available for your dates',
                        'Site visit scheduled 4 weeks prior',
                        'Load testing planned 1 week before event',
                        'Pre-show meeting with your AV team arranged',
                        'Emergency response plan prepared'
                    ]
                },
                nextSteps: {
                    title: '📋 Project Timeline',
                    steps: [
                        { step: '1', task: 'Contract & 30% deposit', deadline: 'This week', status: 'pending' },
                        { step: '2', task: 'Site assessment visit', deadline: '4 weeks before', status: 'scheduled' },
                        { step: '3', task: 'Final power plan approval', deadline: '2 weeks before', status: 'scheduled' },
                        { step: '4', task: 'Load testing day', deadline: '1 week before', status: 'scheduled' },
                        { step: '5', task: 'Equipment install', deadline: 'Day before event', status: 'scheduled' }
                    ]
                },
                actions: [
                    { icon: '✍️', title: 'Sign Contract', subtitle: 'Lock in pricing' },
                    { icon: '📅', title: 'Schedule Site Visit', subtitle: 'Choose date' },
                    { icon: '📄', title: 'Download Proposal', subtitle: 'Share with team' },
                    { icon: '💬', title: 'Questions?', subtitle: 'Chat with specialist' }
                ]
            }
        ]
    };
    
    // Export scenarios
    window.aiScenarios = {
        festival: festivalScenario,
        wedding: weddingScenario,
        corporate: corporateScenario
    };
    
    console.log('✅ AI Scenarios loaded:', Object.keys(window.aiScenarios).length, 'scenarios');
    
})(window);