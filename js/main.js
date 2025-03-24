// Efecto scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación al hacer scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        if (window.scrollY > el.offsetTop - window.innerHeight + 100) {
            el.classList.add('animate__fadeInUp');
        }
    });
});