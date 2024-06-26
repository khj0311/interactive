(function () {
  class TabEffect {
    constructor(section, opts) {
      this.opts = {
        defaultIndex: 0,
        clickedIndex: null,
        prevIndex: null,
        setTimeId: null,
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
      if (this.opts.clickedIndex === clickedIndex) {
        return;
      }
      this.opts.prevIndex = this.opts.clickedIndex;
      this.opts.clickedIndex = clickedIndex;

      Array.from(this.el.tabContents).forEach((content, index) => {
        if (this.opts.prevIndex !== index && this.opts.clickedIndex !== index) {
          this.opts.setTimeId !== null && clearTimeout(this.opts.setTimeId);
          content.classList.remove(this.class.active);
          content.style.zIndex = '';
        }
      });

      this.el.tabItems[clickedIndex].classList.add(this.class.active);
      this.el.tabContents[clickedIndex].classList.add(this.class.active);
      this.el.tabContents[clickedIndex].style.zIndex = 5;

      if (this.opts.prevIndex !== null) {
        this.el.tabItems[this.opts.prevIndex].classList.remove(this.class.active);
        this.el.tabContents[this.opts.prevIndex].style.zIndex = 3;

        this.opts.setTimeId = setTimeout(() => {
          this.el.tabContents[this.opts.prevIndex].classList.remove(this.class.active);
          this.el.tabContents[this.opts.prevIndex].style.zIndex = '';
        }, 300);
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new TabEffect('.tab.tab--effect');
  });
})();
