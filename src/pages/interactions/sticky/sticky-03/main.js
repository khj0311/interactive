(function () {
  class StickyMotion03 {
    constructor(section, opts) {
      this.opts = {
        prevScroll: 0,
        currScroll: 0,
        fixedScroll: 0,
        scrollDirection: 0,
        ...opts,
      };
      this.selector = {
        section,
        containerElement: '.sticky-container',
        wrapElement: '.sticky-wrap',
        fixedElement: '.sticky-content--fixed',
        fixedInnerElement: '.sticky-content__inner',
        scrollElement: '.sticky-content--scroll',
      };
      this.class = {
        featureHide: 'is-feature-hide',
        notFixed: 'not-fixed',
        ...opts,
      };
      this.el = {
        section: document.querySelector(this.selector.section) || null,
        containerElement: null,
        wrapElement: null,
        fixedElement: null,
        fixedInnerElement: null,
        scrollElement: null,
      };
      this.events = {
        scroll: this.onScrollHandler.bind(this),
      };
      this.init();
    }
    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;
      this.setElements();
      this.attachEvents();
      this.events.scroll();
    }
    setElements() {
      this.el.containerElement = this.el.section.querySelector(this.selector.containerElement);
      this.el.wrapElement = this.el.section.querySelector(this.selector.wrapElement);
      this.el.fixedElement = this.el.section.querySelector(this.selector.fixedElement);
      this.el.fixedInnerElement = this.el.fixedElement.querySelector(this.selector.fixedInnerElement);
      this.el.scrollElement = this.el.section.querySelector(this.selector.scrollElement);
    }
    attachEvents() {
      this.el.wrapElement.addEventListener('scroll', this.events.scroll);
    }

    onScrollHandler() {
      const wrapHeight = this.el.wrapElement.clientHeight;
      const wrapOffsetTop = this.el.wrapElement.scrollTop;
      const wrapOffsetBottom = wrapOffsetTop + wrapHeight;

      this.opts.currScroll = wrapOffsetTop;

      const fixedElOffsetTop = this.el.fixedElement.scrollHeight - wrapHeight;
      const scrollElHeight = this.el.scrollElement.scrollHeight;

      if (wrapOffsetBottom > 0 && wrapOffsetBottom <= scrollElHeight) {
        this.el.fixedElement.remove.bottom = '';

        this.el.wrapElement.classList.remove(this.class.notFixed);

        this.opts.fixedScroll += this.opts.prevScroll - this.opts.currScroll;

        if (Math.abs(this.opts.fixedScroll) > fixedElOffsetTop) {
          this.opts.fixedScroll = -fixedElOffsetTop;
        } else if (this.opts.fixedScroll > 0) {
          this.opts.fixedScroll = 0;
        }

        TweenMax.to(this.el.fixedInnerElement, 0, { ease: 'none', y: `${this.opts.fixedScroll}` });
      } else if (wrapOffsetBottom > scrollElHeight) {
        this.el.wrapElement.classList.add(this.class.notFixed);
        this.el.fixedElement.style.bottom = `-${scrollElHeight - wrapHeight - 1}px`;
      }

      this.opts.prevScroll = this.opts.currScroll;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new StickyMotion03('.sticky--sidebar');
  });
})();
