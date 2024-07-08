// Sticky 01
(function () {
  class StickyMotion01 {
    constructor(featureElement, params) {
      const defaultParams = {
        wrapperElement: null,
        targetElement: null,
        activeElement: null,
        activeClass: 'is-active',
        detectiveClass: '',
      };

      this.featureElement = featureElement ? document.querySelector(featureElement) : document;
      this.params = { ...defaultParams, ...params };

      this.events = {
        load: this.onLoadHandler.bind(this),
        scroll: this.onScrollHandler.bind(this),
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

        if (this.params.targetElement === null) {
          this.params.targetElement = this.featureElement.querySelector(this.params.wrapperElement);
        }
      }

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

      if (this.featureElement !== null && this.params.wrapperElement === null && this.params.targetElement === null && this.params.activeElement === null) {
        this.params.wrapperElement = this.wrapperElement;
        this.params.activeElement = this.activeElement;
        this.params.targetElement = this.targetElement;
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

      const targetOffsetTop = winOffsetTop + this.params.wrapperElement.getBoundingClientRect().top;
      const targetOffsetBottom = targetOffsetTop + this.params.wrapperElement.clientHeight;

      const percentage = (winOffsetTop - targetOffsetTop) / (this.params.wrapperElement.clientHeight - window.innerHeight);
      const transY = percentage * (this.params.activeElement.clientHeight - this.params.targetElement.clientHeight);

      if (winOffsetTop >= targetOffsetTop && winOffsetBottom <= targetOffsetBottom) {
        TweenMax.to(this.params.activeElement, 0.1, {
          ease: 'power1.out',
          y: `${-transY}px`,
        });
      } else {
        if (winOffsetTop < targetOffsetTop) {
          TweenMax.to(this.params.activeElement, 0.1, {
            ease: 'power1.out',
            y: 0,
          });
        } else if (winOffsetBottom > targetOffsetBottom) {
          TweenMax.to(this.params.activeElement, 0.1, {
            ease: 'power1.out',
            y: `-${this.params.activeElement.clientHeight - this.params.targetElement.clientHeight}px`,
          });
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = {
      wrapperElement: '.sticky-track',
      targetElement: '.sticky-obj__bg',
      activeElement: '.sticky-obj__bg img',
    };

    new StickyMotion01('.sticky--anim', params);
  });
})();
