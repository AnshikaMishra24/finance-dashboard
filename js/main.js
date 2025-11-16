/**
 * Finance Dashboard - Main JavaScript
 * Handles navigation, sidebar, authentication, and common utilities
 */

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (dummy authentication)
    if (email && password) {
        // Store user session (in real app, this would be handled by backend)
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        alert('Please enter valid credentials');
    }
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const currentPage = window.location.pathname.split('/').pop();
    
    // If not logged in and not on login page, redirect to login
    if (!isLoggedIn && currentPage !== 'index.html' && currentPage !== '') {
        window.location.href = 'index.html';
    }
    
    // If logged in and on login page, redirect to dashboard
    if (isLoggedIn && (currentPage === 'index.html' || currentPage === '')) {
        window.location.href = 'dashboard.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = 'index.html';
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format date
function formatDate(date) {
    return new Intl.DateFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (sidebar && menuToggle) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    console.log('Finance Dashboard loaded successfully!');
});

// Dummy function for adding transactions
function addTransaction() {
    alert('Add Transaction modal would open here. This is a demo function.');
}

// Dummy function for exporting data
function exportTransactions() {
    alert('Exporting transactions to CSV... This is a demo function.');
}

// Profile edit function
function editProfile() {
    const inputs = document.querySelectorAll('.profile-form input');
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.style.background = 'white';
    });
    alert('Profile editing enabled. This is a demo function.');
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#FF6B6B' : '#00BCD4'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);
