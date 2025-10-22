// ==========================
// CHAT MODULE
// AI chat widget functionality
// ==========================

(function(window) {
    'use strict';
    
    /**
     * Toggle chat window visibility
     */
    function toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        if (chatWindow) {
            chatWindow.classList.toggle('open');
        }
    }
    
    /**
     * Send a chat message
     */
    function sendChatMessage() {
        const input = document.getElementById('chatInputField');
        const message = input?.value.trim();
        
        if (!message) return;
        
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        // Add user message
        const userMessageHTML = `
            <div class="chat-message user-message" style="flex-direction: row-reverse;">
                <div class="chat-avatar user-avatar">👤</div>
                <div class="chat-bubble">${window.Utils.escapeHtml(message)}</div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', userMessageHTML);
        
        // Clear input
        input.value = '';
        
        // Scroll to bottom
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
        
        // Simulate AI response
        setTimeout(() => {
            const aiMessageHTML = `
                <div class="chat-message">
                    <div class="chat-avatar ai-avatar">🤖</div>
                    <div class="chat-bubble">
                        I'd be happy to help! Let me look that up for you right away. One moment...
                    </div>
                </div>
            `;
            messagesDiv.insertAdjacentHTML('beforeend', aiMessageHTML);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 1000);
    }
    
    /**
     * Initialize chat widget
     */
    function initChat() {
        const chatInput = document.getElementById('chatInputField');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
        
        console.log('✅ Chat module initialized');
    }
    
    /**
     * Add a message to chat programmatically
     * @param {string} message - Message text
     * @param {string} sender - 'user' or 'ai'
     */
    function addChatMessage(message, sender = 'ai') {
        const messagesDiv = document.getElementById('chatMessages');
        if (!messagesDiv) return;
        
        const isUser = sender === 'user';
        const messageHTML = `
            <div class="chat-message ${isUser ? 'user-message' : ''}" ${isUser ? 'style="flex-direction: row-reverse;"' : ''}>
                <div class="chat-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}">${isUser ? '👤' : '🤖'}</div>
                <div class="chat-bubble">${window.Utils.escapeHtml(message)}</div>
            </div>
        `;
        messagesDiv.insertAdjacentHTML('beforeend', messageHTML);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
    
    /**
     * Clear chat history
     */
    function clearChat() {
        const messagesDiv = document.getElementById('chatMessages');
        if (messagesDiv) {
            messagesDiv.innerHTML = `
                <div class="chat-message">
                    <div class="chat-avatar ai-avatar">🤖</div>
                    <div class="chat-bubble">
                        Hi! I'm NOVA, your AI assistant. How can I help you today?
                    </div>
                </div>
            `;
        }
    }
    
    // Export to window
    window.Chat = {
        toggleChat,
        sendChatMessage,
        initChat,
        addChatMessage,
        clearChat
    };
    
    // Make toggleChat globally accessible for onclick attributes
    window.toggleChat = toggleChat;
    window.sendChatMessage = sendChatMessage;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChat);
    } else {
        initChat();
    }
    
    console.log('✅ Chat module loaded');
    
})(window);