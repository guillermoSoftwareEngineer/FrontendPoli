document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const user = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            role: document.querySelector('input[name="role"]:checked').value,
            id: Date.now().toString()
        };

        // Validar email unico para no registrar dos usuarios con el mismo correo electronico
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(u => u.email === user.email);
        
        if (emailExists) {
            alert('¡Este correo ya está registrado!');
            return;
        }

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Mostrar modal en lugar de alert
        successModal.show();
        
        // Redirigir después de cerrar el modal
        document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
            window.location.href = 'index.html';
        });
    });
});