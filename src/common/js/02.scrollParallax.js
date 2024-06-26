(function() {
  window.INTERACTIVE = window.INTERACTIVE || {};

  class ScrollParallax {
    constructor(featureElement, params) {
      const defaultParams = {
        standard: 'top',
        startPosition: 0,
        endPosition: 0,
        targetElement: null,
        activeElement: null,
        completeClass: 'is-complete',
        duration: 0.2,
        unit: '%'
      };

      this.featureElement = featureElement ? document.querySelector(featureElement) : document;
      this.params = { ...defaultParams, ...params };

      this.events = {
        load: this.onLoadHandler.bind(this),
        scroll: this.onScrollHandler.bind(this)
      };

      this.init();
    }

    init() {
      this.setElements();
      this.attachEvents();
    }

    setElements() {
      if (this.params.targetElement !== null && typeof this.params.targetElement === 'string') {
        this.params.targetElement = this.featureElement.querySelector(this.params.targetElement);

        if (this.params.activeElement === null) {
          this.params.activeElement = this.featureElement.querySelector(this.params.targetElement);
        }
      }

      if (this.params.activeElement !== null && typeof this.params.activeElement === 'string') {
        this.params.activeElement = this.featureElement.querySelector(this.params.activeElement);

        if (this.params.targetElement === null) {
          this.params.targetElement = this.featureElement.querySelector(this.params.activeElement);
        }
      }

      if (this.featureElement !== null && this.params.targetElement === null && this.params.activeElement === null) {
        this.params.activeElement = this.featureElement;
        this.params.targetElement = this.featureElement;
      }
    }

    attachEvents() {
      this.events.scroll();
      window.addEventListener('load', this.events.load);
      window.addEventListener('scroll', this.events.scroll);
    }

    onLoadHandler() {
      this.events.scroll();
      window.removeEventListener('load', this.events.load);
    }

    onScrollHandler() {
      const winOffsetTop = window.scrollY;
      const winOffsetBottom = winOffsetTop + window.innerHeight;

      const targetOffsetTop = winOffsetTop + this.params.targetElement.getBoundingClientRect().top;
      const targetOffsetBottom = targetOffsetTop + this.params.targetElement.clientHeight;

      const enableParallax = percentage => {
        if (this.params.targetElement.classList.contains(this.params.completeClass)) {
          this.params.targetElement.classList.remove(this.params.completeClass);
        }
        TweenMax.to(this.params.activeElement ? this.params.activeElement : this.params.targetElement, this.params.duration, {
          ease: 'power1.out',
          y: `${percentage}${this.params.unit}`
        });
      };

      const disableParallax = () => {
        if (this.params.targetElement.classList.contains(this.params.completeClass)) return;
        if (winOffsetBottom < targetOffsetBottom) {
          TweenMax.to(this.params.activeElement ? this.params.activeElement : this.params.targetElement, this.params.duration, {
            ease: 'power1.out',
            y: `${this.params.startPosition}${this.params.unit}`
          });
        } else {
          TweenMax.to(this.params.activeElement ? this.params.activeElement : this.params.targetElement, this.params.duration, {
            ease: 'power1.out',
            y: `${this.params.endPosition}${this.params.unit}`
          });
        }
        if (!this.params.targetElement.classList.contains(this.params.completeClass)) {
          this.params.targetElement.classList.add(this.params.completeClass);
        }
      };

      const range = Math.abs(this.params.endPosition - this.params.startPosition);

      if (this.params.standard === 'top') {
        if (winOffsetBottom >= targetOffsetTop && winOffsetTop <= targetOffsetBottom) {
          const percentage = (winOffsetBottom - targetOffsetTop) / (window.innerHeight + this.params.targetElement.clientHeight);
          const move = this.params.startPosition > this.params.endPosition ? this.params.startPosition - percentage * range : percentage * range + this.params.startPosition;

          enableParallax(move);
        } else {
          disableParallax();
        }
      } else {
        if (winOffsetBottom >= targetOffsetBottom && winOffsetTop <= targetOffsetTop) {
          const percentage = (winOffsetBottom - targetOffsetBottom) / (window.innerHeight - this.params.targetElement.clientHeight);
          const move = this.params.startPosition > this.params.endPosition ? this.params.startPosition - percentage * range : percentage * range + this.params.startPosition;

          enableParallax(move);
        } else {
          disableParallax();
        }
      }
    }
  }

  INTERACTIVE.ScrollParallax = ScrollParallax;
})();
