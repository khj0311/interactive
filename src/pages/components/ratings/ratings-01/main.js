(function () {
  class RatingsBasic {
    constructor(section, opts) {
      this.opts = {
        defaultIndex: 2, // 0부터 시작
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
        change: this.onChangeHandler.bind(this),
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
        radio.addEventListener('change', () => this.events.change(index));
      });

      this.onChangeHandler(this.opts.defaultIndex);
    }

    onChangeHandler(clickedIndex) {
      Array.from(this.el.labelElements).forEach((label, index) => {
        if (index <= clickedIndex) {
          label.classList.add(this.class.active);
        } else {
          label.classList.remove(this.class.active);
        }
      });

      this.el.numberElement.innerText = clickedIndex + 1;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new RatingsBasic('.ratings.ratings--basic');
  });
})();
