// AI Assistant Module
const AIAssistant = (function() {
    let currentScenario = null;
    let conversationStep = 0;
    
    function init() {
        console.log('AI Assistant initialized');
        setupScenarioButtons();
    }
    
    function setupScenarioButtons() {
        // Add event listeners to scenario buttons
        const scenarioBtns = document.querySelectorAll('.scenario-btn');
        scenarioBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const scenarioId = this.dataset.scenario;
                loadScenario(scenarioId, this);
            });
        });
    }
    
    function loadScenario(scenarioId, buttonElement) {
        // Update active button
        document.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        if (buttonElement) {
            buttonElement.classList.add('active');
        }
        
        if (scenarioId === 'custom') {
            enableCustomChat();
            return;
        }
        
        // Load scenario
        currentScenario = scenarioId;
        conversationStep = 0;
        const scenario = aiScenarios[scenarioId];
        
        // Clear chat
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = '';
            displayNextMessage();
        }
    }
    
    function enableCustomChat() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.querySelector('.send-button');
        
        if (messageInput) {
            messageInput.disabled = false;
            messageInput.placeholder = 'Type your message...';
        }
        if (sendButton) {
            sendButton.disabled = false;
        }
        
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages) {
            chatMessages.innerHTML = `
                <div class="message ai">
                    <div class="message-avatar">🤖</div>
                    <div class="message-content">
                        <div class="message-bubble">
                            <p>Hi! I'm your CES Power AI Assistant. I can help you with:</p>
                            <ul style="margin-top: 12px; line-height: 1.8;">
                                <li>🎯 Quick power requirement estimates</li>
                                <li>💡 Equipment recommendations</li>
                                <li>💰 Instant pricing calculations</li>
                                <li>🌱 Sustainability solutions</li>
                                <li>📋 Full event power planning</li>
                            </ul>
                            <p style="margin-top: 12px;">What event are you planning?</p>
                        </div>
                        <div class="message-time">Just now</div>
                    </div>
                </div>
            `;
        }
    }
    
    function displayNextMessage() {
        const scenario = aiScenarios[currentScenario];
        if (!scenario || conversationStep >= scenario.messages.length) return;
        
        const message = scenario.messages[conversationStep];
        
        if (message.type === 'ai' && message.thinking) {
            showThinkingIndicator(message);
        } else {
            displayActualMessage(message);
        }
        
        conversationStep++;
    }
    
    function showThinkingIndicator(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai';
        thinkingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="thinking-indicator">
                    <div class="thinking-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    ${message.thinking}
                </div>
            </div>
        `;
        chatMessages.appendChild(thinkingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        setTimeout(() => {
            thinkingDiv.remove();
            displayActualMessage(message);
        }, 2000);
    }
    
    function displayActualMessage(message) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.type}`;
        
        let contentHTML = buildMessageHTML(message);
        messageDiv.innerHTML = contentHTML;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Auto-advance after user messages
        if (message.type === 'user') {
            const scenario = aiScenarios[currentScenario];
            if (conversationStep < scenario.messages.length) {
                setTimeout(() => displayNextMessage(), 1000);
            }
        }
    }
    
    function buildMessageHTML(message) {
        let html = `
            <div class="message-avatar">${message.type === 'ai' ? '🤖' : '👤'}</div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${message.text}</p>
        `;
        
        // Add autonomous actions
        if (message.autonomous) {
            html += buildAutonomousHTML(message.autonomous);
        }
        
        // Add clarification
        if (message.clarification) {
            html += buildClarificationHTML(message.clarification);
        }
        
        // Add recommendation
        if (message.recommendation) {
            html += buildRecommendationHTML(message.recommendation);
        }
        
        // Add comparison
        if (message.comparison) {
            html += buildComparisonHTML(message.comparison);
        }
        
        // Add approval box
        if (message.approval) {
            html += buildApprovalHTML(message.approval);
        }
        
        // Add next steps
        if (message.nextSteps) {
            html += buildNextStepsHTML(message.nextSteps);
        }
        
        // Add documents
        if (message.documents) {
            html += buildDocumentsHTML(message.documents);
        }
        
        html += `
                </div>
                <div class="message-time">${message.timestamp}</div>
        `;
        
        // Add action cards
        if (message.actions) {
            html += buildActionCardsHTML(message.actions);
        }
        
        html += '</div>';
        return html;
    }
    
    // Helper functions for building different sections
    function buildAutonomousHTML(autonomous) {
        return `
            <div class="autonomous-action">
                <div class="autonomous-title">${autonomous.title}</div>
                <div class="autonomous-text">
                    ${autonomous.actions.map(action => `✓ ${action}`).join('<br>')}
                </div>
            </div>
        `;
    }
    
    function buildClarificationHTML(clarification) {
        return `
            <div class="clarification-box">
                <div class="clarification-title">❓ ${clarification.title}</div>
                <div class="clarification-list">
                    ${clarification.questions.map(q => q).join('<br>')}
                </div>
            </div>
        `;
    }
    
    function buildRecommendationHTML(rec) {
        let html = `
            <div class="recommendation-card">
                <div class="recommendation-header">
                    <span class="recommendation-badge">${rec.badge}</span>
                    <span class="priority-badge priority-${rec.priority}">
                        ${rec.priority.toUpperCase()} PRIORITY
                    </span>
                </div>
                <h4 style="margin-bottom: 12px; color: #0c4a6e;">${rec.title}</h4>
        `;
        
        if (rec.equipment) {
            html += '<div class="equipment-list">';
            rec.equipment.forEach((item, index) => {
                html += `
                    <div class="equipment-item">
                        <div class="equipment-info">
                            <div class="equipment-name">${index + 1}. ${item.name}</div>
                            <div class="equipment-spec">${item.spec} • ${item.reason}</div>
                        </div>
                        <div class="equipment-qty">×${item.qty}</div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        if (rec.sustainability) {
            const s = rec.sustainability;
            html += `
                <div style="margin-top: 16px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                    <div class="info-pill">🌱 ${s.emission_reduction} less CO₂</div>
                    <div class="info-pill">⛽ ${s.fuel_savings} saved</div>
                    <div class="info-pill">♻️ ${s.carbon_offset} offset</div>
                    <div class="info-pill">☀️ ${s.renewable_percentage} renewable</div>
                </div>
            `;
        }
        
        if (rec.cost) {
            html += `
                <div class="cost-summary">
                    <div class="cost-breakdown">
                        <div class="cost-label">${rec.cost.label}</div>
                        <div class="cost-amount">${rec.cost.amount}</div>
                        <div class="cost-details">${rec.cost.details}</div>
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
    
    function buildComparisonHTML(comparison) {
        let html = '<div style="margin-top: 16px;">';
        comparison.options.forEach(option => {
            html += `
                <div class="recommendation-card" style="margin-bottom: 12px;">
                    <div class="recommendation-header">
                        <h4 style="color: #0c4a6e;">${option.title}</h4>
                        <span class="priority-badge priority-${option.priority}">
                            ${option.priority.toUpperCase()}
                        </span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin: 12px 0;">
                        <div class="info-pill">💰 ${option.cost}</div>
                        <div class="info-pill">📦 ${option.equipment_count}</div>
                        <div class="info-pill">⛽ Fuel: ${option.fuel_cost}</div>
                        <div class="info-pill">🌍 ${option.emissions}</div>
                    </div>
                    <div style="font-size: 13px; color: #334155; line-height: 1.6;">
                        <strong style="color: #166534;">Pros:</strong> ${option.pros.join(', ')}<br>
                        <strong style="color: #991b1b;">Cons:</strong> ${option.cons.join(', ')}
                    </div>
                </div>
            `;
        });
        html += `
            <div style="background: #eff6ff; padding: 12px; border-radius: 8px; margin-top: 12px; font-size: 13px; color: #1e40af;">
                <strong>💡 Recommendation:</strong> ${comparison.recommendation_reason}
            </div>
        `;
        html += '</div>';
        return html;
    }
    
    function buildApprovalHTML(approval) {
        return `
            <div class="approval-required">
                <div class="approval-icon">${approval.icon}</div>
                <div class="approval-text">
                    <div class="approval-title">${approval.title}</div>
                    <div class="approval-subtitle">${approval.subtitle}</div>
                </div>
            </div>
        `;
    }
    
    function buildNextStepsHTML(nextSteps) {
        let html = `
            <div style="margin-top: 16px; background: #f8fafc; padding: 16px; border-radius: 12px;">
                <h4 style="margin-bottom: 12px; color: #1e293b;">${nextSteps.title}</h4>
        `;
        nextSteps.steps.forEach(step => {
            html += `
                <div style="display: flex; align-items: center; gap: 12px; padding: 10px; background: white; border-radius: 8px; margin-bottom: 8px;">
                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">
                        ${step.step}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #1e293b;">${step.task}</div>
                        <div style="font-size: 12px; color: #64748b;">${step.deadline}</div>
                    </div>
                    <div style="font-size: 11px; padding: 4px 8px; border-radius: 6px; background: ${step.status === 'scheduled' ? '#dcfce7' : '#fef3c7'}; color: ${step.status === 'scheduled' ? '#166534' : '#92400e'};">
                        ${step.status}
                    </div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }
    
    function buildDocumentsHTML(documents) {
        let html = `
            <div style="margin-top: 16px;">
                <h4 style="margin-bottom: 12px; color: #1e293b;">📎 Documents Ready</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
        `;
        documents.forEach(doc => {
            html += `
                <div style="padding: 10px; background: #f8fafc; border-radius: 8px; font-size: 12px; color: #475569; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f8fafc'">
                    ${doc}
                </div>
            `;
        });
        html += '</div></div>';
        return html;
    }
    
    function buildActionCardsHTML(actions) {
        let html = '<div class="action-cards">';
        actions.forEach(action => {
            html += `
                <div class="action-card" onclick="AIAssistant.handleActionClick('${action.title}')">
                    <div class="action-icon">${action.icon}</div>
                    <div class="action-title">${action.title}</div>
                    <div class="action-subtitle">${action.subtitle}</div>
                </div>
            `;
        });
        html += '</div>';
        return html;
    }
    
    function handleActionClick(actionTitle) {
        alert(`Action clicked: ${actionTitle}\n\nThis would trigger the corresponding action in the full system.`);
    }
    
    function sendCustomMessage(message) {
        // Handle custom chat messages
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <div class="message-bubble">
                    <p>${message}</p>
                </div>
                <div class="message-time">Just now</div>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate AI response
        setTimeout(() => {
            const aiMessage = document.createElement('div');
            aiMessage.className = 'message ai';
            aiMessage.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    <div class="message-bubble">
                        <p>I'd be happy to help with that! To give you the most accurate solution, I need a few details about your event. Let me ask you some questions...</p>
                        <div class="clarification-box">
                            <div class="clarification-title">❓ Tell me more about your event:</div>
                            <div class="clarification-list">
                                1. What type of event is this?<br>
                                2. How many attendees do you expect?<br>
                                3. What are your event dates?<br>
                                4. Indoor or outdoor venue?<br>
                                5. Any specific power requirements or concerns?
                            </div>
                        </div>
                    </div>
                    <div class="message-time">Just now</div>
                </div>
            `;
            chatMessages.appendChild(aiMessage);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }
    
    // Public API
    return {
        init,
        loadScenario,
        handleActionClick,
        sendCustomMessage
    };
})();