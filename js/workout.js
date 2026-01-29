// ===========================
// Workout History Functions
// ===========================

// Sample workout data
let workouts = [
    {
        id: 1,
        date: '2026-01-27',
        type: 'strength',
        focusArea: 'chest',
        duration: 45,
        intensity: 'high',
        exercises: [
            { name: 'Bench Press', sets: 4, reps: 10, weight: 60 },
            { name: 'Incline Dumbbell Press', sets: 3, reps: 12, weight: 25 },
            { name: 'Cable Flyes', sets: 3, reps: 15, weight: 20 },
            { name: 'Tricep Pushdowns', sets: 3, reps: 12, weight: 30 }
        ],
        notes: 'Great session! Felt strong today.'
    },
    {
        id: 2,
        date: '2026-01-25',
        type: 'cardio',
        focusArea: 'full-body',
        duration: 30,
        intensity: 'medium',
        exercises: [
            { name: 'Treadmill Running', sets: 1, reps: 30, weight: 0 }
        ],
        notes: 'Good cardio session to start the day.'
    },
    {
        id: 3,
        date: '2026-01-24',
        type: 'strength',
        focusArea: 'legs',
        duration: 60,
        intensity: 'high',
        exercises: [
            { name: 'Squats', sets: 4, reps: 8, weight: 80 },
            { name: 'Leg Press', sets: 3, reps: 12, weight: 120 },
            { name: 'Leg Curls', sets: 3, reps: 12, weight: 40 },
            { name: 'Calf Raises', sets: 4, reps: 15, weight: 50 }
        ],
        notes: 'Tough leg day but very productive.'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    loadWorkouts();
    setupFilters();
    
    // Set today's date as default
    const dateInput = document.getElementById('workoutDate');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }
});

function loadWorkouts() {
    const workoutList = document.getElementById('workoutList');
    
    if (!workoutList) return;
    
    if (workouts.length === 0) {
        workoutList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #64748b;">
                <i class="fas fa-dumbbell" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>No workouts logged yet. Start tracking your fitness journey!</p>
            </div>
        `;
        return;
    }
    
    const html = workouts.map(workout => `
        <div class="workout-item">
            <div class="workout-header">
                <div class="workout-title">
                    <div class="workout-type-icon">
                        <i class="fas fa-${workout.type === 'cardio' ? 'running' : 'dumbbell'}"></i>
                    </div>
                    <div class="workout-title-text">
                        <h3>${capitalizeFirst(workout.focusArea)} ${capitalizeFirst(workout.type)}</h3>
                        <span class="workout-date">${formatDate(workout.date)}</span>
                    </div>
                </div>
                <div class="workout-actions">
                    <button class="btn-icon" onclick="viewWorkout(${workout.id})" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteWorkout(${workout.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="workout-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span><strong>${workout.duration}</strong> minutes</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-fire"></i>
                    <span>Intensity: <strong>${capitalizeFirst(workout.intensity)}</strong></span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-list"></i>
                    <span><strong>${workout.exercises.length}</strong> exercises</span>
                </div>
            </div>
            
            <div class="workout-exercises">
                ${workout.exercises.map(ex => `
                    <span class="exercise-tag">${ex.name}</span>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    workoutList.innerHTML = html;
}

function setupFilters() {
    const dateFilter = document.getElementById('dateFilter');
    const typeFilter = document.getElementById('typeFilter');
    const searchInput = document.getElementById('searchWorkout');
    
    if (dateFilter) {
        dateFilter.addEventListener('change', applyFilters);
    }
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
}

function applyFilters() {
    // This is a simplified version - in production, you'd filter the workouts array
    showNotification('Filters applied', 'success');
}

function openWorkoutModal() {
    const modal = document.getElementById('workoutModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeWorkoutModal() {
    const modal = document.getElementById('workoutModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function addExerciseField() {
    const exerciseList = document.getElementById('exerciseList');
    const newExercise = document.createElement('div');
    newExercise.className = 'exercise-item';
    newExercise.innerHTML = `
        <input type="text" placeholder="Exercise name" class="exercise-name" required>
        <input type="number" placeholder="Sets" class="exercise-sets" min="1" required>
        <input type="number" placeholder="Reps" class="exercise-reps" min="1" required>
        <input type="number" placeholder="Weight (kg)" class="exercise-weight" min="0">
    `;
    exerciseList.appendChild(newExercise);
}

function viewWorkout(id) {
    const workout = workouts.find(w => w.id === id);
    if (workout) {
        alert(`Workout Details:\n\nDate: ${formatDate(workout.date)}\nType: ${workout.type}\nDuration: ${workout.duration} min\nExercises: ${workout.exercises.length}\n\nNotes: ${workout.notes || 'No notes'}`);
    }
}

function deleteWorkout(id) {
    if (confirm('Are you sure you want to delete this workout?')) {
        workouts = workouts.filter(w => w.id !== id);
        loadWorkouts();
        showNotification('Workout deleted successfully', 'success');
    }
}

// Handle workout form submission
document.addEventListener('DOMContentLoaded', function() {
    const workoutForm = document.getElementById('workoutForm');
    
    if (workoutForm) {
        workoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                id: Date.now(),
                date: document.getElementById('workoutDate').value,
                type: document.getElementById('workoutType').value,
                focusArea: document.getElementById('focusArea').value,
                duration: parseInt(document.getElementById('duration').value),
                intensity: document.querySelector('input[name="intensity"]:checked')?.value,
                exercises: [],
                notes: document.getElementById('notes').value
            };
            
            // Collect exercises
            const exerciseItems = document.querySelectorAll('.exercise-item');
            exerciseItems.forEach(item => {
                const name = item.querySelector('.exercise-name').value;
                const sets = parseInt(item.querySelector('.exercise-sets').value);
                const reps = parseInt(item.querySelector('.exercise-reps').value);
                const weight = parseInt(item.querySelector('.exercise-weight').value || 0);
                
                if (name && sets && reps) {
                    formData.exercises.push({ name, sets, reps, weight });
                }
            });
            
            // Add to workouts array
            workouts.unshift(formData);
            
            // Reload workouts
            loadWorkouts();
            
            // Close modal and reset form
            closeWorkoutModal();
            workoutForm.reset();
            
            showNotification('Workout logged successfully!', 'success');
        });
    }
});

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
