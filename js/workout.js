// ===========================
// Workout History Functions
// ===========================

// Workouts data loaded from API
let workouts = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    loadWorkouts();
    setupFilters();
    
    // Set today's date as default
    const dateInput = document.getElementById('workoutDate');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }
});

async function loadWorkouts(filters = {}) {
    const workoutList = document.getElementById('workoutList');
    
    if (!workoutList) return;
    
    // Show loading
    workoutList.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading workouts...</div>';
    
    try {
        const response = await api.getWorkouts(filters);
        workouts = response.workouts || [];
        
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
                            <i class="fas fa-${workout.workout_type === 'cardio' ? 'running' : 'dumbbell'}"></i>
                        </div>
                        <div class="workout-title-text">
                            <h3>${capitalizeFirst(workout.focus_area || 'General')} ${capitalizeFirst(workout.workout_type || 'Workout')}</h3>
                            <span class="workout-date">${formatDate(workout.created_at)}</span>
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
                        <span><strong>${workout.duration || 0}</strong> minutes</span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-fire"></i>
                        <span>Intensity: <strong>${capitalizeFirst(workout.intensity || 'medium')}</strong></span>
                    </div>
                    <div class="meta-item">
                        <i class="fas fa-list"></i>
                        <span><strong>${(workout.exercises || []).length}</strong> exercises</span>
                    </div>
                </div>
                
                <div class="workout-exercises">
                    ${(workout.exercises || []).map(ex => `
                        <span class="exercise-tag">${ex.name}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');
        
        workoutList.innerHTML = html;
    } catch (error) {
        console.error('Error loading workouts:', error);
        workoutList.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: #dc2626;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p>Failed to load workouts. Please try again.</p>
            </div>
        `;
    }
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

async function viewWorkout(id) {
    try {
        const workout = await api.getWorkout(id);
        if (workout) {
            const exerciseList = (workout.exercises || [])
                .map(ex => `- ${ex.name}: ${ex.sets} sets x ${ex.reps} reps${ex.weight ? ` @ ${ex.weight}kg` : ''}`)
                .join('\n');
            
            alert(`Workout Details:\n\nName: ${workout.name || 'Unnamed'}\nDate: ${formatDate(workout.created_at)}\nType: ${workout.workout_type || 'General'}\nDuration: ${workout.duration || 0} min\nIntensity: ${workout.intensity || 'medium'}\n\nExercises:\n${exerciseList || 'No exercises'}\n\nNotes: ${workout.notes || 'No notes'}`);
        }
    } catch (error) {
        showNotification('Failed to load workout details', 'error');
    }
}

async function deleteWorkout(id) {
    if (confirm('Are you sure you want to delete this workout?')) {
        try {
            await api.deleteWorkout(id);
            await loadWorkouts();
            showNotification('Workout deleted successfully', 'success');
        } catch (error) {
            showNotification('Failed to delete workout', 'error');
        }
    }
}

// Handle workout form submission
document.addEventListener('DOMContentLoaded', function() {
    const workoutForm = document.getElementById('workoutForm');
    
    if (workoutForm) {
        workoutForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = workoutForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            
            try {
                // Collect form data
                const formData = {
                    name: document.getElementById('workoutName')?.value || `${document.getElementById('focusArea').value} Workout`,
                    workout_type: document.getElementById('workoutType').value,
                    focus_area: document.getElementById('focusArea').value,
                    duration: parseInt(document.getElementById('duration').value),
                    intensity: document.querySelector('input[name="intensity"]:checked')?.value || 'medium',
                    exercises: [],
                    notes: document.getElementById('notes').value
                };
                
                // Collect exercises
                const exerciseItems = document.querySelectorAll('.exercise-item');
                exerciseItems.forEach((item, idx) => {
                    const name = item.querySelector('.exercise-name').value;
                    const sets = parseInt(item.querySelector('.exercise-sets').value);
                    const reps = parseInt(item.querySelector('.exercise-reps').value);
                    const weight = parseFloat(item.querySelector('.exercise-weight').value || 0);
                    
                    if (name && sets && reps) {
                        formData.exercises.push({ name, sets, reps, weight, order: idx });
                    }
                });
                
                // Call API
                await api.createWorkout(formData);
                
                // Reload workouts
                await loadWorkouts();
                
                // Close modal and reset form
                closeWorkoutModal();
                workoutForm.reset();
                
                showNotification('Workout logged successfully!', 'success');
            } catch (error) {
                showNotification(error.message || 'Failed to save workout', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }
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
