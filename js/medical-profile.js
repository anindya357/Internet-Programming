// ===========================
// Medical Profile Functions
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    loadMedicalProfile();
    setupBMICalculator();
    setupAllergyToggle();
    setupFormSubmission();
});

function loadMedicalProfile() {
    const savedProfile = localStorage.getItem('medicalProfile');
    
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        populateForm(profile);
    }
}

function populateForm(profile) {
    // Basic info
    if (profile.age) document.getElementById('age').value = profile.age;
    if (profile.gender) document.getElementById('gender').value = profile.gender;
    if (profile.height) document.getElementById('height').value = profile.height;
    if (profile.weight) document.getElementById('weight').value = profile.weight;
    if (profile.bloodGroup) document.getElementById('bloodGroup').value = profile.bloodGroup;
    
    // Medical history
    if (profile.conditions) {
        profile.conditions.forEach(condition => {
            const checkbox = document.querySelector(`input[name="conditions"][value="${condition}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    if (profile.conditionsDetails) document.getElementById('conditionsDetails').value = profile.conditionsDetails;
    if (profile.pastInjuries) document.getElementById('pastInjuries').value = profile.pastInjuries;
    if (profile.currentMedications) document.getElementById('currentMedications').value = profile.currentMedications;
    
    // Allergies
    if (profile.hasAllergies) {
        document.querySelector(`input[name="hasAllergies"][value="${profile.hasAllergies}"]`).checked = true;
        if (profile.hasAllergies === 'yes') {
            document.getElementById('allergyDetailsGroup').style.display = 'block';
            if (profile.allergyDetails) document.getElementById('allergyDetails').value = profile.allergyDetails;
        }
    }
    
    // Fitness goals
    if (profile.fitnessGoal) document.getElementById('fitnessGoal').value = profile.fitnessGoal;
    if (profile.physicalLimitations) document.getElementById('physicalLimitations').value = profile.physicalLimitations;
    if (profile.fitnessLevel) document.getElementById('fitnessLevel').value = profile.fitnessLevel;
    
    // Emergency contact
    if (profile.emergencyName) document.getElementById('emergencyName').value = profile.emergencyName;
    if (profile.emergencyRelation) document.getElementById('emergencyRelation').value = profile.emergencyRelation;
    if (profile.emergencyPhone) document.getElementById('emergencyPhone').value = profile.emergencyPhone;
}

function setupBMICalculator() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiInput = document.getElementById('bmi');
    
    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);
        
        if (height && weight && height > 0 && weight > 0) {
            const heightInMeters = height / 100;
            const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            
            let category = '';
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';
            
            bmiInput.value = `${bmi} (${category})`;
        } else {
            bmiInput.value = '';
        }
    }
    
    if (heightInput && weightInput) {
        heightInput.addEventListener('input', calculateBMI);
        weightInput.addEventListener('input', calculateBMI);
    }
}

function setupAllergyToggle() {
    const allergyRadios = document.querySelectorAll('input[name="hasAllergies"]');
    const allergyDetailsGroup = document.getElementById('allergyDetailsGroup');
    
    allergyRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'yes') {
                allergyDetailsGroup.style.display = 'block';
            } else {
                allergyDetailsGroup.style.display = 'none';
            }
        });
    });
}

function setupFormSubmission() {
    const form = document.getElementById('medicalProfileForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                age: document.getElementById('age').value,
                gender: document.getElementById('gender').value,
                height: document.getElementById('height').value,
                weight: document.getElementById('weight').value,
                bmi: document.getElementById('bmi').value,
                bloodGroup: document.getElementById('bloodGroup').value,
                conditions: Array.from(document.querySelectorAll('input[name="conditions"]:checked')).map(cb => cb.value),
                conditionsDetails: document.getElementById('conditionsDetails').value,
                pastInjuries: document.getElementById('pastInjuries').value,
                currentMedications: document.getElementById('currentMedications').value,
                hasAllergies: document.querySelector('input[name="hasAllergies"]:checked')?.value,
                allergyDetails: document.getElementById('allergyDetails').value,
                fitnessGoal: document.getElementById('fitnessGoal').value,
                physicalLimitations: document.getElementById('physicalLimitations').value,
                fitnessLevel: document.getElementById('fitnessLevel').value,
                emergencyName: document.getElementById('emergencyName').value,
                emergencyRelation: document.getElementById('emergencyRelation').value,
                emergencyPhone: document.getElementById('emergencyPhone').value,
                lastUpdated: new Date().toISOString()
            };
            
            // Save to localStorage
            localStorage.setItem('medicalProfile', JSON.stringify(formData));
            
            showNotification('Medical profile saved successfully!', 'success');
            
            // Optionally redirect
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
}
