(function () {
  class cardSticky {
    constructor(section, opts) {
      this.opts = {
        opacity: 0.5,
        scale: 0.9,
        translateY: -10,
        ...opts,
      };
      this.selector = {
        section,
        containerElement: '.mtg-comp-card-sticky__list',
        targetElement: '.mtg-comp-card-sticky__item',
        dimmElement: '.mtg-comp-card-sticky__dimm',
        contentElement: '.mtg-comp-card-sticky__content',
      };
      this.class = {
        featureHide: 'is-feature-hide',
        fixed: 'fixed',
      };
      this.el = {
        section: document.querySelector(this.selector.section) || null,
        containerElement: null,
        targetsElement: null,
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
      this.el.targetsElement = this.el.section.querySelectorAll(this.selector.targetElement);
    }
    attachEvents() {
      window.addEventListener('scroll', this.events.scroll);
    }

    onScrollHandler() {
      const winOffsetTop = window.screenY;

      const sectionOffsetTop = this.el.section.getBoundingClientRect().top;
      const sectionOffsetBottom = this.el.section.getBoundingClientRect().bottom;

      if (winOffsetTop > sectionOffsetTop && winOffsetTop < sectionOffsetBottom) {
        Array.from(this.el.targetsElement).forEach((item, index) => {
          if (index == this.el.targetsElement.length - 1) return;

          const dimmElement = item.querySelector(this.selector.dimmElement);
          const contentElement = item.querySelector(this.selector.contentElement);
          const itemOffsetTop = item.getBoundingClientRect().top;
          const itemHeight = item.clientHeight;

          if (winOffsetTop > itemOffsetTop && -sectionOffsetTop < itemHeight * (index + 1)) {
            const percent = Math.round((-(sectionOffsetTop + itemHeight * index) / itemHeight) * 100);
            const opacity = this.opts.opacity * (percent / 100);
            const scale = 1 + (this.opts.scale - 1) * (percent / 100);
            const translateY = 1 + (this.opts.translateY - 1) * (percent / 100);

            TweenMax.to(dimmElement, 0.2, { opacity: opacity });
            TweenMax.to(contentElement, 0.2, { scale: scale });
            TweenMax.to(item, 0.2, { translateY: `${translateY}%` });

            item.classList.add(this.class.fixed);
          }
        });
      }
    }
  }

  window.addEventListener('load', () => {
    new cardSticky('.mtg-comp-card-sticky');
  });
})();
