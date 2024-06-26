(function () {
  class AccordionToggle {
    constructor(section, opts) {
      this.opts = {
        activeIndex: 0,
        activeContentHeight: 0,
        isActiveTab: null,
        ...opts,
      };
      this.selector = {
        section,
        wrapperElement: '.accordion-list',
        targetElement: '.accordion-item',
        buttonElement: '.accordion-title__arrow',
        contentWrapElement: '.accordion-content__wrap',
        contentElement: '.accordion-content',
      };
      this.class = {
        featureHide: 'is-feature-hide',
        open: 'is-open',
      };
      this.el = {
        section: document.querySelector(this.selector.section) || null,
        wrapperElement: null,
        targetElements: null,
        buttonElements: null,
        contentWrapElements: null,
        contentElements: null,
      };
      this.events = {
        click: this.onClickHandler.bind(this),
        resize: this.onResizeHandler.bind(this),
      };
      this.init();
    }
    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;
      this.setElements();
      this.attachEvents();
    }
    setElements() {
      this.el.wrapperElement = this.el.section.querySelector(this.selector.wrapperElement);
      this.el.targetElements = this.el.wrapperElement.querySelectorAll(this.selector.targetElement);
      this.el.contentWrapElements = this.el.wrapperElement.querySelectorAll(this.selector.contentWrapElement);
      this.el.contentElements = this.el.wrapperElement.querySelectorAll(this.selector.contentElement);
      this.el.buttonElements = this.el.wrapperElement.querySelectorAll(this.selector.buttonElement);
    }
    attachEvents() {
      Array.from(this.el.buttonElements).forEach((button, index) => {
        button.addEventListener('click', (e) => this.events.click(e, index));
      });
      window.addEventListener('resize', this.events.resize);
    }

    onResizeHandler() {
      Array.from(this.el.targetElements).forEach((item, index) => {
        if (item.classList.contains(this.class.open)) this.opts.isActiveTab = true;
      });

      if (this.opts.isActiveTab !== true) return;

      this.opts.activeContentHeight = this.el.contentElements[this.opts.activeIndex].scrollHeight;
      this.el.contentWrapElements[this.opts.activeIndex].style.height = `${this.opts.activeContentHeight}px`;
    }

    onClickHandler(e) {
      const target = e.target;
      const targetItem = target.closest(this.selector.targetElement);

      this.opts.activeIndex = Array.from(this.el.targetElements).indexOf(targetItem);

      const activeContentWrap = this.el.contentWrapElements[this.opts.activeIndex];
      const activeContent = this.el.contentElements[this.opts.activeIndex];
      this.opts.activeContentHeight = activeContent.scrollHeight;

      if (!targetItem.classList.contains(this.class.open)) {
        for (let i = 0; i < this.el.targetElements.length; i++) {
          this.el.targetElements[i].classList.remove(this.class.open);
          this.el.contentWrapElements[i].style.height = '0';
        }
        targetItem.classList.add(this.class.open);
        activeContentWrap.style.height = `${this.opts.activeContentHeight}px`;
      } else {
        targetItem.classList.remove(this.class.open);
        activeContentWrap.style.height = '0';
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new AccordionToggle('.accordion.accordion--toggle');
  });
})();
