// CarouselTab
(function () {
  let currDevice = 'desktop';
  let prevDevice = null;

  class CarouselTab {
    constructor(featureElement, params) {
      const defaultParams = {
        resizeTimeout: null,
        swiper: null,
        prevIndex: 0,
        wrapperElement: null,
        swiperElement: null,
        swiperControlElement: null,
        tabButtonElements: null,
        featureClass: null,
        playClass: null,
        pauseClass: null,
        activeClass: 'is-active',
      };

      this.featureElement = featureElement ? document.querySelector(featureElement) : document;
      this.params = { ...defaultParams, ...params };

      this.events = {
        load: this.onLoadHandler.bind(this),
        resize: this.onResizeHandler.bind(this),
        controlClick: this.onClickHandler.bind(this),
        tabButtonClick: this.onClickTabButton.bind(this),
      };

      this.init();
    }

    init() {
      this.setElements();
      this.attachEvents();
    }

    setElements() {
      if (this.params.wrapperElement !== null && typeof this.params.wrapperElement === 'string') {
        this.params.wrapperElement = this.featureElement.querySelector(this.params.wrapperElement);
      }

      if (this.params.swiperElement !== null && typeof this.params.swiperElement === 'string') {
        this.params.swiperElement = this.featureElement.querySelector(this.params.swiperElement);
      }

      if (this.params.swiperControlElement !== null && typeof this.params.swiperControlElement === 'string') {
        this.params.swiperControlElement = this.featureElement.querySelector(this.params.swiperControlElement);
      }

      if (this.params.tabButtonElements !== null && typeof this.params.tabButtonElements === 'string') {
        this.params.tabButtonElements = this.featureElement.querySelectorAll(this.params.tabButtonElements);
        this.params.tabButtonElements = Array.prototype.slice.call(this.params.tabButtonElements);
      }

      if (
        this.featureElement !== null &&
        this.params.wrapperElement === null &&
        this.params.targetElement === null &&
        this.params.swiperControlElement === null &&
        this.params.tabButtonElements === null
      ) {
        this.params.wrapperElement = this.wrapperElement;
        this.params.targetElement = this.targetElement;
        this.params.swiperControlElement = this.swiperControlElement;
        this.params.tabButtonElements = this.tabButtonElements;
      }

      const scrollTrigger = new INTERACTIVE.ScrollTrigger(this.params.featureClass, {
        targetSelector: '.carousel-animals__carousel',
        activeCallback: () => {
          if (this.params.swiper !== null) {
            this.params.swiper.autoplay.start();
          }
        },
        detectiveCallback: () => {
          if (this.params.swiper !== null) {
            this.params.swiper.autoplay.stop();
            this.params.swiper.slideToLoop(0, 0);
          }
        },
      });
    }

    attachEvents() {
      window.addEventListener('load', this.events.load);
      window.addEventListener('resize', this.events.resize);

      this.params.swiperControlElement.addEventListener('click', this.events.controlClick);
      this.params.tabButtonElements.forEach((btn) => {
        btn.addEventListener('click', this.events.tabButtonClick);
      });
    }

    onLoadHandler() {
      this.events.resize();
      window.removeEventListener('load', this.events.load);
    }

    onResizeHandler() {
      if (window.innerWidth >= 1024) currDevice = 'desktop';
      else if (window.innerWidth < 1024 && window.innerWidth >= 768) currDevice = 'tablet';
      else currDevice = 'mobile';

      clearTimeout(this.params.resizeTimeout);
      this.params.resizeTimeout = setTimeout(() => {
        if (currDevice !== prevDevice) {
          this.onResponsiveChange();
          prevDevice = currDevice;
        }
      }, 150);
    }

    onResponsiveChange() {
      this.destroySwiper();
      this.setSwiper();
    }

    onClickHandler() {
      if (this.params.swiper !== null) {
        const autoplay = this.params.swiper.autoplay;
        if (!autoplay.running) {
          autoplay.start();
        } else {
          autoplay.stop();
        }
      }
    }

    onClickTabButton(e) {
      if (this.params.swiper !== null) {
        const currentIndex = this.params.tabButtonElements.indexOf(e.currentTarget);
        this.params.swiper.slideToLoop(currentIndex);
      }
    }

    setSwiper() {
      if (this.params.swiper === null) {
        this.params.swiper = new Swiper(this.params.swiperElement, {
          init: false,
          loop: true,
          autoplay: {
            disableOnInteraction: false,
          },
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
        });

        this.params.swiper.on('autoplayStart', () => {
          this.params.wrapperElement.classList.remove(this.params.pauseClass);
          this.params.wrapperElement.classList.add(this.params.playClass);
        });

        this.params.swiper.on('autoplayStop', () => {
          this.params.wrapperElement.classList.add(this.params.pauseClass);
          this.params.wrapperElement.classList.remove(this.params.playClass);
        });

        this.params.swiper.on('slideChange', () => {
          this.params.tabButtonElements[this.params.swiper.realIndex].classList.add(this.params.activeClass);
          this.params.tabButtonElements[this.params.prevIndex].classList.remove(this.params.activeClass);
          this.params.prevIndex = this.params.swiper.realIndex;
        });

        this.params.swiper.init();
      }
    }

    destroySwiper() {
      if (this.params.swiper !== null) {
        this.params.swiper.destroy();
        this.params.swiper = null;
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = {
      wrapperElement: '.carousel-animals__carousel',
      swiperElement: '.carousel-panel',
      swiperControlElement: '.carousel-control',
      featureClass: '.carousel',
      playClass: 'carousel-animals__carousel--running',
      pauseClass: 'carousel-animals__carousel--paused',
      tabButtonElements: '.carousel-tab__button',
    };

    new CarouselTab('.carousel.carousel--tab', params);
  });
})();
