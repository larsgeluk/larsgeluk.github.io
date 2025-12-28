document.addEventListener("DOMContentLoaded", function () {
  'use strict';

  const html = document.querySelector('html'),
  menuToggle = document.querySelector(".hamburger"),
  menuList = document.querySelector(".main-nav"),
  toggleTheme = document.querySelector(".toggle-theme"),
  splides = document.querySelector(".hero__logos"),
  featuredSlider = document.querySelector(".featured__slider__inner"),
  testimonialsSlider = document.querySelector(".testimonials__slider");


  /* =======================================================
  // Menu + Theme Switcher
  ======================================================= */
  menuToggle.addEventListener("click", () => {
    menu();
  });

  // Menu
  function menu() {
    menuToggle.classList.toggle("is-open");
    menuList.classList.toggle("is-visible");
  }

  // Theme Switcher
  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      darkMode();
    });
  };

  function darkMode() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("dark");
    } else {
      html.classList.add('dark-mode');
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("dark", "");
    }
  };


  /* ============================
  // Logos Slider
  ============================ */
  if (splides) {
    new Splide(splides, {
      direction: 'ltr',
      clones: 9,
      gap: 16,
      autoWidth: true,
      drag: false,
      arrows: false,
      pagination: false,
      type: 'loop',
      autoScroll: {
        autoStart: true,
        speed: 0.4,
        pauseOnHover: false,
        pauseOnFocus: false
      }
    }).mount(window.splide.Extensions);
  }


  /* ============================
  // Featured Slider
  ============================ */
  if (featuredSlider) {
    new Splide(featuredSlider, {
      perPage: 3,
      perMove: 1,
      gap: 32,
      pagination: false,
      breakpoints: {
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1
        }
      }
    }).mount();
  }


  /* ============================
  // Testimonials Slider
  ============================ */
  if (testimonialsSlider) {
    new Splide(testimonialsSlider, {
      perPage: 3,
      perMove: 1,
      gap: 32,
      arrows: false,
      drag: false,
      pagination: false,
      type: 'loop',
      autoScroll: {
        autoStart: true,
        speed: 0.8,
        pauseOnHover: false,
        pauseOnFocus: false
      },
      breakpoints: {
        1024: {
          perPage: 2
        },
        768: {
          perPage: 1
        }
      }
    }).mount(window.splide.Extensions);
  }


  /* ============================
  // Media Carousel Slider
  ============================ */
  var mediaCarousel = document.querySelector('.media__slider__inner.splide');
  if (mediaCarousel) {
    new Splide(mediaCarousel, {
      type: 'fade',
      perPage: 1,
      arrows: true,
      pagination: false,
      gap: '0',
      speed: 800, // smoother fade
    }).mount();
  }


  /* ============================
  // Full-width Media Carousel (fade transition, custom nav)
  ============================ */
  document.querySelectorAll('.fullwidth-carousel__slider.splide').forEach(function (carousel) {
    var splideInstance = new Splide(carousel, {
      type: 'fade',
      rewind: true,
      perPage: 1,
      arrows: false, // We use custom arrows
      pagination: false,
      speed: 600,
      easing: 'ease-in-out',
    });

    splideInstance.mount();

    // Function to pause all YouTube videos in the carousel
    function pauseYouTubeVideos() {
      var iframes = carousel.querySelectorAll('iframe');
      iframes.forEach(function (iframe) {
        if (iframe.src.includes('youtube')) {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      });
    }

    // Pause videos when slide changes
    splideInstance.on('move', function () {
      pauseYouTubeVideos();
    });

    // Connect custom navigation buttons
    var container = carousel.closest('.fullwidth-carousel');
    if (container) {
      var prevBtn = container.querySelector('.fullwidth-carousel__nav--prev');
      var nextBtn = container.querySelector('.fullwidth-carousel__nav--next');

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          splideInstance.go('<');
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          splideInstance.go('>');
        });
      }
    }
  });


  /* ================================================================
  // Stop Animations During Window Resizing and Switching Theme Modes
  ================================================================ */
  let disableTransition;

  if (toggleTheme) {
    toggleTheme.addEventListener("click", () => {
      stopAnimation();
    });
  }

  window.addEventListener("resize", () => {
    stopAnimation();
  });

  function stopAnimation() {
    document.body.classList.add("disable-animation");
    clearTimeout(disableTransition);
    disableTransition = setTimeout(() => {
      document.body.classList.remove("disable-animation");
    }, 100);
  };


  /* =======================
  // Responsive Videos
  ======================= */
  reframe(".post__content iframe:not(.reframe-off), .page__content iframe:not(.reframe-off)");


  /* =======================
  // LazyLoad Images
  ======================= */
  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  })


  /* =======================
  // Zoom Image
  ======================= */
  const lightense = document.querySelector(".page__content img, .post__content img, .project-content img, .gallery__image img, .video-gallery-vertical__image img"),
    imageLink = document.querySelectorAll(".page__content a img, .post__content a img, .project-content a img, .gallery__image a img, .video-gallery-vertical__image a img");

  if (imageLink) {
    for (var i = 0; i < imageLink.length; i++) imageLink[i].parentNode.classList.add("image-link");
    for (var i = 0; i < imageLink.length; i++) imageLink[i].classList.add("no-lightense");
  }

  if (lightense) {
    Lightense(".page__content img:not(.no-lightense), .post__content img:not(.no-lightense), .project-content img:not(.no-lightense), .gallery__image img:not(.no-lightense), .video-gallery-vertical__image img:not(.no-lightense)", {
      padding: 60,
      offset: 30
    });
  }


  // =====================
  // Load More Posts
  // =====================
  var load_posts_button = document.querySelector('.load-more-posts');

  load_posts_button && load_posts_button.addEventListener("click", function (e) { e.preventDefault(); var o = document.querySelector(".pagination"), e = pagination_next_url.split("/page")[0] + "/page/" + pagination_next_page_number + "/"; fetch(e).then(function (e) { if (e.ok) return e.text() }).then(function (e) { var n = document.createElement("div"); n.innerHTML = e; for (var t = document.querySelector(".grid"), a = n.querySelectorAll(".article__grid"), i = 0; i < a.length; i++)t.appendChild(a.item(i)); new LazyLoad({ elements_selector: ".lazy" }); pagination_next_page_number++, pagination_next_page_number > pagination_available_pages_number && (o.style.display = "none") }) });


  /* =================================
  // Accordion
  ================================= */
  const items = document.querySelectorAll(".faq .faq__item");

  function toggleAccordion() {
    const itemToggle = this.getAttribute('data-name');

    if (itemToggle === 'closed') {
      this.setAttribute('data-name', 'open');
    } else {
      this.setAttribute('data-name', 'closed');
    }
  }

  items.forEach(item => {
    item.addEventListener('click', toggleAccordion);
    item.addEventListener('keydown', function (event) {
      if (event.keyCode === 13) {
        toggleAccordion.call(this);
      }
    });
  });


  /* ============================
  // Image Banner - Auto-fit height
  ============================ */
  function fitImageBanners() {
    const banners = document.querySelectorAll('.image-banner');
    const mobileBreakpoint = 768;
    
    banners.forEach(banner => {
      const grid = banner.querySelector('.image-banner__grid');
      const itemElements = banner.querySelectorAll('.image-banner__item');
      const items = banner.querySelectorAll('.image-banner__item img');
      
      if (!grid || items.length === 0) return;
      
      // Wait for all images to load
      const images = Array.from(items);
      const loadPromises = images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      
      Promise.all(loadPromises).then(() => {
        // Get aspect ratios (width/height) for each image
        const aspectRatios = images.map(img => img.naturalWidth / img.naturalHeight);
        
        // Calculate available width
        const containerWidth = banner.clientWidth;
        const padding = parseFloat(getComputedStyle(banner).paddingLeft) + parseFloat(getComputedStyle(banner).paddingRight);
        const isMobile = window.innerWidth <= mobileBreakpoint;
        const gap = isMobile ? 10 : 20;
        
        if (isMobile && images.length > 1) {
          // Split into two rows on mobile
          const midpoint = Math.ceil(images.length / 2);
          const row1Ratios = aspectRatios.slice(0, midpoint);
          const row2Ratios = aspectRatios.slice(midpoint);
          
          const row1Gaps = (row1Ratios.length - 1) * gap;
          const row2Gaps = (row2Ratios.length - 1) * gap;
          const availableWidth = containerWidth - padding;
          
          const row1Sum = row1Ratios.reduce((sum, r) => sum + r, 0);
          const row2Sum = row2Ratios.reduce((sum, r) => sum + r, 0);
          
          const row1Height = (availableWidth - row1Gaps) / row1Sum;
          const row2Height = row2Ratios.length > 0 ? (availableWidth - row2Gaps) / row2Sum : 0;
          
          // Apply heights to individual items
          itemElements.forEach((item, i) => {
            if (i < midpoint) {
              item.style.height = Math.floor(row1Height) + 'px';
            } else {
              item.style.height = Math.floor(row2Height) + 'px';
            }
          });
          
          grid.style.height = 'auto';
        } else {
          // Single row - original logic
          const totalGaps = (images.length - 1) * gap;
          const availableWidth = containerWidth - padding - totalGaps;
          const sumAspectRatios = aspectRatios.reduce((sum, ratio) => sum + ratio, 0);
          const optimalHeight = availableWidth / sumAspectRatios;
          
          // Reset individual item heights
          itemElements.forEach(item => {
            item.style.height = '100%';
          });
          
          grid.style.height = Math.floor(optimalHeight) + 'px';
        }
      });
    });
  }
  
  // Run on load and resize
  fitImageBanners();
  window.addEventListener('resize', fitImageBanners);

});