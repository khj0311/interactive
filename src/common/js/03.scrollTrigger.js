(function() {
  window.INTERACTIVE = window.INTERACTIVE || {};

  class ScrollTrigger {
    constructor(featureSelector, params) {
      const defaultParams = {
        activeType: 'oneWay', // oneWay, twoWay
        targetSelector: null,
        activeSelector: null,
        targetElement: null,
        activeElement: null,
        activeClass: 'is-active',
        detectiveClass: '',
        activeCallback: () => {},
        detectiveCallback: () => {},
        windowOffset: 1,
        targetOffset: 1
      };

      this.featureElement = featureSelector ? document.querySelector(featureSelector) : document;
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
      if (this.params.targetSelector !== null && typeof this.params.targetSelector === 'string') {
        this.params.targetElement = this.featureElement.querySelector(this.params.targetSelector);

        if (this.params.activeSelector === null) {
          this.params.activeElement = this.params.targetElement;
        }
      }

      if (this.params.activeSelector !== null && typeof this.params.activeSelector === 'string') {
        this.params.activeElement = this.featureElement.querySelector(this.params.activeSelector);

        if (this.params.targetSelector === null) {
          this.params.targetElement = this.params.activeElement;
        }
      }

      if (this.featureSelector !== null && this.params.targetSelector === null && this.params.activeSelector === null) {
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
      const winOffsetTopReverse = window.scrollY + window.innerHeight * (1 - this.params.windowOffset);
      const startOffsetBottom = winOffsetTop + window.innerHeight * this.params.windowOffset;
      const endOffsetBottom = winOffsetTop + window.innerHeight;

      const targetOffsetTop = winOffsetTop + this.params.targetElement.getBoundingClientRect().top;
      const targetOffsetBottom = targetOffsetTop + this.params.targetElement.clientHeight * this.params.targetOffset;
      const targetOffsetBottomReverse = targetOffsetTop + this.params.targetElement.clientHeight * (1 - this.params.targetOffset);
      const targetOffsetOriginBottom = winOffsetTop + this.params.targetElement.getBoundingClientRect().bottom;

      if (this.params.activeType === 'oneWay') {
        if (endOffsetBottom < targetOffsetTop) {
          if (this.params.activeElement.classList.contains(this.params.activeClass)) {
            this.params.activeElement.classList.remove(this.params.activeClass);
            this.params.detectiveCallback();
          }
        }

        if (startOffsetBottom > targetOffsetBottom) {
          if (!this.params.activeElement.classList.contains(this.params.activeClass)) {
            this.params.activeElement.classList.add(this.params.activeClass);
            this.params.activeCallback();
          }
        }
      }

      if (this.params.activeType === 'twoWay') {
        if (endOffsetBottom < targetOffsetTop || targetOffsetOriginBottom < winOffsetTop) {
          if (this.params.activeElement.classList.contains(this.params.activeClass)) {
            this.params.activeElement.classList.remove(this.params.activeClass);
            this.params.detectiveCallback();
          }
        }

        if (startOffsetBottom > targetOffsetBottom && targetOffsetBottomReverse > winOffsetTopReverse) {
          if (!this.params.activeElement.classList.contains(this.params.activeClass)) {
            this.params.activeElement.classList.add(this.params.activeClass);
            this.params.activeCallback();
          }
        }
      }
    }
  }

  INTERACTIVE.ScrollTrigger = ScrollTrigger;
})();
