(function () {
  class TreeView {
    constructor(section, opts) {
      this.opts = {
        ...opts,
      };

      this.selector = {
        section,
        caretElement: '.treeview-caret',
        btnOpenElement: '.treeview-btns__open',
        btnCloseElement: '.treeview-btns__close',
      };

      this.class = {
        featureHide: 'is-feature-hide',
        active: 'active',
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        caretElements: null,
        nestedElements: null,
        btnOpenElement: null,
        btnCloseElement: null,
      };

      this.events = {
        caret: {
          click: this.onClickCaret.bind(this),
        },
        buttons: {
          clickOpen: this.onClickOpen.bind(this),
          clickClose: this.onClickClose.bind(this),
        },
      };

      this.init();
    }

    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;

      this.setElements();
      this.attachEvents();
    }

    setElements() {
      this.el.caretElements = this.el.section.querySelectorAll(this.selector.caretElement);
      this.el.btnOpenElement = this.el.section.querySelector(this.selector.btnOpenElement);
      this.el.btnCloseElement = this.el.section.querySelector(this.selector.btnCloseElement);
    }

    attachEvents() {
      Array.from(this.el.caretElements).forEach((caretElement) => {
        caretElement.querySelector('button').addEventListener('click', this.events.caret.click);
      });

      this.el.btnOpenElement.addEventListener('click', this.events.buttons.clickOpen);
      this.el.btnCloseElement.addEventListener('click', this.events.buttons.clickClose);
    }

    onClickCaret(e) {
      e.stopPropagation();
      if (e.currentTarget.parentElement.classList.contains(this.class.active)) {
        e.currentTarget.parentElement.classList.remove(this.class.active);
      } else {
        e.currentTarget.parentElement.classList.add(this.class.active);
      }
    }

    onClickOpen() {
      Array.from(this.el.caretElements).forEach((caretElement) => {
        caretElement.classList.add(this.class.active);
      });
    }

    onClickClose() {
      Array.from(this.el.caretElements).forEach((caretElement) => {
        caretElement.classList.remove(this.class.active);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new TreeView('.treeview.treeview--basic');
  });
})();
