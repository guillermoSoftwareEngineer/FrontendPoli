document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const notRegisteredModal = new bootstrap.Modal('#notRegisteredModal');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);

        if (user) {
            // Redirigir según rol
            window.location.href = user.role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
        } else {
            notRegisteredModal.show();
        }
    });
});