/* 
  ANTIGRAVITY INTERACTIONS
  - Terminal Typing Effect
  - Scroll Reveal Animations
  - Smooth Scrolling
*/

document.addEventListener('DOMContentLoaded', () => {

    // ════ 1. TERMINAL TYPING EFFECT ════
    const terminalOutput = document.getElementById('typing-output');
    const commands = [
        { text: "Loading user profile...", delay: 500 },
        { text: "Name: Camilo Ñustes", delay: 800 },
        { text: "Role: Senior Backend Engineer", delay: 1200 },
        { text: "Stack: Java, Spring Boot, AWS, Kafka", delay: 1600 },
        { text: "Status: Ready for new challenges...", delay: 2200 }
    ];

    let cmdIndex = 0;
    let charIndex = 0;
    let currentCmd = '';
    let isDeleting = false;

    function typeTerminal() {
        if (cmdIndex >= commands.length) return;

        const cmd = commands[cmdIndex];

        if (!isDeleting && charIndex < cmd.text.length) {
            // Typing
            terminalOutput.textContent += cmd.text.charAt(charIndex);
            charIndex++;
            setTimeout(typeTerminal, 50);
        } else if (cmdIndex < commands.length - 1) {
            // Move to next line after delay
            terminalOutput.textContent += '\n> ';
            cmdIndex++;
            charIndex = 0;
            setTimeout(typeTerminal, cmd.delay);
        } else {
            // Finished
            terminalOutput.innerHTML += '<span class="blink">_</span>';
        }
    }

    // Start typing after initial delay
    if (terminalOutput) {
        setTimeout(typeTerminal, 1000);
    }


    // ════ 2. HEADER SCROLL EFFECT ════
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.padding = '0.5rem 0';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.8)';
            header.style.padding = '1rem 0';
        }
    });


    // ════ 3. SCROLL REVEAL ANIMATION ════
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .hero-content > *');

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        // Add staggered delay
        // el.style.transitionDelay = `${index * 0.1}s`; 

        observer.observe(el);
    });

    // Add visible class styles dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    // ════ 4. MOBILE MENU ════
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (window.innerWidth <= 768) {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }

    // ════ 5. SMOOTH SCROLL FOR ANCHORS ════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks) {
                    navLinks.style.display = 'none';
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

});
