// Smooth Scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Fechar menu mobile se estiver aberto
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        }
    });
});

// Função para scroll suave
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navegação ativa com scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Mudar estilo do navbar ao scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animação dos números das estatísticas
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                const updateNumber = () => {
                    if (current < target) {
                        current += increment;
                        stat.textContent = Math.ceil(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        stat.textContent = target;
                    }
                };
                updateNumber();
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animação do hamburger
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        const formMessage = document.getElementById('formMessage');
        
        // Validação simples
        if (!nome || !email || !mensagem) {
            showFormMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simular envio (aqui você pode integrar com um backend real)
        showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Scroll suave para a mensagem
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Newsletter
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value;
    
    if (!email || !isValidEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    
    // Simular inscrição
    alert(`Obrigado por se inscrever! Você receberá nossas novidades em ${email}`);
    emailInput.value = '';
}

// Animação de entrada dos cards
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.solution-card, .feature, .timeline-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Animação do título
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section-title').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    titleObserver.observe(title);
});

// Prevenir envio duplicado do formulário
let isSubmitting = false;
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        if (isSubmitting) {
            e.preventDefault();
            return;
        }
        isSubmitting = true;
        setTimeout(() => {
            isSubmitting = false;
        }, 3000);
    });
}

// Adicionar ano atual no footer
const currentYear = new Date().getFullYear();
const footerCopyright = document.querySelector('.footer-bottom p');
if (footerCopyright) {
    footerCopyright.innerHTML = `&copy; ${currentYear} Agro Forte - Todos os direitos reservados`;
}

// Tooltip para links sociais (opcional)
const socialLinks = document.querySelectorAll('.social-links a');
socialLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        const platform = e.currentTarget.querySelector('i').classList[1].split('-')[1];
        e.currentTarget.setAttribute('title', `Visite nosso ${platform}`);
    });
});

// Log de boas vindas no console
console.log('%c🌱 Agro Forte - Cultivando um futuro sustentável 🌍', 'color: #2d6a4f; font-size: 16px; font-weight: bold;');
console.log('%cSite carregado com sucesso!', 'color: #ffb703; font-size: 12px;');