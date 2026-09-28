/**
 * PIVO — Russian Cultural Beer
 * Interactive Hero Carousel / Slider
 */

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator-btn');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const sliderSection = document.getElementById('hero-slider');

  let currentSlide = 0;
  let autoplayTimer = null;
  const totalSlides = slides.length;
  const slideDuration = 6000; // 6 seconds per slide

  function updateControls() {
    // Hide left arrow button on the first slide
    if (prevBtn) {
      if (currentSlide === 0) {
        prevBtn.style.opacity = '0';
        prevBtn.style.visibility = 'hidden';
        prevBtn.style.pointerEvents = 'none';
      } else {
        prevBtn.style.opacity = '1';
        prevBtn.style.visibility = 'visible';
        prevBtn.style.pointerEvents = 'auto';
      }
    }
  }

  function goToSlide(index) {
    if (index < 0) {
      currentSlide = 0;
    } else if (index >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }

    // Update active slide
    slides.forEach((slide, i) => {
      if (i === currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // Update indicator buttons
    indicators.forEach((btn, i) => {
      if (i === currentSlide) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateControls();
  }

  function nextSlide() {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }

  // Button Listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  // Indicator Listeners
  indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
      const targetIndex = parseInt(indicator.dataset.slide, 10);
      goToSlide(targetIndex);
      resetAutoplay();
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      nextSlide();
      resetAutoplay();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
      resetAutoplay();
    }
  });

  // Autoplay functionality
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, slideDuration);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause autoplay on mouse hover
  if (sliderSection) {
    sliderSection.addEventListener('mouseenter', stopAutoplay);
    sliderSection.addEventListener('mouseleave', startAutoplay);
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (sliderSection) {
    sliderSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      resetAutoplay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      resetAutoplay();
    }
  }

  // Initialize
  goToSlide(0);
  startAutoplay();

  console.log('🍺 PIVO Webpage slider initialized.');
});
