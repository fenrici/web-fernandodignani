document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    // Navbar hide/show on scroll
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (!navbar) return;
        
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Navigation click handling
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fallback methods in case smooth scroll doesn't work
                setTimeout(() => {
                    if (Math.abs(window.pageYOffset - offsetTop) > 50) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        setTimeout(() => {
                            if (Math.abs(window.pageYOffset - offsetTop) > 50) {
                                window.scrollTo(0, offsetTop);
                            }
                        }, 500);
                    }
                }, 500);
            }
        });
    });

    // Mobile navigation
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}); 