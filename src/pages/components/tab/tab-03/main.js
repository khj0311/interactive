(function () {
  class TabSlider {
    constructor(section, opts) {
      this.opts = {
        defaultIndex: 0,
        clickedIndex: null,
        prevIndex: null,
        ...opts,
      };

      this.selector = {
        section,
        tabItemElement: '.tab-item',
        bandWrapElement: '.js-band-wrap',
      };

      this.class = {
        featureHide: 'is-feature-hide',
        active: 'active',
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        listElements: null,
        contentElements: null,
      };

      this.events = {
        click: this.onClickList.bind(this),
      };

      this.init();
    }

    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;

      this.setElements();
      this.attachEvents();
    }

    setElements() {
      this.el.tabItemElements = this.el.section.querySelectorAll(this.selector.tabItemElement);
      this.el.bandWrapElement = this.el.section.querySelector(this.selector.bandWrapElement);
    }

    attachEvents() {
      this.onClickList(0);
      Array.from(this.el.tabItemElements).forEach((list, index) => {
        list.addEventListener('click', () => this.events.click(index));
      });
    }

    onClickList(clickedIndex = this.el.opts.defaultIndex) {
      // active
      if (this.opts.prevIndex !== null) {
        this.el.tabItemElements[this.opts.prevIndex].classList.remove(this.class.active);
      }
      this.el.tabItemElements[clickedIndex].classList.add(this.class.active);

      // translate band wrap
      const imgItemWidth = this.el.bandWrapElement.children[0].getBoundingClientRect().width;

      this.el.bandWrapElement.style.transform = `translateX(${imgItemWidth * clickedIndex * -1}px)`;

      if (this.opts.prevIndex !== null) {
        const duration = 400;
        let moveLength = 1;

        if (this.opts.prevIndex > clickedIndex) {
          moveLength = this.opts.prevIndex - clickedIndex;
        } else {
          moveLength = clickedIndex - this.opts.prevIndex;
        }
        this.el.bandWrapElement.style.transitionDuration = `${duration * moveLength}ms`;
      }

      this.opts.prevIndex = clickedIndex;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new TabSlider('.tab.tab--slider');
  });
})();
