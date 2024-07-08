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
        openButtonElements: null,
        closeButtonElements: null,
      };
      this.events = {
        open: this.onClickOpenHandler.bind(this),
        close: this.onClickCloseHandler.bind(this),
      };
      this.init();
    }
    init() {
      if (this.el.section === null || this.el.section.classList.contains(this.class.featureHide)) return;

      console.log('template loadInit!');
      this.setElements();
      this.attachEvents();
    }
    setElements() {
      this.el.body = document.querySelector('body');
      this.el.popupElement = this.el.section.querySelector(this.selector.popupElement);
      this.el.openButtonElements = this.el.section.querySelectorAll(this.selector.openButtonElement);
      this.el.closeButtonElements = this.el.section.querySelectorAll(this.selector.closeButtonElement);
    }
    attachEvents() {
      Array.from(this.el.openButtonElements).forEach((button) => {
        button.addEventListener('click', this.events.open);
      });
      Array.from(this.el.closeButtonElements).forEach((button) => {
        button.addEventListener('click', this.events.close);
      });
    }

    onClickOpenHandler(e) {
      const target = e.target !== this.el.openButtonElements ? e.target.closest(this.selector.openButtonElement) : this.el.openButtonElements;
      const targetPopupValue = target.dataset.hash;

      const targetPopup = this.el.section.querySelector(`[data-popup="${targetPopupValue}"]`);
      const targetPopupInner = targetPopup.querySelector(this.selector.popupInnerElement);

      targetPopup.classList.add(this.class.isActive);

      this.el.body.style.overflow = 'hidden';
      this.el.body.style.width = '100%';

      TweenMax.to(targetPopupInner, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        y: `0%`,
      });

      TweenMax.to(targetPopup, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        opacity: `1`,
        backdropFilter: `blur(${this.opts.tweenMax.blur})`,
      });
    }

    onClickCloseHandler(e) {
      const target = e.target !== this.el.closeButtonElements ? e.target.closest(this.selector.closeButtonElement) : this.el.closeButtonElements;
      const targetPopup = target.closest(this.selector.popupElement);
      const targetPopupInner = targetPopup.querySelector(this.selector.popupInnerElement);

      targetPopup.classList.remove(this.class.isActive);

      this.el.body.style.removeProperty('overflow');
      this.el.body.style.removeProperty('width');

      TweenMax.to(targetPopupInner, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        delay: this.opts.tweenMax.duration,
        y: `100%`,
      });

      TweenMax.to(targetPopup, {
        ease: this.opts.tweenMax.ease,
        duration: this.opts.tweenMax.duration,
        opacity: `0`,
        backdropFilter: `blur(${this.opts.tweenMax.blur})`,
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new ModalPopup('.popup--layer02');
  });
})();
