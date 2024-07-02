(function () {
  class RatingsEffect {
    constructor(section, opts) {
      this.opts = {
        defaultIndex: 1, // 0부터 시작
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
        hover: 'hover',
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        labelElements: null,
        radioElements: null,
        numberElement: null,
      };

      this.events = {
        click: this.onClickHandler.bind(this),
        mouseenter: this.onMouseenterHandler.bind(this),
        mouseleave: this.onMouseleaveHandler.bind(this),
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
      Array.from(this.el.labelElements).forEach((label, index) => {
        label.addEventListener('mouseenter', () => this.events.mouseenter(index));
        label.addEventListener('mouseleave', () => this.events.mouseleave(index));
      });

      this.onClickHandler(this.opts.defaultIndex);
    }

    onClickHandler(clickedIndex) {
      let setValue;

      if (this.opts.prevIndex !== null && this.opts.prevIndex === clickedIndex && !this.opts.isInitValue) {
        // 같은 value 클릭 했을 때,
        this.opts.isInitValue = true;
        this.el.numberElement.innerText = 0;
        this.opts.prevIndex = null;

        setValue = (label) => {
          label.classList.remove(this.class.hover);
          label.classList.remove(this.class.active);
        };
      } else {
        //  다른 value 클릭 했을 때,
        this.opts.isInitValue = false;
        this.el.numberElement.innerText = clickedIndex + 1;
        this.opts.prevIndex = clickedIndex;

        setValue = (label, index) => {
          label.classList.remove(this.class.hover);

          if (index <= clickedIndex) {
            label.classList.add(this.class.active);
          } else {
            label.classList.remove(this.class.active);
          }
        };
      }

      this.iterateLabel(setValue);
    }

    onMouseenterHandler(hoverIndex) {
      this.el.numberElement.innerText = hoverIndex + 1;

      const setValue = (label, index) => {
        label.classList.remove(this.class.active);

        if (hoverIndex >= index) {
          label.classList.add(this.class.hover);
        } else {
          label.classList.remove(this.class.hover);
        }
      };

      this.iterateLabel(setValue);
    }

    onMouseleaveHandler() {
      let setValue;
      if (this.opts.prevIndex === null) {
        // prevIndex가 null 일 때,
        this.el.numberElement.innerText = 0;

        setValue = (label) => {
          label.classList.remove(this.class.hover);
        };
      } else {
        // prevIndex가 null이 아닐 때,
        this.el.numberElement.innerText = this.opts.prevIndex + 1;

        setValue = (label, index) => {
          label.classList.remove(this.class.hover);

          if (this.opts.prevIndex !== null && index <= this.opts.prevIndex) {
            label.classList.add(this.class.active);
          } else {
            label.classList.remove(this.class.active);
          }
        };
      }

      this.iterateLabel(setValue);
    }

    iterateLabel(callback) {
      Array.from(this.el.labelElements).forEach((label, index) => {
        callback(label, index);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new RatingsEffect('.ratings.ratings--effect');
  });
})();
