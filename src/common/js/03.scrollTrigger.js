(function () {
  window.INTERACTIVE = window.INTERACTIVE || {};

  class ScrollTrigger {
    constructor(section, params = { opts: {}, selector: {} }) {
      this.opts = {
        currDevice: '',
        prevDevice: '',
        activeType: 'oneWay', // oneWay, twoWay
        activeClass: 'is-active',
        activeCallback: () => {},
        detectiveCallback: () => {},
        windowOffset: 1,
        targetOffset: 1,
        ...params.opts,
      };

      this.selector = {
        section,
        targetElement: '',
        activeElement: '',
        ...params.selector,
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        targetElement: null,
        activeElement: null,
      };

      this.events = {
        load: this.onLoadHandler.bind(this),
        resize: this.onResizeHandler.bind(this),
        scroll: this.onScrollHandler.bind(this),
      };

      this.init();
    }

    init() {
      if (this.el.section === null) return;

      this.setElements();
      this.attachEvents();
    }

    setElements() {
      if (this.selector.targetElement !== '') {
        this.el.targetElement = this.el.section.querySelector(this.selector.targetElement);
      } else {
        this.el.targetElement = this.el.section;
      }
      if (this.selector.activeElement !== '') {
        this.el.activeElement = this.el.section.querySelector(this.selector.activeElement);
      } else {
        this.el.activeElement = this.el.section;
      }
    }

    attachEvents() {
      this.events.scroll();
      window.addEventListener('load', this.events.load);
      window.addEventListener('resize', this.events.resize);
      window.addEventListener('scroll', this.events.scroll);
    }

    onLoadHandler() {
      this.events.resize();
      this.events.scroll();

      window.removeEventListener('load', this.events.load);
    }

    onResizeHandler() {
      if (window.innerWidth > 1023) this.opts.currDevice = 'desktop';
      else if (window.innerWidth <= 1023 && window.innerWidth > 767) this.opts.currDevice = 'tablet';
      else this.opts.currDevice = 'mobile';

      this.events.scroll();

      if (this.opts.currDevice !== this.opts.prevDevice) {
        this.onResponsiveChange();
        this.opts.prevDevice = this.opts.currDevice;
      }
    }

    onResponsiveChange() {
      if (this.el.activeElement.classList.contains(this.opts.activeClass)) {
        this.el.activeElement.classList.remove(this.opts.activeClass);
      }
    }

    onScrollHandler() {
      const winOffsetTop = scrollY;
      const winOffsetTopReverse = winOffsetTop + innerHeight * (1 - this.opts.windowOffset);
      const startOffsetBottom = winOffsetTop + innerHeight * this.opts.windowOffset;
      const endOffsetBottom = winOffsetTop + innerHeight;

      const targetRect = this.el.targetElement.getBoundingClientRect();
      const targetOffsetTop = winOffsetTop + targetRect.top;
      const targetOffsetBottom = targetOffsetTop + this.el.targetElement.clientHeight * this.opts.targetOffset;
      const targetOffsetBottomReverse = targetOffsetTop + this.el.targetElement.clientHeight * (1 - this.opts.targetOffset);
      const targetOffsetOriginBottom = winOffsetTop + targetRect.bottom;

      if (this.opts.activeType === 'oneWay') {
        if (endOffsetBottom < targetOffsetTop) {
          if (this.el.activeElement.classList.contains(this.opts.activeClass)) {
            this.el.activeElement.classList.remove(this.opts.activeClass);
            this.opts.detectiveCallback();
          }
        } else if (startOffsetBottom > targetOffsetBottom) {
          if (!this.el.activeElement.classList.contains(this.opts.activeClass)) {
            this.el.activeElement.classList.add(this.opts.activeClass);
            this.opts.activeCallback();
          }
        }
      }

      if (this.opts.activeType === 'twoWay') {
        if (endOffsetBottom < targetOffsetTop || targetOffsetOriginBottom < winOffsetTop) {
          if (this.el.activeElement.classList.contains(this.opts.activeClass)) {
            this.el.activeElement.classList.remove(this.opts.activeClass);
            this.opts.detectiveCallback();
          }
        } else if (startOffsetBottom > targetOffsetBottom && targetOffsetBottomReverse > winOffsetTopReverse) {
          if (!this.el.activeElement.classList.contains(this.opts.activeClass)) {
            this.el.activeElement.classList.add(this.opts.activeClass);
            this.opts.activeCallback();
          }
        }
      }
    }
  }

  INTERACTIVE.ScrollTrigger = ScrollTrigger;
})();
