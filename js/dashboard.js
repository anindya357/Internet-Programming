// ===========================
// Dashboard Functions
// ===========================

// Cache for equipment data
let equipmentCache = [];

document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    loadDashboardData();
    loadEquipment();
    loadRecentActivity();
    setupEquipmentFilters();
    setupLogout();

    // Start polling gym status for real-time updates
    setInterval(async () => {
        try {
            const gymStatus = await api.getGymStatus();
            if (gymStatus) {
                updateGymStatus(gymStatus);
            }
        } catch (error) {
            console.error('Error polling gym status:', error);
        }
    }, 15000);
});

async function loadDashboardData() {
    try {
        // Load user profile
        const userData = getUserData();
        if (userData) {
            updateUserDisplay(userData);

            // Show admin link if user is admin
            const adminNavLink = document.getElementById('adminNavLink');
            if (adminNavLink && userData.is_admin) {
                adminNavLink.style.display = 'block';
            }
        }

        // Load gym status
        const gymStatus = await api.getGymStatus();
        updateGymStatus(gymStatus);
        
        // Load announcements
        const announcements = await api.getAnnouncements({ limit: 5 });
        updateAnnouncements(announcements);
        
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function updateUserDisplay(user) {
    const userNameElements = document.querySelectorAll('.user-name, #userName');
    const userEmailElements = document.querySelectorAll('.user-email, #userEmail');
    const userAvatarElements = document.querySelectorAll('.user-avatar img');
    
    userNameElements.forEach(el => {
        if (el) el.textContent = user.full_name || user.name || 'User';
    });
    
    userEmailElements.forEach(el => {
        if (el) el.textContent = user.email || '';
    });
    
    userAvatarElements.forEach(el => {
        if (el) {
            const name = user.full_name || user.name || 'User';
            el.src = user.profile_image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4f46e5&color=fff`;
        }
    });
}

function updateGymStatus(status) {
    const statusBadge = document.querySelector('.gym-status-badge, .status-badge');
    const occupancyText = document.querySelector('.gym-occupancy');

    if (statusBadge) {
        statusBadge.textContent = status.is_open ? 'Open Now' : 'Off Now';
        statusBadge.className = `status-badge gym-status-badge ${status.is_open ? 'open' : 'closed'}`;
    }

    if (occupancyText) {
        occupancyText.textContent = `${status.current_occupancy}/${status.max_capacity} members`;
    }
}

function updateAnnouncements(data) {
    const announcementsList = document.querySelector('.announcements-list');
    if (!announcementsList || !data.announcements) return;
    
    if (data.announcements.length === 0) {
        announcementsList.innerHTML = '<p class="no-announcements">No announcements at this time.</p>';
        return;
    }
    
    announcementsList.innerHTML = data.announcements.map(a => `
        <div class="announcement-item ${a.priority || 'normal'}">
            <div class="announcement-header">
                <span class="announcement-title">${a.title}</span>
                <span class="announcement-date">${new Date(a.created_at).toLocaleDateString()}</span>
            </div>
            <p class="announcement-content">${a.content}</p>
        </div>
    `).join('');
}

async function loadEquipment(filter = 'all') {
    const equipmentGrid = document.getElementById('equipmentGrid');
    
    if (!equipmentGrid) return;
    
    // Show loading
    equipmentGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading equipment...</div>';
    
    try {
        // Fetch from API if cache is empty
        if (equipmentCache.length === 0) {
            const response = await api.getEquipment({ limit: 50 });
            equipmentCache = response.equipment || [];
        }
        
        // Filter equipment
        let filteredEquipment = equipmentCache;
        if (filter !== 'all') {
            filteredEquipment = equipmentCache.filter(item => 
                item.category && item.category.toLowerCase() === filter.toLowerCase()
            );
        }
        
        if (filteredEquipment.length === 0) {
            equipmentGrid.innerHTML = '<div class="no-equipment">No equipment found.</div>';
            return;
        }
        
        // Generate HTML
        const html = filteredEquipment.map(item => `
            <div class="equipment-card">
                <div class="equipment-header">
                    <div class="equipment-icon">
                        <i class="fas ${getEquipmentIcon(item.category)}"></i>
                    </div>
                    <div class="equipment-info">
                        <h3>${item.name}</h3>
                        <span class="equipment-category">${capitalizeFirst((item.category || '').replace('-', ' '))}</span>
                    </div>
                </div>
                <div class="equipment-details">
                    <div class="equipment-detail">
                        <span>Total Units</span>
                        <span>${item.quantity || 1}</span>
                    </div>
                    <div class="equipment-detail">
                        <span>Available</span>
                        <span class="availability ${item.available_quantity > 0 ? 'available' : 'in-use'}">
                            ${item.available_quantity || 0} ${item.available_quantity > 0 ? 'Available' : 'In Use'}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
        
        equipmentGrid.innerHTML = html;
    } catch (error) {
        console.error('Error loading equipment:', error);
        equipmentGrid.innerHTML = '<div class="error">Failed to load equipment. Please try again.</div>';
    }
}

function getEquipmentIcon(category) {
    const icons = {
        'cardio': 'fa-running',
        'strength': 'fa-dumbbell',
        'free-weights': 'fa-weight',
        'machines': 'fa-cogs',
        'flexibility': 'fa-child',
        'accessories': 'fa-box'
    };
    return icons[(category || '').toLowerCase()] || 'fa-dumbbell';
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

function setupLogout() {
    const logoutBtn = document.querySelector('.logout-btn, #logoutBtn, [data-action="logout"]');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            api.logout();
            window.location.href = 'index.html';
        });
    }
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function loadRecentActivity() {
    const activityList = document.getElementById('recentActivityList');
    if (!activityList) return;

    try {
        const response = await api.getWorkouts({ limit: 5 });
        const workouts = response.workouts || [];

        if (workouts.length === 0) {
            activityList.innerHTML = '<li class="activity-item" style="justify-content: center; color: #64748b;">No recent activity found.</li>';
            return;
        }

        activityList.innerHTML = workouts.map(workout => {
            const date = new Date(workout.created_at);
            const timeString = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            // Choose color and icon based on workout type
            let color = 'blue';
            let icon = 'dumbbell';
            if (workout.workout_type === 'cardio') {
                color = 'green';
                icon = 'running';
            } else if (workout.workout_type === 'flexibility' || workout.workout_type === 'yoga') {
                color = 'orange';
                icon = 'heartbeat';
            }

            return `
                <li class="activity-item">
                    <figure class="activity-icon ${color}" aria-hidden="true">
                        <i class="fas fa-${icon}"></i>
                    </figure>
                    <div class="activity-content">
                        <h3>${workout.name || (capitalizeFirst(workout.focus_area || 'General') + ' ' + capitalizeFirst(workout.workout_type || 'Workout'))}</h3>
                        <p>
                            <time datetime="${workout.created_at}">${timeString}</time>
                            &bull; <span>${workout.duration || 0} minutes</span>
                        </p>
                    </div>
                    <a href="workout-history.html" class="btn-link" aria-label="View details">
                        View Details
                    </a>
                </li>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading recent activity:', error);
        activityList.innerHTML = '<li class="activity-item" style="justify-content: center; color: #ef4444;">Failed to load activity.</li>';
    }
}

