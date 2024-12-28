document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentItems = 6;

    // Initial setup - show only first 6 items
    function initializeGallery() {
        galleryItems.forEach((item, index) => {
            if (index < currentItems) {
                item.classList.remove('hidden');
                item.classList.add('visible');
            } else {
                item.classList.remove('visible');
                item.classList.add('hidden');
            }
        });
        updateLoadMoreButtonVisibility('all');
    }

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            currentItems = 6; // Reset count when switching categories
            
            const filterValue = btn.getAttribute('data-filter');
            let itemCount = 0;

            galleryItems.forEach((item) => {
                item.classList.remove('visible', 'hidden');
                
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    if (itemCount < currentItems) {
                        item.classList.add('visible');
                    } else {
                        item.classList.add('hidden');
                    }
                    itemCount++;
                } else {
                    item.classList.add('hidden');
                }
            });

            updateLoadMoreButtonVisibility(filterValue);
        });
    });

    // Load More functionality
    loadMoreBtn.addEventListener('click', () => {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        let visibleCount = 0;
        let itemsToShow = 6;
        
        galleryItems.forEach((item) => {
            if (activeFilter === 'all' || item.classList.contains(activeFilter)) {
                if (item.classList.contains('visible')) {
                    visibleCount++;
                } else if (itemsToShow > 0) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                    itemsToShow--;
                }
            }
        });

        currentItems += 6;
        updateLoadMoreButtonVisibility(activeFilter);
    });

    function updateLoadMoreButtonVisibility(filterValue) {
        const totalItems = filterValue === 'all' 
            ? galleryItems.length 
            : document.querySelectorAll(`.gallery-item.${filterValue}`).length;
        
        const visibleItems = document.querySelectorAll(`.gallery-item.visible`).length;
        
        loadMoreBtn.style.display = visibleItems < totalItems ? 'block' : 'none';
    }

    // Initialize gallery on page load
    initializeGallery();
});

document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    const popup = document.querySelector('.gallery-popup');
    const popupImage = document.getElementById('popupImage');
    const closeBtn = document.querySelector('.popup-close');
    const prevBtn = document.querySelector('.popup-nav.prev');
    const nextBtn = document.querySelector('.popup-nav.next');
    let currentImageIndex = 0;
    let visibleImages = [];

    // Update visible images array
    function updateVisibleImages() {
        visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
    }

    // Open popup
    function openPopup(image, index) {
        popup.style.display = 'flex';
        popupImage.src = image.src;
        popupImage.alt = image.alt;
        currentImageIndex = index;
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close popup
    function closePopup() {
        popup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Navigate to previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + visibleImages.length) % visibleImages.length;
        popupImage.src = visibleImages[currentImageIndex].src;
        popupImage.alt = visibleImages[currentImageIndex].alt;
    }

    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % visibleImages.length;
        popupImage.src = visibleImages[currentImageIndex].src;
        popupImage.alt = visibleImages[currentImageIndex].alt;
    }

    // Event Listeners
    galleryGrid.addEventListener('click', (e) => {
        const clickedItem = e.target.closest('.gallery-item');
        if (clickedItem) {
            const img = clickedItem.querySelector('img');
            updateVisibleImages();
            const index = visibleImages.indexOf(img);
            if (index !== -1) {
                openPopup(img, index);
            }
        }
    });

    closeBtn.addEventListener('click', closePopup);
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopup();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // Close on clicking outside the image
    popup.addEventListener('click', (e) => {
        if (e.target === popup) closePopup();
    });

    // Add click event on the gallery popup (the dark overlay)
    const galleryPopup = document.querySelector('.gallery-popup');
    const popupContent = document.querySelector('.popup-content');
    
    // Close popup when clicking anywhere on the overlay (dark area)
    galleryPopup.addEventListener('click', (e) => {
        if (e.target === galleryPopup) {
            closePopup();
        }
    });
    
    // Prevent popup from closing when clicking on the image or navigation buttons
    popupContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
