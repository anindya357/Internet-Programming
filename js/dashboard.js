// ===========================
// Dashboard Functions
// ===========================

// Sample equipment data
const equipmentData = [
    { id: 1, name: 'Treadmill', category: 'cardio', quantity: 8, available: 5, icon: 'fa-running' },
    { id: 2, name: 'Exercise Bike', category: 'cardio', quantity: 6, available: 4, icon: 'fa-bicycle' },
    { id: 3, name: 'Elliptical Machine', category: 'cardio', quantity: 4, available: 2, icon: 'fa-heartbeat' },
    { id: 4, name: 'Bench Press', category: 'strength', quantity: 5, available: 3, icon: 'fa-weight-hanging' },
    { id: 5, name: 'Squat Rack', category: 'strength', quantity: 3, available: 2, icon: 'fa-dumbbell' },
    { id: 6, name: 'Lat Pulldown', category: 'strength', quantity: 4, available: 4, icon: 'fa-dumbbell' },
    { id: 7, name: 'Leg Press', category: 'strength', quantity: 3, available: 1, icon: 'fa-dumbbell' },
    { id: 8, name: 'Cable Machine', category: 'strength', quantity: 4, available: 3, icon: 'fa-dumbbell' },
    { id: 9, name: 'Dumbbells (5-50kg)', category: 'free-weights', quantity: 20, available: 18, icon: 'fa-weight' },
    { id: 10, name: 'Barbells', category: 'free-weights', quantity: 10, available: 7, icon: 'fa-weight' },
    { id: 11, name: 'Kettlebells', category: 'free-weights', quantity: 15, available: 12, icon: 'fa-weight' },
    { id: 12, name: 'Weight Plates', category: 'free-weights', quantity: 50, available: 35, icon: 'fa-weight' }
];

document.addEventListener('DOMContentLoaded', function() {
    loadEquipment();
    setupEquipmentFilters();
});

function loadEquipment(filter = 'all') {
    const equipmentGrid = document.getElementById('equipmentGrid');
    
    if (!equipmentGrid) return;
    
    // Filter equipment
    let filteredEquipment = equipmentData;
    if (filter !== 'all') {
        filteredEquipment = equipmentData.filter(item => item.category === filter);
    }
    
    // Generate HTML
    const html = filteredEquipment.map(item => `
        <div class="equipment-card">
            <div class="equipment-header">
                <div class="equipment-icon">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="equipment-info">
                    <h3>${item.name}</h3>
                    <span class="equipment-category">${capitalizeFirst(item.category.replace('-', ' '))}</span>
                </div>
            </div>
            <div class="equipment-details">
                <div class="equipment-detail">
                    <span>Total Units</span>
                    <span>${item.quantity}</span>
                </div>
                <div class="equipment-detail">
                    <span>Available</span>
                    <span class="availability ${item.available > 0 ? 'available' : 'in-use'}">
                        ${item.available} ${item.available > 0 ? 'Available' : 'In Use'}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    equipmentGrid.innerHTML = html;
}

function setupEquipmentFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Load filtered equipment
            const category = this.dataset.category;
            loadEquipment(category);
        });
    });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
