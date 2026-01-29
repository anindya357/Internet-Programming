// ===========================
// Authentication Functions
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Password Toggle
    setupPasswordToggles();
});

function handleLogin(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!studentId || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login (In real app, this would call backend API)
    const userData = {
        studentId: studentId,
        name: 'Student',
        email: studentId + '@cuet.ac.bd'
    };
    
    // Store user data
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    
    showNotification('Login successful! Redirecting...', 'success');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const studentId = document.getElementById('regStudentId').value;
    const email = document.getElementById('email').value;
    const department = document.getElementById('department').value;
    const year = document.getElementById('year').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.querySelector('input[name="terms"]').checked;
    
    // Validation
    if (!firstName || !lastName || !studentId || !email || !department || !year || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!termsAccepted) {
        showNotification('Please accept the terms of service', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Password strength check
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters long', 'error');
        return;
    }
    
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        showNotification('Password must contain uppercase, lowercase, and numbers', 'error');
        return;
    }
    
    // Simulate registration (In real app, this would call backend API)
    const userData = {
        firstName: firstName,
        lastName: lastName,
        name: firstName + ' ' + lastName,
        studentId: studentId,
        email: email,
        department: department,
        year: year
    };
    
    // Store user data
    localStorage.setItem('userData', JSON.stringify(userData));
    
    showNotification('Registration successful! Please login.', 'success');
    
    // Redirect to login
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#0ea5e9'};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
