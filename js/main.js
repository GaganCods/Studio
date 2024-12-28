// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Initially show only 2 items from each category
    filterInitialItems();

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                item.style.display = 'none'; // Hide all items first
                
                if (filter === 'all') {
                    // Show 2 items from each category
                    filterInitialItems();
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block'; // Show all items of selected category
                }
            });
        });
    });

    function filterInitialItems() {
        const categories = ['wedding', 'event', 'portrait'];
        categories.forEach(category => {
            const items = document.querySelectorAll(`.portfolio-item.${category}`);
            items.forEach((item, index) => {
                item.style.display = index < 2 ? 'block' : 'none';
            });
        });
    }
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const consent = document.getElementById('consent').checked;
    const errorDiv = document.getElementById('error');

    // Clear previous error messages
    errorDiv.textContent = '';

    // Validation
    if (!name || !email || !phone || !subject || !message || !consent) {
        errorDiv.textContent = 'Please fill in all the fields and agree to the privacy policy.';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return;
    }

    // Construct the WhatsApp message with the new template and emojis
    const whatsappMessage = `👋 Hi there!\n\n` +
        `🌟 Name: ${name} \n` +
        `📧 Email: ${email} \n` +
        `📱 Phone: ${phone} \n` +
        `📌 Subject: ${subject} \n` +
        `💬 Message: ${message} \n\n` +
        `Thank you for reaching out! 😊`;

    // WhatsApp URL (Ensure phone number is in international format)
    const phoneNumber = '9536388420'; // Your WhatsApp number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Success message
    alert('Thank you for your message! We will get back to you soon.');

    // Reset form
    document.getElementById('contactForm').reset();
});

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const whatsappLink = "https://whatsapp.com/channel/0029Vb1wScPBA1esC9P8zK2h";
    
    window.open(whatsappLink, '_blank'); // Open in a new tab
});

// Newsletter form handler
document.getElementById('newsletterForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting
    const whatsappLink = "https://whatsapp.com/channel/0029Vb1wScPBA1esC9P8zK2h";
    window.open(whatsappLink, '_blank'); // Open in a new tab
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    navToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu on resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            body.style.overflow = '';
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Portfolio filter functionality
const portfolioFilters = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Remove active class from all filters
        portfolioFilters.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');

        const category = filter.dataset.filter;

        portfolioItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Portfolio Image Loading
const portfolioGrid = document.querySelector('.portfolio-grid');
const portfolioData = [
    {
        category: 'wedding',
        image: 'assets/portfolio/wedding1.jpg',
        title: 'Beautiful Wedding'
    },
    {
        category: 'portrait',
        image: 'assets/portfolio/portrait1.jpg',
        title: 'Professional Portrait'
    },
    // Add more portfolio items here
];

// Load portfolio items
function loadPortfolio() {
    portfolioData.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.dataset.category = item.category;
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-overlay">
                <h3>${item.title}</h3>
            </div>
        `;
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', loadPortfolio);

// Function to open overlay
function openOverlay(imageSrc) {
    const overlay = document.getElementById('image-overlay');
    const overlayImage = document.querySelector('.overlay-image');
    overlayImage.src = imageSrc;
    overlay.style.display = 'flex';
}

// Function to close overlay
function closeOverlay() {
    const overlay = document.getElementById('image-overlay');
    overlay.style.display = 'none';
}

// Add click event listeners to portfolio images
const portfolioImages = document.querySelectorAll('.portfolio-item img');
portfolioImages.forEach(image => {
    image.addEventListener('click', () => openOverlay(image.src));
});

// Remove custom cursor functionality
// const cursor = document.createElement('div');
// cursor.classList.add('custom-cursor');
// document.body.appendChild(cursor);
// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.pageX + 'px';
//     cursor.style.top = e.pageY + 'px';
// });

// Testimonial Slider
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dotsContainer = document.querySelector('.testimonial-dots');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;
let isAutoPlaying = true;
let autoPlayTimer;

// Create dots
testimonialCards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

// Clone first and last slides for infinite loop
const firstClone = testimonialCards[0].cloneNode(true);
const lastClone = testimonialCards[testimonialCards.length - 1].cloneNode(true);
testimonialTrack.appendChild(firstClone);
testimonialTrack.prepend(lastClone);

// Set initial position
testimonialTrack.style.transform = `translateX(-${100}%)`;

function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    const actualIndex = (index + testimonialCards.length) % testimonialCards.length;
    dots[actualIndex].classList.add('active');
}

function goToSlide(index) {
    currentIndex = index;
    const offset = (currentIndex + 1) * 100;
    testimonialTrack.style.transform = `translateX(-${offset}%)`;
    updateDots(currentIndex);
}

function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
        if (isAutoPlaying) {
            goToNextSlide();
        }
    }, 5000); // Change slide every 5 seconds
}

function goToNextSlide() {
    currentIndex++;
    const offset = (currentIndex + 1) * 100;
    testimonialTrack.style.transform = `translateX(-${offset}%)`;
    updateDots(currentIndex);

    // Reset to first slide
    if (currentIndex >= testimonialCards.length) {
        setTimeout(() => {
            testimonialTrack.style.transition = 'none';
            currentIndex = 0;
            testimonialTrack.style.transform = `translateX(-100%)`;
            setTimeout(() => {
                testimonialTrack.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    }
}

function goToPrevSlide() {
    currentIndex--;
    const offset = (currentIndex + 1) * 100;
    testimonialTrack.style.transform = `translateX(-${offset}%)`;
    updateDots(currentIndex);

    // Reset to last slide
    if (currentIndex === -1) {
        setTimeout(() => {
            testimonialTrack.style.transition = 'none';
            currentIndex = testimonialCards.length - 1;
            testimonialTrack.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
            setTimeout(() => {
                testimonialTrack.style.transition = 'transform 0.5s ease';
            }, 10);
        }, 500);
    }
}

// Handle navigation buttons
prevBtn.addEventListener('click', () => {
    isAutoPlaying = false;
    goToPrevSlide();
});

nextBtn.addEventListener('click', () => {
    isAutoPlaying = false;
    goToNextSlide();
});

// Handle pause on click
testimonialCards.forEach(card => {
    card.addEventListener('click', () => {
        isAutoPlaying = !isAutoPlaying;
        if (isAutoPlaying) {
            startAutoPlay();
        }
    });
});

// Handle transition end
testimonialTrack.addEventListener('transitionend', () => {
    if (currentIndex === -1) {
        testimonialTrack.style.transition = 'none';
        currentIndex = testimonialCards.length - 1;
        testimonialTrack.style.transform = `translateX(-${(currentIndex + 1) * 100}%)`;
        setTimeout(() => {
            testimonialTrack.style.transition = 'transform 0.5s ease';
        }, 10);
    }
});

// Start autoplay
startAutoPlay();

// Portfolio Image Popup
const popup = document.querySelector('.portfolio-popup');
const popupImage = document.querySelector('.popup-image');
const popupClose = document.querySelector('.popup-close');

// Open popup when clicking portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').getAttribute('src');
        popupImage.setAttribute('src', imgSrc);
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });
});

// Close popup when clicking close button
popupClose.addEventListener('click', () => {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close popup when clicking outside the image
popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Close popup with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popup.classList.contains('active')) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Portfolio Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Portfolio Image Popup
    const portfolioExpands = document.querySelectorAll('.portfolio-expand');
    const popup = document.querySelector('.portfolio-popup');
    const popupImage = document.querySelector('.popup-image');
    const popupClose = document.querySelector('.popup-close');

    portfolioExpands.forEach(expand => {
        expand.addEventListener('click', (e) => {
            e.preventDefault();
            const imageSrc = expand.parentElement.parentElement.querySelector('img').src;
            popupImage.src = imageSrc;
            popup.style.display = 'flex';
        });
    });

    popupClose?.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    popup?.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });
});

// Portfolio filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Automatically click the 'wedding' button to show only wedding images initially
    const weddingBtn = document.querySelector('[data-filter="wedding"]');
    if (weddingBtn) {
        weddingBtn.click();
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Prevent video downloading
document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('featured-video');
    
    if (video) {
        // Disable right click on video
        video.addEventListener('contextmenu', e => e.preventDefault());
        
        // Disable keyboard shortcuts
        video.addEventListener('keydown', e => {
            if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
            }
        });
        
        // Re-enable controls interaction
        video.addEventListener('click', function(e) {
            if (e.target === this) {
                if (this.paused) {
                    this.play();
                } else {
                    this.pause();
                }
            }
        });
    }
});

// Counter Animation
function startCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // Smoother animation with smaller increments
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start) + (element.dataset.suffix || '');
        }
    }, 16);
}

// Initialize counters when they become visible
const observeCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const target = parseInt(entry.target.dataset.target);
            entry.target.textContent = '0'; // Start from zero
            startCounter(entry.target, target);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.2 }); // Trigger earlier

// Start observing counter elements
document.addEventListener('DOMContentLoaded', () => {
    const counterElements = document.querySelectorAll('.counter-number');
    counterElements.forEach(counter => {
        counter.textContent = '0' + (counter.dataset.suffix || '');
        observeCounters.observe(counter);
    });
});

// Newsletter Subscription Handler - Updated Version
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();

            // Basic email validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            // Store email in localStorage (optional)
            localStorage.setItem('subscribedEmail', email);

            // Open WhatsApp Channel
            const whatsappLink = "https://whatsapp.com/channel/0029Vb1wScPBA1esC9P8zK2h";
            window.open(whatsappLink, '_blank');

            // Reset form and show success message
            this.reset();
            alert('Thank you for subscribing! You will be redirected to our WhatsApp Channel.');
        });
    });
});

// Add mobile navigation toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
});


