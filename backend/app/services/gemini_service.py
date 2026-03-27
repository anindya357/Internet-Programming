"""
Gemini AI Service for Fitness Assistant
"""
import google.generativeai as genai
from app.core.config import settings
from typing import Optional, List
import os

class GeminiService:
    """Service for interacting with Gemini AI"""
    
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model = None
        self._configure()
    
    def _configure(self):
        """Configure the Gemini API"""
        if self.api_key:
            genai.configure(api_key=self.api_key)
            # Use gemini-pro as it's the most stable and widely available model
            self.model = genai.GenerativeModel('gemini-2.5-flash')
    
    def _get_system_prompt(self, context: Optional[str] = None) -> str:
        """Get the system prompt for the fitness assistant"""
        base_prompt = """You are FitTrack AI, a knowledgeable and friendly fitness instructor assistant for the FitTrack CUET gymnasium. 
Your role is to help gym members with:

1. **Workout Guidance**: Exercise techniques, workout plans, training schedules, and proper form
2. **Diet & Nutrition**: Meal planning, nutritional advice, macros, supplements, and healthy eating habits
3. **Health & Fitness**: General fitness tips, injury prevention, recovery strategies, and motivation
4. **Equipment Usage**: How to properly use gym equipment, safety tips, and alternative exercises
5. **Goal Achievement**: Personalized advice for weight loss, muscle gain, endurance improvement, etc.

Guidelines:
- Be encouraging and supportive
- Provide evidence-based advice when possible
- Always prioritize safety and recommend consulting healthcare professionals for medical concerns
- Keep responses concise but informative
- Use bullet points or numbered lists for clarity when appropriate
- Be specific and actionable in your recommendations

IMPORTANT: You are NOT a medical professional. Always advise users to consult with healthcare providers for medical issues, injuries, or health conditions."""

        context_prompts = {
            "workout": "\n\nThe user is asking about workouts and exercises. Focus on exercise techniques, workout plans, sets, reps, and training advice.",
            "diet": "\n\nThe user is asking about diet and nutrition. Focus on meal planning, macros, calorie intake, and healthy eating advice.",
            "injury": "\n\nThe user is asking about an injury or pain. Be cautious, recommend rest if appropriate, and strongly advise consulting a healthcare professional.",
            "equipment": "\n\nThe user is asking about gym equipment. Focus on proper usage, safety, and effective exercises with the equipment.",
            "general": "\n\nProvide general fitness guidance and motivation."
        }
        
        if context and context.lower() in context_prompts:
            return base_prompt + context_prompts[context.lower()]
        
        return base_prompt + context_prompts["general"]
    
    async def get_response(
        self, 
        question: str, 
        context: Optional[str] = None,
        chat_history: Optional[List[dict]] = None
    ) -> str:
        """Get a response from Gemini AI"""
        if not self.model:
            return "AI service is not configured. Please check the API key configuration."
        
        try:
            # Build the prompt
            system_prompt = self._get_system_prompt(context)
            
            # Build conversation history if provided
            conversation = ""
            if chat_history:
                for msg in chat_history[-5:]:  # Last 5 messages for context
                    conversation += f"User: {msg.get('user_message', '')}\n"
                    conversation += f"Assistant: {msg.get('ai_response', '')}\n\n"
            
            full_prompt = f"""{system_prompt}

{conversation}User: {question}

Please provide a helpful, accurate, and encouraging response."""

            # Generate response
            response = self.model.generate_content(full_prompt)
            
            if response.text:
                return response.text.strip()
            else:
                return "I apologize, but I couldn't generate a response. Please try rephrasing your question."
                
        except Exception as e:
            error_msg = str(e)
            if "quota" in error_msg.lower():
                return "The AI service has reached its usage limit. Please try again later."
            elif "api_key" in error_msg.lower() or "invalid" in error_msg.lower():
                return "AI service configuration error. Please contact support."
            else:
                return f"I encountered an issue while processing your request. Please try again. Error: {error_msg}"
    
    def get_quick_suggestions(self, context: Optional[str] = None) -> List[str]:
        """Get quick suggestion prompts based on context"""
        suggestions = {
            "workout": [
                "What's a good beginner full-body workout?",
                "How do I improve my bench press form?",
                "Create a 3-day split workout plan",
                "What exercises target the core?"
            ],
            "diet": [
                "How much protein should I eat daily?",
                "What are good pre-workout meals?",
                "Help me plan a high-protein diet",
                "What should I eat for muscle recovery?"
            ],
            "injury": [
                "How do I prevent shoulder injuries?",
                "What stretches help with lower back pain?",
                "How long should I rest after a muscle strain?",
                "Best exercises for injury recovery"
            ],
            "equipment": [
                "How do I use the cable machine properly?",
                "What exercises can I do with dumbbells?",
                "How to use the leg press safely?",
                "Best machines for beginners"
            ],
            "general": [
                "How do I start my fitness journey?",
                "What's the best time to work out?",
                "How often should I exercise?",
                "Tips for staying motivated"
            ]
        }
        
        return suggestions.get(context, suggestions["general"])


# Singleton instance
gemini_service = GeminiService()
