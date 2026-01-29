// ===========================
// AI Instructor Functions
// ===========================

// Sample AI responses (In production, this would connect to actual AI API)
const aiResponses = {
    workout_plan: "Here's a personalized workout plan for chest and triceps:\n\n**Warm-up (5-10 minutes):**\n- Light cardio (treadmill/bike)\n- Dynamic stretches\n\n**Main Workout:**\n1. Barbell Bench Press - 4 sets x 8-10 reps\n2. Incline Dumbbell Press - 3 sets x 10-12 reps\n3. Cable Flyes - 3 sets x 12-15 reps\n4. Tricep Dips - 3 sets x 10-12 reps\n5. Tricep Pushdowns - 3 sets x 12-15 reps\n6. Overhead Tricep Extension - 3 sets x 12 reps\n\n**Cool-down:**\n- Light stretching for chest and arms\n\nRemember to rest 60-90 seconds between sets!",
    
    equipment_guide: "The bench press is one of the most effective exercises for building chest strength. Here's how to use it properly:\n\n**Setup:**\n1. Lie flat on the bench with feet firmly on the floor\n2. Position yourself so the bar is above your eyes\n3. Grip the bar slightly wider than shoulder-width\n\n**Execution:**\n1. Unrack the bar and hold it directly above your chest\n2. Lower the bar slowly to mid-chest (touch lightly)\n3. Press the bar back up explosively\n4. Keep your shoulder blades retracted throughout\n\n**Safety Tips:**\n- Always use a spotter for heavy weights\n- Keep your wrists straight\n- Don't bounce the bar off your chest\n- Breathe out when pressing up\n\nStart with lighter weights to master the form!",
    
    injury_prevention: "For lower back pain prevention during workouts:\n\n**Key Exercises:**\n1. **Cat-Cow Stretches** - Great for spine mobility\n2. **Bird Dogs** - Strengthens core and lower back\n3. **Dead Bugs** - Builds core stability\n4. **Planks** - Overall core strengthening\n5. **Glute Bridges** - Strengthens posterior chain\n\n**General Tips:**\n- Always engage your core during exercises\n- Avoid excessive spinal flexion/extension\n- Start with bodyweight before adding resistance\n- Focus on proper form over heavy weights\n- Strengthen your core and glutes\n- Stretch hip flexors regularly\n\n**When to Avoid:**\nIf you experience sharp pain, stop immediately and consult a healthcare professional. Some exercises to be cautious with:\n- Heavy deadlifts without proper form\n- Sit-ups with poor technique\n- Hyperextensions without control\n\nWould you like specific modifications for any exercises?",
    
    warmup: "Here's an effective warm-up routine (8-10 minutes):\n\n**Cardio (3-4 minutes):**\n- Light jogging on treadmill or\n- Cycling at moderate pace or\n- Jumping jacks\n\n**Dynamic Stretches:**\n1. **Arm Circles** - 10 forward, 10 backward\n2. **Leg Swings** - 10 each leg (forward/back, side to side)\n3. **Hip Circles** - 10 each direction\n4. **Torso Twists** - 15-20 reps\n5. **Walking Lunges** - 10 each leg\n6. **Inchworms** - 5-8 reps\n7. **High Knees** - 30 seconds\n8. **Butt Kicks** - 30 seconds\n\n**Sport-Specific:**\nAdd light sets of your first exercise (50% weight, 8-10 reps) before going heavy.\n\nRemember: Never skip warm-up! It reduces injury risk and improves performance.",
    
    progressive_overload: "Progressive overload is key to continuous gains! Here are proven strategies:\n\n**1. Increase Weight**\n- Add 2.5-5kg when you can complete all sets/reps\n- Use microplates for smaller increments\n- Track your lifts consistently\n\n**2. Increase Volume**\n- Add extra sets (3 → 4 sets)\n- Add extra reps (8 → 10 reps)\n- Add more exercises for muscle group\n\n**3. Increase Frequency**\n- Train muscle group 2-3x per week\n- Allow proper recovery between sessions\n\n**4. Improve Form & Tempo**\n- Slow down eccentric phase (3-4 seconds)\n- Control the movement throughout\n- Achieve full range of motion\n\n**5. Reduce Rest Time**\n- Gradually decrease rest periods (90s → 60s)\n- Maintain intensity and form\n\n**6. Increase Training Density**\n- Complete same work in less time\n- Add supersets or circuits\n\n**Important Rules:**\n- Progress gradually (5-10% increase)\n- Listen to your body\n- Prioritize recovery\n- Track everything in a log\n- Deload every 4-6 weeks\n\nWhich method would you like to implement first?"
};

let chatHistory = [];

document.addEventListener('DOMContentLoaded', function() {
    setupChatForm();
    setupQuickPrompts();
    adjustTextareaHeight();
});

function setupChatForm() {
    const chatForm = document.getElementById('chatForm');
    const chatInput = document.getElementById('chatInput');
    
    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = chatInput.value.trim();
            
            if (message) {
                sendMessage(message);
                chatInput.value = '';
                chatInput.style.height = 'auto';
            }
        });
        
        // Auto-resize textarea
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

function setupQuickPrompts() {
    const promptButtons = document.querySelectorAll('.prompt-btn');
    
    promptButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            sendQuickPrompt(message);
        });
    });
}

function sendQuickPrompt(message) {
    sendMessage(message);
}

function sendMessage(message) {
    // Add user message to chat
    addMessageToChat(message, 'user');
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = generateAIResponse(message);
        addMessageToChat(response, 'ai');
    }, 1500);
    
    // Store in history
    chatHistory.push({
        role: 'user',
        message: message,
        timestamp: new Date()
    });
}

function generateAIResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('workout plan') || lowerMessage.includes('exercise plan')) {
        return aiResponses.workout_plan;
    } else if (lowerMessage.includes('bench press') || lowerMessage.includes('how to use') || lowerMessage.includes('equipment')) {
        return aiResponses.equipment_guide;
    } else if (lowerMessage.includes('injury') || lowerMessage.includes('pain') || lowerMessage.includes('prevent')) {
        return aiResponses.injury_prevention;
    } else if (lowerMessage.includes('warm') || lowerMessage.includes('stretch')) {
        return aiResponses.warmup;
    } else if (lowerMessage.includes('progressive') || lowerMessage.includes('overload') || lowerMessage.includes('progress')) {
        return aiResponses.progressive_overload;
    } else {
        return "I'm here to help with your fitness journey! I can assist you with:\n\n• Creating workout plans\n• Explaining proper exercise form\n• Equipment usage guidance\n• Injury prevention tips\n• Warm-up and cool-down routines\n• Progressive overload strategies\n• Workout programming\n\nWhat specific fitness topic would you like to discuss?";
    }
}

function addMessageToChat(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === 'ai' ? 'robot' : 'user'}"></i>
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">${sender === 'ai' ? 'AI Instructor' : 'You'}</span>
                <span class="message-time">${timeString}</span>
            </div>
            <div class="message-text">
                ${formatMessageText(message)}
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Store in history
    chatHistory.push({
        role: sender,
        message: message,
        timestamp: now
    });
}

function formatMessageText(text) {
    // Convert line breaks to paragraphs
    let formatted = text.split('\n\n').map(para => {
        if (para.trim().startsWith('**') && para.includes(':**')) {
            // Bold headers
            return '<p><strong>' + para.replace(/\*\*/g, '') + '</strong></p>';
        } else if (para.trim().match(/^\d+\./)) {
            // Numbered lists
            const items = para.split('\n').map(line => {
                if (line.trim().match(/^\d+\./)) {
                    return '<li>' + line.replace(/^\d+\.\s*/, '') + '</li>';
                }
                return line;
            }).join('');
            return '<ol>' + items + '</ol>';
        } else if (para.trim().startsWith('-') || para.trim().startsWith('•')) {
            // Bullet lists
            const items = para.split('\n').map(line => {
                if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                    return '<li>' + line.replace(/^[-•]\s*/, '') + '</li>';
                }
                return line;
            }).join('');
            return '<ul>' + items + '</ul>';
        } else {
            return '<p>' + para + '</p>';
        }
    }).join('');
    
    // Bold text with **
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    return formatted;
}

function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'flex';
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

function adjustTextareaHeight() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.style.height = 'auto';
    }
}
