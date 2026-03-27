// ===========================
// Admin Dashboard Functions
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication and admin status
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Check if user is admin
    const userData = getUserData();
    if (!userData || !userData.is_admin) {
        showNotification('Access denied. Admin privileges required.', 'error');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        return;
    }
    
    loadAdminDashboard();
    setupGymStatusControl();
    setupAddEquipmentModal();
    setupAnnouncementForm();
});

async function loadAdminDashboard() {
    try {
        // Load gym status
        const gymStatus = await api.getGymStatus();
        updateGymStatusDisplay(gymStatus);
        
        // Load stats
        const stats = await api.getAdminStats();
        updateStatsDisplay(stats);
        
        // Load announcements
        const announcements = await api.getAnnouncements({ limit: 10 });
        updateAnnouncementsDisplay(announcements);
        
        // Load users
        const users = await api.getAllUsers({ limit: 50 });
        updateUsersTable(users);
        
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
    }
}

function updateGymStatusDisplay(status) {
    const gymStatusToggle = document.getElementById('gymStatus');
    const statusText = document.querySelector('.status-text');
    const occupancyEl = document.querySelector('.gym-occupancy');
    
    if (gymStatusToggle) {
        gymStatusToggle.checked = status.is_open;
    }
    
    if (statusText) {
        statusText.textContent = status.is_open ? 'Gym is currently Open' : 'Gym is currently Closed';
        statusText.classList.toggle('open', status.is_open);
        statusText.classList.toggle('closed', !status.is_open);
    }
    
    if (occupancyEl) {
        occupancyEl.textContent = `${status.current_occupancy}/${status.max_capacity}`;
    }
}

function updateStatsDisplay(stats) {
    if (!stats) return;
    
    const totalUsersEl = document.querySelector('[data-stat="total-users"]');
    const activeUsersEl = document.querySelector('[data-stat="active-users"]');
    const totalWorkoutsEl = document.querySelector('[data-stat="total-workouts"]');
    const totalEquipmentEl = document.querySelector('[data-stat="total-equipment"]');
    
    if (totalUsersEl) totalUsersEl.textContent = stats.total_users || 0;
    if (activeUsersEl) activeUsersEl.textContent = stats.active_users || 0;
    if (totalWorkoutsEl) totalWorkoutsEl.textContent = stats.total_workouts || 0;
    if (totalEquipmentEl) totalEquipmentEl.textContent = stats.total_equipment || 0;
}

function updateAnnouncementsDisplay(data) {
    const container = document.querySelector('.announcements-list');
    if (!container || !data.announcements) return;
    
    container.innerHTML = data.announcements.map(a => `
        <div class="announcement-item">
            <div class="announcement-header">
                <span class="announcement-priority ${a.priority || 'normal'}">${a.priority || 'normal'}</span>
                <span class="announcement-date">${new Date(a.created_at).toLocaleDateString()}</span>
                <button class="btn-icon" onclick="deleteAnnouncement(${a.id})"><i class="fas fa-trash"></i></button>
            </div>
            <h4>${a.title}</h4>
            <p>${a.content}</p>
        </div>
    `).join('');
}

function updateUsersTable(data) {
    const tbody = document.querySelector('.users-table tbody');
    if (!tbody || !data.users) return;
    
    tbody.innerHTML = data.users.map(user => `
        <tr>
            <td>${user.student_id}</td>
            <td>${user.full_name}</td>
            <td>${user.email}</td>
            <td>${user.department || '-'}</td>
            <td>
                <span class="status-badge ${user.is_active ? 'active' : 'inactive'}">
                    ${user.is_active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td>
                <button class="btn-icon" onclick="toggleUserStatus(${user.id})" title="Toggle Status">
                    <i class="fas fa-toggle-${user.is_active ? 'on' : 'off'}"></i>
                </button>
                <button class="btn-icon" onclick="toggleUserAdmin(${user.id})" title="${user.is_admin ? 'Remove Admin' : 'Make Admin'}">
                    <i class="fas fa-user-shield"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

async function setupGymStatusControl() {
    const gymStatusToggle = document.getElementById('gymStatus');
    
    if (gymStatusToggle) {
        gymStatusToggle.addEventListener('change', async function() {
            try {
                const response = await api.toggleGymStatus();
                updateGymStatusDisplay(response);
                showNotification(`Gym status changed to ${response.is_open ? 'Open' : 'Closed'}`, 'success');
            } catch (error) {
                showNotification('Failed to update gym status', 'error');
                // Revert toggle
                this.checked = !this.checked;
            }
        });
    }
}

function setupAddEquipmentModal() {
    const form = document.getElementById('addEquipmentForm');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn?.innerHTML || 'Add';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
            }
            
            const formData = {
                name: document.getElementById('equipmentName').value,
                category: document.getElementById('equipmentCategory').value,
                quantity: parseInt(document.getElementById('equipmentQuantity').value),
                description: document.getElementById('equipmentDescription').value
            };
            
            try {
                await apiRequest(`${API_BASE_URL}/equipment`, {
                    method: 'POST',
                    body: JSON.stringify(formData)
                });
                
                showNotification('Equipment added successfully!', 'success');
                closeAddEquipmentModal();
                form.reset();
                
                // Reload equipment list if present
                if (typeof loadEquipment === 'function') {
                    loadEquipment();
                }
            } catch (error) {
                showNotification(error.message || 'Failed to add equipment', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }
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

function setupAnnouncementForm() {
    const postButton = document.querySelector('.control-item .btn-sm, #postAnnouncementBtn');
    const announcementInput = document.querySelector('.announcement-input, #announcementInput');
    const prioritySelect = document.querySelector('#announcementPriority');
    
    if (postButton && announcementInput) {
        postButton.addEventListener('click', async function() {
            const content = announcementInput.value.trim();
            
            if (!content) {
                showNotification('Please enter an announcement', 'error');
                return;
            }
            
            postButton.disabled = true;
            postButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            try {
                await api.createAnnouncement({
                    title: 'Announcement',
                    content: content,
                    priority: prioritySelect?.value || 'normal'
                });
                
                showNotification('Announcement posted successfully!', 'success');
                announcementInput.value = '';
                
                // Reload announcements
                const announcements = await api.getAnnouncements({ limit: 10 });
                updateAnnouncementsDisplay(announcements);
            } catch (error) {
                showNotification(error.message || 'Failed to post announcement', 'error');
            } finally {
                postButton.disabled = false;
                postButton.innerHTML = '<i class="fas fa-bullhorn"></i> Post';
            }
        });
    }
}

async function deleteAnnouncement(id) {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
        await api.deleteAnnouncement(id);
        showNotification('Announcement deleted', 'success');
        
        // Reload announcements
        const announcements = await api.getAnnouncements({ limit: 10 });
        updateAnnouncementsDisplay(announcements);
    } catch (error) {
        showNotification('Failed to delete announcement', 'error');
    }
}

async function toggleUserStatus(userId) {
    try {
        await api.toggleUserStatus(userId);
        showNotification('User status updated', 'success');
        
        // Reload users
        const users = await api.getAllUsers({ limit: 50 });
        updateUsersTable(users);
    } catch (error) {
        showNotification('Failed to update user status', 'error');
    }
}

async function toggleUserAdmin(userId) {
    if (!confirm('Are you sure you want to change this user\'s admin status?')) return;
    
    try {
        await api.toggleUserAdmin(userId);
        showNotification('User admin status updated', 'success');
        
        // Reload users
        const users = await api.getAllUsers({ limit: 50 });
        updateUsersTable(users);
    } catch (error) {
        showNotification('Failed to update admin status', 'error');
    }
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

async function filterEquipment() {
    const searchTerm = searchInput?.value.toLowerCase() || '';
    const category = categoryFilter?.value || '';
    const status = statusFilter?.value || '';
    
    try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (category && category !== 'All Categories') params.category = category;
        if (status === 'available') params.available_only = true;
        
        const response = await api.getEquipment(params);
        // Update equipment display if there's a table or list
        console.log('Filtered equipment:', response);
    } catch (error) {
        console.error('Filter error:', error);
    }
}

// Handle delete equipment
async function deleteEquipment(id) {
    if (!confirm('Are you sure you want to delete this equipment?')) return;
    
    try {
        await apiRequest(`${API_BASE_URL}/equipment/${id}`, {
            method: 'DELETE'
        });
        showNotification('Equipment deleted successfully!', 'success');
        
        // Reload equipment list
        if (typeof loadEquipment === 'function') {
            loadEquipment();
        }
    } catch (error) {
        showNotification('Failed to delete equipment', 'error');
    }
}

// Handle edit equipment
function editEquipment(id) {
    // Open edit modal with equipment data
    showNotification('Edit equipment functionality', 'info');
}

// Export data functionality
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.querySelector('.admin-quick-actions .btn-secondary');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', async function() {
            showNotification('Exporting data... This may take a moment.', 'info');
            
            try {
                const stats = await api.getAdminStats();
                const users = await api.getAllUsers({ limit: 1000 });
                
                // Create a simple CSV export
                const data = {
                    exported_at: new Date().toISOString(),
                    stats: stats,
                    total_users_exported: users.users?.length || 0
                };
                
                // Trigger download
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `fittrack_export_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                URL.revokeObjectURL(url);
                
                showNotification('Data exported successfully!', 'success');
            } catch (error) {
                showNotification('Failed to export data', 'error');
            }
        });
    }
});
