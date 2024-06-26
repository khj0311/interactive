(function () {
  class TabBasic {
    constructor(section, opts) {
      this.opts = {
        defaultIndex: 0,
        ...opts,
      };

      this.selector = {
        section,
        tabItem: '.tab-item',
        tabContent: '.tab-content',
      };

      this.class = {
        featureHide: 'is-feature-hide',
        active: 'active',
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        tabItems: null,
        tabContents: null,
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
      this.el.tabItems = this.el.section.querySelectorAll(this.selector.tabItem);
      this.el.tabContents = this.el.section.querySelectorAll(this.selector.tabContent);
    }

    attachEvents() {
      this.onClickList(0);
      Array.from(this.el.tabItems).forEach((list, index) => {
        list.addEventListener('click', () => this.events.click(index));
      });
    }

    onClickList(clickedIndex = this.el.opts.defaultIndex) {
      Array.from(this.el.tabItems).forEach((list, index) => {
        if (clickedIndex === index) {
          list.classList.add(this.class.active);
          this.el.tabContents[index].classList.add(this.class.active);
        }

        if (clickedIndex !== index) {
          list.classList.remove(this.class.active);
          this.el.tabContents[index].classList.remove(this.class.active);
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new TabBasic('.tab.tab--basic');
  });
})();
