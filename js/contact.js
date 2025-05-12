document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactModal = new bootstrap.Modal('#contactModal');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const contactData = {
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value,
            date: new Date().toISOString()
        };

        // Guardar en localStorage
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        // Mostrar modal y resetear formulario
        contactModal.show();
        contactForm.reset();

        // Como la app usa local storage, no es necesario enviar a base de datos
    });
});