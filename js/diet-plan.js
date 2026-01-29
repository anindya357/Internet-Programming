// ===========================
// Diet Plan Functions
// ===========================

// Sample meal data
const sampleMeals = {
    breakfast: {
        name: 'Breakfast',
        time: '7:00 AM',
        icon: 'fa-mug-hot',
        calories: 450,
        items: [
            '3 eggs (scrambled or boiled)',
            '2 slices whole wheat toast',
            '1 banana',
            'Green tea or black coffee'
        ],
        macros: { protein: 25, carbs: 45, fats: 15 }
    },
    midMorning: {
        name: 'Mid-Morning Snack',
        time: '10:00 AM',
        icon: 'fa-apple-alt',
        calories: 200,
        items: [
            'Greek yogurt (200g)',
            'Mixed nuts (30g)',
            '1 apple'
        ],
        macros: { protein: 15, carbs: 20, fats: 12 }
    },
    lunch: {
        name: 'Lunch',
        time: '1:00 PM',
        icon: 'fa-utensils',
        calories: 650,
        items: [
            'Grilled chicken breast (150g)',
            'Brown rice (1 cup)',
            'Mixed vegetables',
            'Side salad with olive oil'
        ],
        macros: { protein: 45, carbs: 70, fats: 18 }
    },
    afternoon: {
        name: 'Afternoon Snack',
        time: '4:00 PM',
        icon: 'fa-cookie',
        calories: 250,
        items: [
            'Protein shake',
            'Oatmeal cookies (2)',
            '1 orange'
        ],
        macros: { protein: 20, carbs: 30, fats: 8 }
    },
    dinner: {
        name: 'Dinner',
        time: '7:30 PM',
        icon: 'fa-drumstick-bite',
        calories: 600,
        items: [
            'Grilled fish (150g)',
            'Sweet potato (medium)',
            'Steamed broccoli',
            'Quinoa (1/2 cup)'
        ],
        macros: { protein: 40, carbs: 65, fats: 15 }
    },
    evening: {
        name: 'Evening Snack',
        time: '9:30 PM',
        icon: 'fa-cheese',
        calories: 250,
        items: [
            'Cottage cheese (150g)',
            'Mixed berries',
            'Almonds (20g)'
        ],
        macros: { protein: 20, carbs: 15, fats: 12 }
    }
};

document.addEventListener('DOMContentLoaded', function() {
    loadDietPreferences();
    loadMealPlan();
    setupPreferencesForm();
    setupWeekTabs();
});

function loadDietPreferences() {
    const savedPrefs = localStorage.getItem('dietPreferences');
    
    if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs);
        
        if (prefs.dietType) document.getElementById('dietType').value = prefs.dietType;
        if (prefs.mealsPerDay) document.getElementById('mealsPerDay').value = prefs.mealsPerDay;
        if (prefs.targetCalories) document.getElementById('targetCalories').value = prefs.targetCalories;
        if (prefs.foodDislikes) document.getElementById('foodDislikes').value = prefs.foodDislikes;
        
        if (prefs.restrictions) {
            prefs.restrictions.forEach(restriction => {
                const checkbox = document.querySelector(`input[name="restrictions"][value="${restriction}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
    }
}

function loadMealPlan() {
    const container = document.getElementById('mealPlanContainer');
    
    if (!container) return;
    
    const mealsPerDay = parseInt(document.getElementById('mealsPerDay')?.value || 5);
    const mealsToShow = Object.entries(sampleMeals).slice(0, mealsPerDay);
    
    const html = mealsToShow.map(([key, meal]) => `
        <div class="meal-card">
            <div class="meal-header">
                <div class="meal-time">
                    <i class="fas ${meal.icon}"></i>
                    <div class="meal-time-info">
                        <h3>${meal.name}</h3>
                        <p>${meal.time}</p>
                    </div>
                </div>
                <div class="meal-calories">
                    <h4>${meal.calories}</h4>
                    <p>calories</p>
                </div>
            </div>
            <div class="meal-content">
                <h4>Food Items:</h4>
                <ul>
                    ${meal.items.map(item => `
                        <li>
                            <i class="fas fa-check-circle"></i>
                            <span>${item}</span>
                        </li>
                    `).join('')}
                </ul>
                <div class="meal-macros">
                    <div class="macro-item">
                        <i class="fas fa-drumstick-bite"></i>
                        <span>Protein: <strong>${meal.macros.protein}g</strong></span>
                    </div>
                    <div class="macro-item">
                        <i class="fas fa-bread-slice"></i>
                        <span>Carbs: <strong>${meal.macros.carbs}g</strong></span>
                    </div>
                    <div class="macro-item">
                        <i class="fas fa-cheese"></i>
                        <span>Fats: <strong>${meal.macros.fats}g</strong></span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

function setupPreferencesForm() {
    const form = document.getElementById('dietPreferencesForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                dietType: document.getElementById('dietType').value,
                mealsPerDay: document.getElementById('mealsPerDay').value,
                targetCalories: document.getElementById('targetCalories').value,
                restrictions: Array.from(document.querySelectorAll('input[name="restrictions"]:checked')).map(cb => cb.value),
                foodDislikes: document.getElementById('foodDislikes').value,
                lastUpdated: new Date().toISOString()
            };
            
            localStorage.setItem('dietPreferences', JSON.stringify(formData));
            
            showNotification('Diet preferences saved successfully!', 'success');
            
            // Reload meal plan with new preferences
            loadMealPlan();
        });
        
        // Update meal plan when meals per day changes
        document.getElementById('mealsPerDay').addEventListener('change', loadMealPlan);
    }
}

function setupWeekTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const dayPlanContent = document.getElementById('dayPlanContent');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load day plan
            const day = this.dataset.day;
            loadDayPlan(day);
        });
    });
    
    // Load Monday by default
    if (dayPlanContent) {
        loadDayPlan('monday');
    }
}

function loadDayPlan(day) {
    const dayPlanContent = document.getElementById('dayPlanContent');
    
    if (!dayPlanContent) return;
    
    const dayName = capitalizeFirst(day);
    
    dayPlanContent.innerHTML = `
        <h3>${dayName}'s Meal Plan</h3>
        <div style="margin-top: 1.5rem;">
            <div style="background: var(--bg-light); padding: 1.5rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
                <h4 style="margin-bottom: 0.75rem; color: var(--text-dark);">Daily Summary</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                    <div>
                        <strong style="color: var(--primary-color);">2,400</strong>
                        <p style="color: var(--text-light); font-size: 0.9rem;">Total Calories</p>
                    </div>
                    <div>
                        <strong style="color: var(--success-color);">150g</strong>
                        <p style="color: var(--text-light); font-size: 0.9rem;">Protein</p>
                    </div>
                    <div>
                        <strong style="color: var(--warning-color);">280g</strong>
                        <p style="color: var(--text-light); font-size: 0.9rem;">Carbs</p>
                    </div>
                    <div>
                        <strong style="color: var(--info-color);">65g</strong>
                        <p style="color: var(--text-light); font-size: 0.9rem;">Fats</p>
                    </div>
                </div>
            </div>
            <p style="color: var(--text-light); margin-top: 1rem;">
                <i class="fas fa-info-circle" style="color: var(--info-color);"></i>
                This meal plan is based on your fitness goals and dietary preferences. 
                Adjust portion sizes according to your hunger levels and energy needs.
            </p>
        </div>
    `;
}

function generateDietPlan() {
    showNotification('Generating personalized diet plan...', 'info');
    
    // Simulate generation
    setTimeout(() => {
        loadMealPlan();
        showNotification('New diet plan generated!', 'success');
    }, 1500);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
