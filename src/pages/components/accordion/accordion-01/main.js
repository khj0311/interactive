(function () {
  class AccordionBasic {
    constructor(section, opts) {
      this.opts = {
        ...opts,
      };
      this.selector = {
        section,
        wrapper: '.accordion-list',
        accordionItem: '.accordion-item',
        accordionBtn: '.accordion-question__arrow',
        accordionContent: '.accordion-answer',
      };
      this.class = {
        featureHide: 'is-feature-hide',
        open: 'is-open',
      };
      this.el = {
        section: document.querySelector(this.selector.section) || null,
        wrapper: null,
        accordionItem: null,
        accordionBtns: null,
        accordionContent: null,
      };
      this.events = {
        click: this.onClickHandler.bind(this),
      };
      this.init();
    }
    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;

      this.setElements();
      this.attachEvents();
    }
    setElements() {
      this.el.wrapper = this.el.section.querySelector(this.selector.wrapper);
      this.el.accordionBtns = this.el.wrapper.querySelectorAll(this.selector.accordionBtn);
    }
    attachEvents() {
      Array.from(this.el.accordionBtns).forEach((button, index) => {
        button.addEventListener('click', (e) => this.events.click(e, index));
      });
    }

    onClickHandler(e) {
      const target = e.target;
      this.el.accordionItem = target.closest(this.selector.accordionItem);
      this.el.accordionContent = this.el.accordionItem.querySelector(this.selector.accordionContent);
      const contentHeight = this.el.accordionContent.scrollHeight;

      this.el.accordionContent.style.height = '';
      if (!this.el.accordionItem.classList.contains(this.class.open)) {
        this.el.accordionItem.classList.add(this.class.open);
        this.el.accordionContent.style.height = `${contentHeight}px`;
      } else {
        this.el.accordionItem.classList.remove(this.class.open);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new AccordionBasic('.accordion.accordion--basic');
  });
})();
