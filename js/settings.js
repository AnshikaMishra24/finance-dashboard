/**
 * Finance Dashboard - Settings Management
 * Handles settings page functionality
 */

/**
 * Change theme
 */
function changeTheme(theme) {
    console.log('Changing theme to:', theme);
    
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        showNotification('Dark theme enabled', 'success');
    } else if (theme === 'light') {
        document.body.classList.remove('dark-theme');
        showNotification('Light theme enabled', 'success');
    } else {
        showNotification('Auto theme will match your system preferences', 'info');
    }
    
    // Store preference
    localStorage.setItem('theme', theme);
}

/**
 * Change password
 */
function changePassword() {
    const currentPassword = prompt('Enter current password:');
    if (!currentPassword) return;
    
    const newPassword = prompt('Enter new password:');
    if (!newPassword) return;
    
    const confirmPassword = prompt('Confirm new password:');
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    // In real app, this would call an API
    showNotification('Password changed successfully!', 'success');
}

/**
 * Save settings
 */
function saveSettings() {
    // Collect all settings
    const settings = {
        language: document.querySelector('.settings-section select')?.value,
        theme: document.querySelector('#themeSelect')?.value,
        notifications: []
    };
    
    // Get all toggle switches
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach((toggle, index) => {
        settings.notifications.push({
            name: `notification_${index}`,
            enabled: toggle.checked
        });
    });
    
    // Store in localStorage (in real app, would save to backend)
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    showNotification('Settings saved successfully!', 'success');
}

/**
 * Reset settings to default
 */
function resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        // Clear stored settings
        localStorage.removeItem('userSettings');
        localStorage.removeItem('theme');
        
        // Reset form
        document.querySelectorAll('.settings-section select').forEach(select => {
            select.selectedIndex = 0;
        });
        
        document.querySelectorAll('.toggle-switch input').forEach(toggle => {
            toggle.checked = false;
        });
        
        showNotification('Settings reset to default', 'info');
    }
}

/**
 * Load saved settings on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    const savedSettings = localStorage.getItem('userSettings');
    
    if (savedSettings) {
        try {
            const settings = JSON.parse(savedSettings);
            console.log('Loaded settings:', settings);
            // Apply saved settings here
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }
    
    // Load theme preference
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});
