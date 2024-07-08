(function () {
  class ModalPopup {
    constructor(section, opts) {
      this.opts = {
        tweenMax: {
          duration: 0.7,
          ease: 'power1.out',
          blur: '8px',
          y: 0,
        },
        ...opts,
      };
      this.selector = {
        section,
        popupElement: '.popup-layer',
        popupInnerElement: '.popup-layer__wrap',
        openButtonElement: '.popup-button--open',
        closeButtonElement: '.popup-button--close',
      };
      this.class = {
        featureHide: 'is-feature-hide',
        isActive: 'is-active',
      };
      this.el = {
        section: document.querySelector(this.selector.section) || null,
        popupElement: null,
        popupInnerElement: null,
        openButtonElement: null,
        closeButtonElement: null,
      };
      this.events = {
        open: this.onClickOpenHandler.bind(this),
        close: this.onClickCloseHandler.bind(this),
      };
      this.init();
    }
    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;
      this.setElements();
      this.attachEvents();
    }
    setElements() {
      this.el.body = document.querySelector('body');
      this.el.popupElement = this.el.section.querySelector(this.selector.popupElement);
      this.el.popupInnerElement = this.el.section.querySelector(this.selector.popupInnerElement);
      this.el.openButtonElement = this.el.section.querySelector(this.selector.openButtonElement);
      this.el.closeButtonElement = this.el.section.querySelector(this.selector.closeButtonElement);
    }
    attachEvents() {
      this.el.openButtonElement.addEventListener('click', this.events.open);
      this.el.closeButtonElement.addEventListener('click', this.events.close);
    }

    onClickOpenHandler(e) {
      this.el.popupElement.classList.add(this.class.isActive);

      this.el.body.style.overflow = 'hidden';
      this.el.body.style.width = '100%';

      TweenMax.to(this.el.popupInnerElement, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        y: `0%`,
      });

      TweenMax.to(this.el.popupElement, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        opacity: `1`,
        backdropFilter: `blur(${this.opts.tweenMax.blur})`,
      });
    }

    onClickCloseHandler(e) {
      this.el.popupElement.classList.remove(this.class.isActive);

      this.el.body.style.removeProperty('overflow');
      this.el.body.style.removeProperty('width');

      TweenMax.to(this.el.popupInnerElement, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        delay: this.opts.tweenMax.duration,
        y: `100%`,
      });

      TweenMax.to(this.el.popupElement, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        opacity: `0`,
        backdropFilter: `blur(${this.opts.tweenMax.blur})`,
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new ModalPopup('.popup--layer01');
  });
})();
