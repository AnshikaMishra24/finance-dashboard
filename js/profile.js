/**
 * Profile Page JavaScript
 * Handles profile editing and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Edit Profile Button
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.addEventListener('click', function() {
            alert('Edit Profile functionality would open a modal or form here.');
        });
    }

    // Link Account Buttons
    const linkButtons = document.querySelectorAll('.link-account-btn');
    linkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const bankName = this.getAttribute('data-bank');
            alert(`Connecting to ${bankName}... This would open OAuth flow in production.`);
        });
    });

    // Profile Image Upload
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.style.cursor = 'pointer';
        profileImage.addEventListener('click', function() {
            alert('Profile image upload would be implemented here.');
        });
    }
});
