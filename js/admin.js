// ===========================
// Admin Dashboard Functions
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    setupGymStatusControl();
    setupAddEquipmentModal();
    loadActivityData();
});

function setupGymStatusControl() {
    const gymStatusToggle = document.getElementById('gymStatus');
    const statusText = document.querySelector('.status-text');
    
    if (gymStatusToggle && statusText) {
        gymStatusToggle.addEventListener('change', function() {
            if (this.checked) {
                statusText.textContent = 'Gym is currently Open';
                statusText.classList.add('open');
                statusText.classList.remove('closed');
                showNotification('Gym status changed to Open', 'success');
            } else {
                statusText.textContent = 'Gym is currently Closed';
                statusText.classList.remove('open');
                statusText.classList.add('closed');
                showNotification('Gym status changed to Closed', 'info');
            }
        });
    }
}

function setupAddEquipmentModal() {
    const form = document.getElementById('addEquipmentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('equipmentName').value,
                category: document.getElementById('equipmentCategory').value,
                quantity: document.getElementById('equipmentQuantity').value,
                description: document.getElementById('equipmentDescription').value,
                dateAdded: new Date().toISOString()
            };
            
            // In production, this would send data to backend
            console.log('Adding equipment:', formData);
            
            showNotification('Equipment added successfully!', 'success');
            closeAddEquipmentModal();
            form.reset();
        });
    }
}

function openAddEquipmentModal() {
    const modal = document.getElementById('addEquipmentModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAddEquipmentModal() {
    const modal = document.getElementById('addEquipmentModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function loadActivityData() {
    // This would load real-time activity data in production
    // For now, it's using static HTML in the page
    console.log('Activity data loaded');
}

// Filter equipment
const searchInput = document.querySelector('.equipment-filters .search-input');
const categoryFilter = document.querySelectorAll('.equipment-filters .filter-select')[0];
const statusFilter = document.querySelectorAll('.equipment-filters .filter-select')[1];

if (searchInput) {
    searchInput.addEventListener('input', filterEquipment);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterEquipment);
}

if (statusFilter) {
    statusFilter.addEventListener('change', filterEquipment);
}

function filterEquipment() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || 'All Categories';
    const status = statusFilter?.value || 'All Status';
    
    // In production, this would filter the equipment table
    console.log('Filtering:', { searchTerm, category, status });
    showNotification('Filters applied', 'info');
}

// Handle delete equipment
function deleteEquipment(id) {
    if (confirm('Are you sure you want to delete this equipment?')) {
        // In production, this would call backend API
        showNotification('Equipment deleted successfully!', 'success');
    }
}

// Handle edit equipment
function editEquipment(id) {
    // In production, this would open a modal with equipment data
    showNotification('Edit equipment functionality', 'info');
}

// Post announcement
document.addEventListener('DOMContentLoaded', function() {
    const postButton = document.querySelector('.control-item .btn-sm');
    const announcementInput = document.querySelector('.announcement-input');
    
    if (postButton && announcementInput) {
        postButton.addEventListener('click', function() {
            const announcement = announcementInput.value.trim();
            
            if (announcement) {
                // In production, this would send to backend and notify users
                showNotification('Announcement posted to all users!', 'success');
                announcementInput.value = '';
            } else {
                showNotification('Please enter an announcement', 'error');
            }
        });
    }
});

// Export data functionality
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.admin-quick-actions .btn-secondary');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showNotification('Exporting data... This may take a moment.', 'info');
            
            // Simulate export
            setTimeout(() => {
                showNotification('Data exported successfully!', 'success');
            }, 2000);
        });
    }
});
