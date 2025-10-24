// ==========================
// CHAT MODULE - ENHANCED WITH AI ASSISTANT
// AI chat widget functionality with multi-turn conversations
// ==========================

(function(window) {
    'use strict';
    
    // AI Mode Configuration
    let useAIMode = true; // Toggle for AI-enhanced chat
    let currentScenario = null;
    let conversationStep = 0;
    let isCustomMode = false;
    
    /**
     * Toggle chat window visibility
     */
    function toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            const isOpening = !chatWindow.classList.contains('open');
            chatWindow.classList.toggle('open');
            
            // Initialize AI mode when opening chat
            if (isOpening && useAIMode) {
                initializeAIChat();
            }
        }
    }
    
    /**
     * Initialize AI Chat with scenario selector
     */
    function initializeAIChat() {
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        // Add scenario selector at the top
        const scenarioHTML = `
            <div class="scenario-selector" style="padding: 12px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; gap: 8px; overflow-x: auto; margin: -15px -15px 15px -15px;">
                <button class="scenario-btn active" data-scenario="festival" style="padding: 8px 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; white-space: nowrap;">
                    🎵 3-Day Festival
                </button>
                <button class="scenario-btn" data-scenario="wedding" style="padding: 8px 12px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; white-space: nowrap; color: #1e293b;">
                    💒 Wedding
                </button>
                <button class="scenario-btn" data-scenario="corporate" style="padding: 8px 12px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; white-space: nowrap; color: #1e293b;">
                    🏢 Corporate
                </button>
                <button class="scenario-btn" data-scenario="custom" style="padding: 8px 12px; background: white; border: 2px solid #e2e8f0; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 600; white-space: nowrap; color: #1e293b;">
                    ✏️ Custom
                </button>
            </div>
        `;
        
        messagesDiv.innerHTML = scenarioHTML;
        
        // Add click handlers to scenario buttons
        const scenarioBtns = messagesDiv.querySelectorAll('.scenario-btn');
        scenarioBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const scenario = this.getAttribute('data-scenario');
                loadScenario(scenario, this);
            });
        });
        
        // Auto-load festival scenario
        setTimeout(() => {
            const festivalBtn = messagesDiv.querySelector('.scenario-btn[data-scenario="festival"]');
            if (festivalBtn) {
                loadScenario('festival', festivalBtn);
            }
        }, 100);
        
        // Disable input initially
        const input = document.getElementById('chatInputField');
        if (input) {
            input.disabled = true;
            input.placeholder = 'Choose a scenario or select Custom to chat...';
        }
    }
    
    /**
     * Load a conversation scenario
     */
    function loadScenario(scenarioId, buttonElement) {
        // Update active button
        const messagesDiv = document.getElementById('chatMessages');
        if (messagesDiv) {
            const allBtns = messagesDiv.querySelectorAll('.scenario-btn');
            allBtns.forEach(btn => {
                btn.style.background = 'white';
                btn.style.color = '#1e293b';
                btn.style.border = '2px solid #e2e8f0';
                btn.classList.remove('active');
            });
        }
        
        if (buttonElement) {
            buttonElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            buttonElement.style.color = 'white';
            buttonElement.style.border = 'none';
            buttonElement.classList.add('active');
        }
        
        // Handle custom mode
        if (scenarioId === 'custom') {
            enableCustomMode();
            return;
        }
        
        // Load scenario conversation
        isCustomMode = false;
        currentScenario = scenarioId;
        conversationStep = 0;
        
        // Clear messages (keep scenario selector)
        clearMessagesKeepScenarios();
        
        // Disable input for scenario mode
        const input = document.getElementById('chatInputField');
        if (input) {
            input.disabled = true;
            input.placeholder = 'Scenario playing automatically...';
        }
        
        // Start conversation
        displayNextMessage();
    }
    
    /**
     * Enable custom chat mode
     */
    function enableCustomMode() {
        isCustomMode = true;
        currentScenario = null;
        
        const input = document.getElementById('chatInputField');
        if (input) {
            input.disabled = false;
            input.placeholder = 'Type your message...';
        }
        
        clearMessagesKeepScenarios();
        
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        const welcomeHTML = `
            <div class="chat-message" style="display: flex; gap: 10px; margin-bottom: 15px; animation: slideIn 0.3s ease-out;">
                <div class="chat-avatar ai-avatar" style="width: 36px; height: 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🤖</div>
                <div class="chat-bubble" style="background: white; padding: 12px 16px; border-radius: 12px; max-width: 80%; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <p style="margin: 0 0 10px 0;">Hi! I'm your CES Power AI Assistant. I can help you with:</p>
                    <ul style="margin: 10px 0; padding-left: 20px; line-height: 1.8;">
                        <li>🎯 Quick power requirement estimates</li>
                        <li>💡 Equipment recommendations</li>
                        <li>💰 Instant pricing calculations</li>
                        <li>🌱 Sustainability solutions</li>
                        <li>📋 Full event power planning</li>
                    </ul>
                    <p style="margin: 10px 0 0 0;">What event are you planning?</p>
                </div>
            </div>
        `;
        
        messagesDiv.insertAdjacentHTML('beforeend', welcomeHTML);
        scrollToBottom();
    }
    
    /**
     * Clear messages but keep scenario selector
     */
    function clearMessagesKeepScenarios() {
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        const scenarioSelector = messagesDiv.querySelector('.scenario-selector');
        messagesDiv.innerHTML = '';
        
        if (scenarioSelector) {
            messagesDiv.appendChild(scenarioSelector);
        }
    }
    
    /**
     * Display next message in scenario conversation
     */
    function displayNextMessage() {
        if (!currentScenario || !window.aiScenarios) return;
        
        const scenario = window.aiScenarios[currentScenario];
        if (!scenario || conversationStep >= scenario.messages.length) return;
        
        const message = scenario.messages[conversationStep];
        
        // Show thinking indicator for AI messages
        if (message.type === 'ai' && message.thinking) {
            showThinkingIndicator(message.thinking);
            setTimeout(() => {
                removeThinkingIndicator();
                displayActualMessage(message);
            }, 2000);
        } else {
            displayActualMessage(message);
        }
        
        conversationStep++;
    }
    
    /**
     * Show thinking indicator
     */
    function showThinkingIndicator(thinkingText) {
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        const thinkingHTML = `
            <div class="thinking-indicator-msg" style="display: flex; gap: 10px; margin-bottom: 15px;">
                <div class="chat-avatar ai-avatar" style="width: 36px; height: 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🤖</div>
                <div style="display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; background: #f1f5f9; border-radius: 12px; font-size: 12px; color: #64748b; font-style: italic;">
                    <div style="display: flex; gap: 4px;">
                        <span style="width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: -0.32s;"></span>
                        <span style="width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; animation-delay: -0.16s;"></span>
                        <span style="width: 6px; height: 6px; background: #94a3b8; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out;"></span>
                    </div>
                    ${thinkingText}
                </div>
            </div>
        `;
        
        messagesDiv.insertAdjacentHTML('beforeend', thinkingHTML);
        scrollToBottom();
    }
    
    /**
     * Remove thinking indicator
     */
    function removeThinkingIndicator() {
        const indicator = document.querySelector('.thinking-indicator-msg');
        if (indicator) {
            indicator.remove();
        }
    }
    
    /**
     * Display actual message with all components
     */
    function displayActualMessage(message) {
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        const messageHTML = buildMessageHTML(message);
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
        
        // Auto-advance after user messages
        if (message.type === 'user' && !isCustomMode) {
            const scenario = window.aiScenarios[currentScenario];
            if (scenario && conversationStep < scenario.messages.length) {
                setTimeout(() => displayNextMessage(), 1000);
            }
        }
    }
    
    /**
     * Build complete message HTML
     */
    function buildMessageHTML(message) {
        const isUser = message.type === 'user';
        
        let html = `
            <div class="chat-message ${isUser ? 'user-message' : ''}" style="display: flex; gap: 10px; margin-bottom: 15px; ${isUser ? 'flex-direction: row-reverse;' : ''} animation: slideIn 0.3s ease-out;">
                <div class="chat-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}" style="width: 36px; height: 36px; background: ${isUser ? '#e2e8f0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    ${isUser ? '👤' : '🤖'}
                </div>
                <div style="max-width: 85%; ${isUser ? 'text-align: right;' : ''}">
                    <div class="chat-bubble" style="background: ${isUser ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;' : 'white;'} padding: 12px 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); ${isUser ? 'margin-left: auto;' : ''}">
                        <p style="margin: 0;">${message.text}</p>
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
        
        // Add approval
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
                    <div style="font-size: 10px; color: #94a3b8; padding: 4px 8px; ${isUser ? 'text-align: right;' : ''}">${message.timestamp || 'Just now'}</div>
        `;
        
        // Add action cards
        if (message.actions) {
            html += buildActionCardsHTML(message.actions);
        }
        
        html += '</div></div>';
        
        return html;
    }
    
    /**
     * Build autonomous actions HTML
     */
    function buildAutonomousHTML(autonomous) {
        return `
            <div style="background: #dcfce7; border-left: 4px solid #22c55e; padding: 12px; border-radius: 8px; margin-top: 12px;">
                <div style="font-weight: 600; color: #166534; margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
                    ${autonomous.title}
                </div>
                <div style="font-size: 12px; color: #166534; line-height: 1.6;">
                    ${autonomous.actions.map(action => `✓ ${action}`).join('<br>')}
                </div>
            </div>
        `;
    }
    
    /**
     * Build clarification HTML
     */
    function buildClarificationHTML(clarification) {
        return `
            <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 12px; border-radius: 8px; margin-top: 12px;">
                <div style="font-weight: 600; color: #9a3412; margin-bottom: 8px;">
                    ${clarification.title}
                </div>
                <div style="font-size: 12px; color: #7c2d12; line-height: 1.6;">
                    ${clarification.questions.join('<br>')}
                </div>
            </div>
        `;
    }
    
    /**
     * Build recommendation HTML
     */
    function buildRecommendationHTML(rec) {
        let html = `
            <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #38bdf8; border-radius: 12px; padding: 14px; margin-top: 12px;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
                    <span style="background: #38bdf8; color: white; padding: 3px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; text-transform: uppercase;">
                        ${rec.badge}
                    </span>
                    <span style="padding: 3px 6px; border-radius: 6px; font-size: 10px; font-weight: 600; background: ${rec.priority === 'high' ? '#fee2e2; color: #991b1b' : rec.priority === 'medium' ? '#fef3c7; color: #92400e' : '#dcfce7; color: #166534'};">
                        ${rec.priority.toUpperCase()} PRIORITY
                    </span>
                </div>
                <h4 style="margin: 0 0 10px 0; color: #0c4a6e; font-size: 13px;">${rec.title}</h4>
        `;
        
        // Equipment list
        if (rec.equipment) {
            rec.equipment.forEach((item, index) => {
                html += `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: white; border-radius: 6px; margin-bottom: 6px; border-left: 3px solid #38bdf8;">
                        <div style="flex: 1;">
                            <div style="font-weight: 600; color: #1e293b; font-size: 11px;">${index + 1}. ${item.name}</div>
                            <div style="font-size: 10px; color: #64748b;">${item.spec} • ${item.reason}</div>
                        </div>
                        <div style="font-size: 12px; font-weight: 700; color: #0284c7; margin-right: 8px;">×${item.qty}</div>
                    </div>
                `;
            });
        }
        
        // Sustainability metrics
        if (rec.sustainability) {
            const s = rec.sustainability;
            html += `
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-top: 10px;">
                    <div style="background: #e0f2fe; color: #075985; padding: 5px 10px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                        🌱 ${s.emission_reduction} less CO₂
                    </div>
                    <div style="background: #e0f2fe; color: #075985; padding: 5px 10px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                        ⛽ ${s.fuel_savings} saved
                    </div>
                    <div style="background: #e0f2fe; color: #075985; padding: 5px 10px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                        ♻️ ${s.carbon_offset} offset
                    </div>
                    <div style="background: #e0f2fe; color: #075985; padding: 5px 10px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                        ☀️ ${s.renewable_percentage} renewable
                    </div>
                </div>
            `;
        }
        
        // Cost summary
        if (rec.cost) {
            html += `
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 10px; padding: 12px; margin-top: 12px;">
                    <div style="font-size: 10px; color: #78350f; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 4px;">
                        ${rec.cost.label}
                    </div>
                    <div style="font-size: 22px; font-weight: 800; color: #92400e; margin-bottom: 4px;">
                        ${rec.cost.amount}
                    </div>
                    <div style="font-size: 10px; color: #78350f;">
                        ${rec.cost.details}
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }
    
    /**
     * Build comparison HTML
     */
    function buildComparisonHTML(comparison) {
        let html = '<div style="margin-top: 12px;">';
        
        comparison.options.forEach(option => {
            html += `
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border: 2px solid #38bdf8; border-radius: 10px; padding: 12px; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <h4 style="margin: 0; color: #0c4a6e; font-size: 12px; flex: 1;">${option.title}</h4>
                        <span style="padding: 3px 6px; border-radius: 6px; font-size: 9px; font-weight: 600; background: ${option.priority === 'high' ? '#fee2e2; color: #991b1b' : '#fef3c7; color: #92400e'};">
                            ${option.priority.toUpperCase()}
                        </span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-bottom: 8px;">
                        <div style="background: #e0f2fe; color: #075985; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                            💰 ${option.cost}
                        </div>
                        <div style="background: #e0f2fe; color: #075985; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                            📦 ${option.equipment_count}
                        </div>
                        <div style="background: #e0f2fe; color: #075985; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                            ⛽ ${option.fuel_cost}
                        </div>
                        <div style="background: #e0f2fe; color: #075985; padding: 4px 8px; border-radius: 6px; font-size: 10px; font-weight: 600;">
                            🌍 ${option.emissions}
                        </div>
                    </div>
                    <div style="font-size: 11px; color: #334155; line-height: 1.5;">
                        <strong style="color: #166534;">Pros:</strong> ${option.pros.join(', ')}<br>
                        <strong style="color: #991b1b;">Cons:</strong> ${option.cons.join(', ')}
                    </div>
                </div>
            `;
        });
        
        html += `
            <div style="background: #eff6ff; padding: 10px; border-radius: 8px; font-size: 11px; color: #1e40af; line-height: 1.5;">
                <strong>💡 Recommendation:</strong> ${comparison.recommendation_reason}
            </div>
        `;
        
        html += '</div>';
        return html;
    }
    
    /**
     * Build approval HTML
     */
    function buildApprovalHTML(approval) {
        return `
            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 10px 12px; border-radius: 8px; margin-top: 12px; display: flex; align-items: center; gap: 10px;">
                <div style="font-size: 20px;">${approval.icon}</div>
                <div style="flex: 1;">
                    <div style="font-weight: 600; color: #92400e; margin-bottom: 3px; font-size: 12px;">
                        ${approval.title}
                    </div>
                    <div style="font-size: 10px; color: #78350f;">
                        ${approval.subtitle}
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Build next steps HTML
     */
    function buildNextStepsHTML(nextSteps) {
        let html = `
            <div style="margin-top: 12px; background: #f8fafc; padding: 12px; border-radius: 10px;">
                <h4 style="margin: 0 0 10px 0; color: #1e293b; font-size: 12px;">${nextSteps.title}</h4>
        `;
        
        nextSteps.steps.forEach(step => {
            html += `
                <div style="display: flex; align-items: center; gap: 10px; padding: 8px; background: white; border-radius: 6px; margin-bottom: 6px;">
                    <div style="width: 26px; height: 26px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; flex-shrink: 0;">
                        ${step.step}
                    </div>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: #1e293b; font-size: 11px;">${step.task}</div>
                        <div style="font-size: 10px; color: #64748b;">${step.deadline}</div>
                    </div>
                    <div style="font-size: 9px; padding: 3px 6px; border-radius: 4px; background: ${step.status === 'scheduled' ? '#dcfce7' : '#fef3c7'}; color: ${step.status === 'scheduled' ? '#166534' : '#92400e'}; text-transform: uppercase; font-weight: 600;">
                        ${step.status}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    /**
     * Build documents HTML
     */
    function buildDocumentsHTML(documents) {
        let html = `
            <div style="margin-top: 12px;">
                <h4 style="margin: 0 0 8px 0; color: #1e293b; font-size: 11px;">📎 Documents Ready</h4>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 6px;">
        `;
        
        documents.forEach(doc => {
            html += `
                <div style="padding: 8px; background: #f8fafc; border-radius: 6px; font-size: 10px; color: #475569; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f8fafc'">
                    ${doc}
                </div>
            `;
        });
        
        html += '</div></div>';
        return html;
    }
    
    /**
     * Build action cards HTML
     */
    function buildActionCardsHTML(actions) {
        let html = '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; margin-top: 12px;">';
        
        actions.forEach(action => {
            html += `
                <div onclick="window.Chat.handleActionClick('${action.title}')" style="background: white; border: 2px solid #e2e8f0; border-radius: 10px; padding: 10px; cursor: pointer; transition: all 0.2s; text-align: center;" onmouseover="this.style.borderColor='#667eea'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='#e2e8f0'; this.style.transform='translateY(0)'">
                    <div style="font-size: 24px; margin-bottom: 6px;">${action.icon}</div>
                    <div style="font-weight: 600; color: #1e293b; margin-bottom: 3px; font-size: 11px;">${action.title}</div>
                    <div style="font-size: 9px; color: #64748b;">${action.subtitle}</div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    /**
     * Handle action card click
     */
    function handleActionClick(actionTitle) {
        console.log('Action clicked:', actionTitle);
        
        // You can add real functionality here
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        const responseHTML = `
            <div class="chat-message" style="display: flex; gap: 10px; margin-bottom: 15px; animation: slideIn 0.3s ease-out;">
                <div class="chat-avatar ai-avatar" style="width: 36px; height: 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🤖</div>
                <div class="chat-bubble" style="background: white; padding: 12px 16px; border-radius: 12px; max-width: 80%; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <p style="margin: 0;">Great choice! "${actionTitle}" functionality will be available in the full system. This would typically open a detailed view or trigger the specific action.</p>
                </div>
            </div>
        `;
        
        messagesDiv.insertAdjacentHTML('beforeend', responseHTML);
        scrollToBottom();
    }
    
    /**
     * Send a chat message (for custom mode)
     */
    function sendChatMessage() {
        const input = document.getElementById('chatInputField');
        const message = input?.value.trim();
        
        if (!message) return;
        
        // Add user message
        const userMessageHTML = `
            <div class="chat-message user-message" style="display: flex; gap: 10px; margin-bottom: 15px; flex-direction: row-reverse; animation: slideIn 0.3s ease-out;">
                <div class="chat-avatar user-avatar" style="width: 36px; height: 36px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">👤</div>
                <div style="max-width: 80%;">
                    <div class="chat-bubble" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 16px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-left: auto;">
                        <p style="margin: 0;">${window.Utils.escapeHtml(message)}</p>
                    </div>
                    <div style="font-size: 10px; color: #94a3b8; padding: 4px 8px; text-align: right;">Just now</div>
                </div>
            </div>
        `;
        
        const messagesDiv = document.getElementById('chatMessages');
        if (messagesDiv) {
            messagesDiv.insertAdjacentHTML('beforeend', userMessageHTML);
        }
        
        // Clear input
        input.value = '';
        scrollToBottom();
        
        // Show thinking indicator
        showThinkingIndicator('Analyzing your request and checking availability...');
        
        // Simulate AI response
        setTimeout(() => {
            removeThinkingIndicator();
            
            const aiMessageHTML = `
                <div class="chat-message" style="display: flex; gap: 10px; margin-bottom: 15px; animation: slideIn 0.3s ease-out;">
                    <div class="chat-avatar ai-avatar" style="width: 36px; height: 36px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">🤖</div>
                    <div class="chat-bubble" style="background: white; padding: 12px 16px; border-radius: 12px; max-width: 80%; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                        <p style="margin: 0 0 10px 0;">I'd be happy to help with that! To give you the most accurate solution, I need a few details about your event.</p>
                        <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 10px; border-radius: 6px; margin-top: 10px;">
                            <div style="font-weight: 600; color: #9a3412; margin-bottom: 6px; font-size: 11px;">❓ Tell me more:</div>
                            <div style="font-size: 11px; color: #7c2d12; line-height: 1.6;">
                                1. What type of event is this?<br>
                                2. How many attendees do you expect?<br>
                                3. What are your event dates?<br>
                                4. Indoor or outdoor venue?<br>
                                5. Any specific power requirements?
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            if (messagesDiv) {
                messagesDiv.insertAdjacentHTML('beforeend', aiMessageHTML);
            }
            scrollToBottom();
        }, 2000);
    }
    
    /**
     * Scroll chat to bottom
     */
    function scrollToBottom() {
        const messagesDiv = document.getElementById('chatMessages');
        if (messagesDiv) {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    }
    
    /**
     * Initialize chat widget
     */
    function initChat() {
        const chatInput = document.getElementById('chatInputField');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !chatInput.disabled) {
                    sendChatMessage();
                }
            });
        }
        
        console.log('✅ Chat module initialized (AI Mode: ' + (useAIMode ? 'ON' : 'OFF') + ')');
    }
    
    /**
     * Add a message to chat programmatically (backward compatibility)
     * @param {string} message - Message text
     * @param {string} sender - 'user' or 'ai'
     */
    function addChatMessage(message, sender = 'ai') {
        const isUser = sender === 'user';
        const messageObj = {
            type: isUser ? 'user' : 'ai',
            text: message,
            timestamp: 'Just now'
        };
        displayActualMessage(messageObj);
    }
    
    /**
     * Clear chat history
     */
    function clearChat() {
        const messagesDiv = document.getElementById('chatMessages');
        if (messagesDiv) {
            messagesDiv.innerHTML = '';
        }
        
        if (useAIMode) {
            initializeAIChat();
        } else {
            addChatMessage('Hi! How can I help you today?', 'ai');
        }
    }
    
    /**
     * Toggle AI mode on/off
     */
    function toggleAIMode() {
        useAIMode = !useAIMode;
        console.log('AI Mode:', useAIMode ? 'ON' : 'OFF');
        clearChat();
    }
    
    // Export to window
    window.Chat = {
        toggleChat,
        sendChatMessage,
        initChat,
        addChatMessage,
        clearChat,
        loadScenario,
        handleActionClick,
        toggleAIMode,
        enableCustomMode
    };
    
    // Make functions globally accessible for onclick attributes
    window.toggleChat = toggleChat;
    window.sendChatMessage = sendChatMessage;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
    
    console.log('✅ Chat module loaded (Enhanced with AI Assistant)');
    
})(window);