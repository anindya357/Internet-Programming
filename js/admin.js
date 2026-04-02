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
        updateCapacityDisplay(gymStatus);
        
        // Load stats
        const stats = await api.getAdminStats();
        updateStatsDisplay(stats);
        
        // Load announcements
        const announcements = await api.getAnnouncements({ limit: 10 });
        updateAnnouncementsDisplay(announcements);
        
        // Load recent activity
        await loadRecentActivity();
        
        // Load equipment list
        await loadEquipmentList();
        
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
    
    // Update total users
    const totalUsersEl = document.querySelector('[data-stat="total-users"]');
    if (totalUsersEl && stats.users) {
        totalUsersEl.textContent = parseInt(stats.users.total).toLocaleString();
    }
    
    // Update active users
    const activeUsersEl = document.querySelector('[data-stat="active-users"]');
    if (activeUsersEl && stats.users) {
        activeUsersEl.textContent = parseInt(stats.users.active).toLocaleString();
        // Calculate active percentage
        if (stats.users.total > 0) {
            const activePercentage = Math.round((stats.users.active / stats.users.total) * 100);
            const activeGrowthEl = document.querySelector('[data-stat-detail="active-growth"]');
            if (activeGrowthEl) activeGrowthEl.textContent = activePercentage;
        }
    }
    
    // Update total equipment
    const totalEquipmentEl = document.querySelector('[data-stat="total-equipment"]');
    if (totalEquipmentEl && stats.equipment) {
        totalEquipmentEl.textContent = parseInt(stats.equipment.total).toLocaleString();
        // Update available equipment detail
        const availableEquipmentEl = document.querySelector('[data-stat-detail="available-equipment"]');
        if (availableEquipmentEl) {
            availableEquipmentEl.textContent = parseInt(stats.equipment.available);
        }
    }
    
    // Update total workouts
    const totalWorkoutsEl = document.querySelector('[data-stat="total-workouts"]');
    if (totalWorkoutsEl && stats.workouts) {
        totalWorkoutsEl.textContent = parseInt(stats.workouts.total).toLocaleString();
    }
}

function updateCapacityDisplay(status) {
    if (!status) return;
    
    // Update capacity number
    const capacityNumberEl = document.getElementById('capacityNumber');
    if (capacityNumberEl) {
        capacityNumberEl.textContent = `${status.current_occupancy}/${status.max_capacity}`;
    }
    
    // Update capacity bar width
    const capacityFillEl = document.getElementById('capacityFill');
    if (capacityFillEl && status.max_capacity > 0) {
        const percentage = (status.current_occupancy / status.max_capacity) * 100;
        capacityFillEl.style.width = percentage + '%';
    }
    
    // Update capacity status text
    const capacityStatusEl = document.getElementById('capacityStatus');
    if (capacityStatusEl && status.max_capacity > 0) {
        const percentage = Math.round((status.current_occupancy / status.max_capacity) * 100);
        capacityStatusEl.textContent = percentage + '% capacity';
    }
}

async function loadRecentActivity() {
    try {
        // Fetch recent workouts
        const response = await api.getWorkouts({ limit: 50 });
        const workouts = response.workouts || response;
        
        const tbody = document.getElementById('activityTableBody');
        if (!tbody) return;
        
        if (!workouts || workouts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px;">No recent activity</td></tr>';
            return;
        }
        
        // Display recent workouts
        tbody.innerHTML = workouts.slice(0, 10).map(workout => {
            const startTime = new Date(workout.start_time);
            const endTime = new Date(workout.end_time);
            const duration = Math.round((endTime - startTime) / 60000); // Convert to minutes
            const isActive = !workout.end_time || new Date(workout.end_time) > new Date();
            const status = isActive ? 'Active' : 'Completed';
            const userName = (workout.user?.full_name || 'Unknown') + ' (' + (workout.user?.student_id || 'N/A') + ')';
            const userInitials = (workout.user?.full_name || 'U').split(' ').map(n => n[0]).join('');
            
            return `
                <tr>
                    <td>${startTime.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</td>
                    <td>
                        <div class="user-cell">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(userInitials)}&background=4f46e5&color=fff" alt="User">
                            <span>${userName}</span>
                        </div>
                    </td>
                    <td>${workout.exercise_type || 'Workout'}</td>
                    <td>${duration} min</td>
                    <td><span class="badge badge-${isActive ? 'active' : 'completed'}">${status}</span></td>
                </tr>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading recent activity:', error);
        const tbody = document.getElementById('activityTableBody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: red;">Error loading activity</td></tr>';
        }
    }
}

async function loadEquipmentList() {
    try {
        // Fetch equipment
        const response = await api.getEquipment();
        const equipment = response.equipment || response;
        
        const tbody = document.getElementById('equipmentTableBody');
        if (!tbody) return;
        
        if (!equipment || equipment.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">No equipment found</td></tr>';
            return;
        }
        
        // Display equipment
        tbody.innerHTML = equipment.slice(0, 20).map(item => {
            const status = item.is_available ? 'Available' : (item.needs_maintenance ? 'Maintenance' : 'In Use');
            const statusClass = item.is_available ? 'available' : (item.needs_maintenance ? 'maintenance' : 'in-use');
            const lastMaintenance = item.last_maintenance_date ? 
                new Date(item.last_maintenance_date).toLocaleDateString() : 'N/A';
            
            return `
                <tr>
                    <td>
                        <div class="equipment-cell">
                            <i class="fas fa-dumbbell"></i>
                            <span>${item.name}</span>
                        </div>
                    </td>
                    <td>${item.category || 'N/A'}</td>
                    <td>${item.quantity || 1}</td>
                    <td><span class="badge badge-${statusClass}">${status}</span></td>
                    <td>${lastMaintenance}</td>
                    <td>
                        <button class="btn-icon" title="Edit"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon" title="Delete"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading equipment:', error);
        const tbody = document.getElementById('equipmentTableBody');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px; color: red;">Error loading equipment</td></tr>';
        }
    }
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
                await api.createEquipment(formData);
                
                showNotification('Equipment added successfully!', 'success');
                closeAddEquipmentModal();
                form.reset();
                
                // Reload equipment list
                await loadEquipmentList();
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
