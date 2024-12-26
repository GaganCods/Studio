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
    // Add your newsletter subscription logic here
    alert('Thank you for subscribing to our newsletter!');
    newsletterForm.reset();
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
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
