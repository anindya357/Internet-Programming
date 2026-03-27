/**
 * Settings Page JavaScript
 * Handles user preferences, notifications, privacy settings, and data management
 */

// State
let currentSettings = {
    notifications: {
        workoutReminders: true,
        achievementAlerts: true,
        dietUpdates: true,
        medicalReminders: true,
        emailNotifications: true,
        gymStatusUpdates: true
    },
    privacy: {
        publicProfile: false,
        showWorkoutHistory: false,
        shareAnonymizedData: false
    },
    preferences: {
        theme: 'light',
        language: 'en',
        timeFormat: '12',
        dateFormat: 'MM/DD/YYYY',
        workoutDuration: '60',
        workoutIntensity: 'moderate'
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    // Load settings
    loadSettings();

    // Setup event listeners
    setupEventListeners();
    
    // Setup tab navigation
    setupTabNavigation();
});

/**
 * Setup all event listeners
 */
function setupEventListeners() {
    // Save buttons
    document.getElementById('saveNotificationSettings')?.addEventListener('click', saveNotificationSettings);
    document.getElementById('savePrivacySettings')?.addEventListener('click', savePrivacySettings);
    document.getElementById('savePreferences')?.addEventListener('click', savePreferences);
    
    // Data management buttons
    document.getElementById('exportDataBtn')?.addEventListener('click', handleExportData);
    document.getElementById('clearCacheBtn')?.addEventListener('click', handleClearCache);
    document.getElementById('deleteAccountBtn')?.addEventListener('click', handleDeleteAccount);
    
    // Modal buttons
    document.getElementById('modalCloseBtn')?.addEventListener('click', closeConfirmationModal);
    document.getElementById('modalCancelBtn')?.addEventListener('click', closeConfirmationModal);
}

/**
 * Setup tab navigation
 */
function setupTabNavigation() {
    const navItems = document.querySelectorAll('.settings-nav-item');
    const tabs = document.querySelectorAll('.settings-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            
            // Remove active class from all nav items and tabs
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => {
                tab.style.display = 'none';
                tab.classList.remove('active');
            });
            
            // Add active class to clicked nav item and corresponding tab
            item.classList.add('active');
            const targetTab = document.getElementById(`${tabId}-tab`);
            if (targetTab) {
                targetTab.style.display = 'block';
                targetTab.classList.add('active');
            }
        });
    });
}

/**
 * Load settings from localStorage
 */
function loadSettings() {
    try {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            const parsed = JSON.parse(savedSettings);
            currentSettings = { ...currentSettings, ...parsed };
        }
        
        // Apply settings to UI
        applySettings();
    } catch (error) {
        console.error('Error loading settings:', error);
        // Use default settings
        applySettings();
    }
}

/**
 * Apply settings to UI elements
 */
function applySettings() {
    // Notifications
    document.getElementById('workoutReminders').checked = currentSettings.notifications.workoutReminders;
    document.getElementById('achievementAlerts').checked = currentSettings.notifications.achievementAlerts;
    document.getElementById('dietUpdates').checked = currentSettings.notifications.dietUpdates;
    document.getElementById('medicalReminders').checked = currentSettings.notifications.medicalReminders;
    document.getElementById('emailNotifications').checked = currentSettings.notifications.emailNotifications;
    document.getElementById('gymStatusUpdates').checked = currentSettings.notifications.gymStatusUpdates;
    
    // Privacy
    document.getElementById('publicProfile').checked = currentSettings.privacy.publicProfile;
    document.getElementById('showWorkoutHistory').checked = currentSettings.privacy.showWorkoutHistory;
    document.getElementById('shareAnonymizedData').checked = currentSettings.privacy.shareAnonymizedData;
    
    // Preferences
    document.getElementById('themeSelect').value = currentSettings.preferences.theme;
    document.getElementById('languageSelect').value = currentSettings.preferences.language;
    document.getElementById('timeFormatSelect').value = currentSettings.preferences.timeFormat;
    document.getElementById('dateFormatSelect').value = currentSettings.preferences.dateFormat;
    document.getElementById('workoutDurationSelect').value = currentSettings.preferences.workoutDuration;
    document.getElementById('workoutIntensitySelect').value = currentSettings.preferences.workoutIntensity;
}

/**
 * Save notification settings
 */
function saveNotificationSettings() {
    try {
        currentSettings.notifications = {
            workoutReminders: document.getElementById('workoutReminders').checked,
            achievementAlerts: document.getElementById('achievementAlerts').checked,
            dietUpdates: document.getElementById('dietUpdates').checked,
            medicalReminders: document.getElementById('medicalReminders').checked,
            emailNotifications: document.getElementById('emailNotifications').checked,
            gymStatusUpdates: document.getElementById('gymStatusUpdates').checked
        };
        
        saveSettings();
        showToast('Notification settings saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving notification settings:', error);
        showToast('Failed to save notification settings', 'error');
    }
}

/**
 * Save privacy settings
 */
function savePrivacySettings() {
    try {
        currentSettings.privacy = {
            publicProfile: document.getElementById('publicProfile').checked,
            showWorkoutHistory: document.getElementById('showWorkoutHistory').checked,
            shareAnonymizedData: document.getElementById('shareAnonymizedData').checked
        };
        
        saveSettings();
        showToast('Privacy settings saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving privacy settings:', error);
        showToast('Failed to save privacy settings', 'error');
    }
}

/**
 * Save preferences
 */
function savePreferences() {
    try {
        currentSettings.preferences = {
            theme: document.getElementById('themeSelect').value,
            language: document.getElementById('languageSelect').value,
            timeFormat: document.getElementById('timeFormatSelect').value,
            dateFormat: document.getElementById('dateFormatSelect').value,
            workoutDuration: document.getElementById('workoutDurationSelect').value,
            workoutIntensity: document.getElementById('workoutIntensitySelect').value
        };
        
        saveSettings();
        
        // Apply theme if changed
        applyTheme(currentSettings.preferences.theme);
        
        showToast('Preferences saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving preferences:', error);
        showToast('Failed to save preferences', 'error');
    }
}

/**
 * Save settings to localStorage
 */
function saveSettings() {
    try {
        localStorage.setItem('userSettings', JSON.stringify(currentSettings));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        throw error;
    }
}

/**
 * Apply theme
 */
function applyTheme(theme) {
    const body = document.body;
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        showToast('Dark theme will be available in a future update', 'info');
    } else if (theme === 'light') {
        body.classList.remove('dark-theme');
    } else if (theme === 'auto') {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        showToast('Auto theme will follow your system preferences (Coming soon)', 'info');
    }
}

/**
 * Handle export data
 */
async function handleExportData() {
    showLoading();
    
    try {
        // Get all user data
        const [user, workouts, dietPlan, medicalProfile] = await Promise.all([
            api.getCurrentUser(),
            api.getWorkouts().catch(() => []),
            api.getDietPlan().catch(() => null),
            api.getMedicalProfile().catch(() => null)
        ]);
        
        const exportData = {
            user: user,
            workouts: workouts,
            dietPlan: dietPlan,
            medicalProfile: medicalProfile,
            settings: currentSettings,
            exportDate: new Date().toISOString()
        };
        
        // Create and download JSON file
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `fittrack-data-${user.student_id}-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showToast('Data exported successfully!', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showToast('Failed to export data', 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Handle clear cache
 */
function handleClearCache() {
    showConfirmationModal(
        'Clear Cache',
        'Are you sure you want to clear the application cache? This will remove temporary data but won\'t affect your account.',
        () => {
            try {
                // Clear specific cache items but keep authentication
                const keysToKeep = ['token', 'userSettings'];
                const keysToRemove = [];
                
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && !keysToKeep.includes(key)) {
                        keysToRemove.push(key);
                    }
                }
                
                keysToRemove.forEach(key => localStorage.removeItem(key));
                
                showToast('Cache cleared successfully!', 'success');
                closeConfirmationModal();
            } catch (error) {
                console.error('Error clearing cache:', error);
                showToast('Failed to clear cache', 'error');
            }
        }
    );
}

/**
 * Handle delete account
 */
function handleDeleteAccount() {
    showConfirmationModal(
        'Delete Account',
        'Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be lost.',
        async () => {
            showLoading();
            closeConfirmationModal();
            
            try {
                // In a real implementation, this would call an API endpoint
                showToast('Account deletion is not yet implemented. Please contact an administrator.', 'info');
                
                // await api.deleteAccount();
                // localStorage.clear();
                // window.location.href = 'index.html';
            } catch (error) {
                console.error('Error deleting account:', error);
                showToast('Failed to delete account', 'error');
            } finally {
                hideLoading();
            }
        }
    );
}

/**
 * Show confirmation modal
 */
function showConfirmationModal(title, message, onConfirm) {
    const modal = document.getElementById('confirmationModal');
    if (!modal) return;
    
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    
    modal.style.display = 'flex';
    
    // Remove old listeners and add new one
    const confirmBtn = document.getElementById('modalConfirmBtn');
    const newConfirmBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    
    newConfirmBtn.addEventListener('click', () => {
        if (onConfirm) onConfirm();
    });
}

/**
 * Close confirmation modal
 */
function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) modal.style.display = 'none';
}

/**
 * Show loading spinner
 */
function showLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'flex';
}

/**
 * Hide loading spinner
 */
function hideLoading() {
    const spinner = document.getElementById('loadingSpinner');
    if (spinner) spinner.style.display = 'none';
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast toast-${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
