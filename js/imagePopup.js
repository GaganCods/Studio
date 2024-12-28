document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-expand');
    const popup = document.querySelector('.portfolio-popup');
    const popupImage = popup.querySelector('.popup-image');
    const closeButton = popup.querySelector('.popup-close');
    const overlay = popup.querySelector('.popup-overlay');

    // Open popup
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openPopup(item);
        });
    });

    // Close popup functions
    const closePopup = () => {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Close on button click
    closeButton.addEventListener('click', closePopup);

    // Close on overlay click
    overlay.addEventListener('click', closePopup);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            closePopup();
        }
    });
});

function openPopup(element) {
    const popup = document.querySelector('.portfolio-popup');
    const popupImg = popup.querySelector('.popup-image');
    const img = element.querySelector('img');
    
    popupImg.src = img.src;
    popupImg.alt = img.alt;
    popup.style.display = 'block';
    
    // Prevent body scrolling when popup is open
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popup = document.querySelector('.portfolio-popup');
    popup.style.display = 'none';
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside the image
document.querySelector('.popup-overlay').addEventListener('click', closePopup);

// Close popup with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
});
