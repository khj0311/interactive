(function () {
  class RatingsToggle {
    constructor(section, opts) {
      this.opts = {
        defaultIndex: 2, // 0부터 시작
        prevIndex: null,
        isInitValue: false,
        ...opts,
      };

      this.selector = {
        section,
        labelElement: '.ratings-label',
        radioElement: '.ratings-radio',
        numberElement: '.ratings-title__number',
      };

      this.class = {
        featureHide: 'is-feature-hide',
        active: 'active',
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        labelElements: null,
        radioElements: null,
        numberElement: null,
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
      this.el.labelElements = this.el.section.querySelectorAll(this.selector.labelElement);
      this.el.radioElements = this.el.section.querySelectorAll(this.selector.radioElement);
      this.el.numberElement = this.el.section.querySelector(this.selector.numberElement);
    }

    attachEvents() {
      Array.from(this.el.radioElements).forEach((radio, index) => {
        radio.addEventListener('click', () => this.events.click(index));
      });

      this.onClickHandler(this.opts.defaultIndex);
    }

    onClickHandler(clickedIndex) {
      if (this.opts.prevIndex !== null && this.opts.prevIndex === clickedIndex && !this.opts.isInitValue) {
        this.opts.isInitValue = true;
        this.el.numberElement.innerText = 0;
        this.opts.prevIndex = null;

        Array.from(this.el.labelElements).forEach((label) => {
          label.classList.remove(this.class.active);
        });

        return;
      }

      this.opts.isInitValue = false;
      this.el.numberElement.innerText = clickedIndex + 1;
      this.opts.prevIndex = clickedIndex;

      Array.from(this.el.labelElements).forEach((label, index) => {
        if (index <= clickedIndex) {
          label.classList.add(this.class.active);
        } else {
          label.classList.remove(this.class.active);
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new RatingsToggle('.ratings.ratings--toggle');
  });
})();
