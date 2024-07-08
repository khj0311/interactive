// Sticky 02
(function () {
  class StickyMotion02 {
    constructor(featureElement, params) {
      const defaultParams = {
        wrapperElement: null,
        targetElement: null,
        sleepMoon: null,
        sleepMain: null,
        sleepDisplay1: null,
        sleepDisplay2: null,
        sleepDisplay3: null,
        activeClass: 'is-active',
        detectiveClass: '',
      };

      this.featureElement = featureElement ? document.querySelector(featureElement) : document;
      this.params = { ...defaultParams, ...params };

      this.events = {
        load: this.onLoadHandler.bind(this),
        scroll: this.onScrollHandler.bind(this),
      };

      this.init();
    }

    init() {
      this.setElements();
      this.attachEvents();
    }

    setElements() {
      if (this.params.wrapperElement !== null && typeof this.params.wrapperElement === 'string') {
        this.params.wrapperElement = this.featureElement.querySelector(this.params.wrapperElement);

        if (this.params.targetElement === null) {
          this.params.targetElement = this.featureElement.querySelector(this.params.wrapperElement);
        }
      }

      if (this.params.targetElement !== null && typeof this.params.targetElement === 'string') {
        this.params.targetElement = this.featureElement.querySelector(this.params.targetElement);

        if (this.params.sleepMoon === null) {
          this.params.sleepMoon = this.featureElement.querySelector(this.params.targetElement);
        }
      }

      if (this.params.sleepMoon !== null && typeof this.params.sleepMoon === 'string') {
        this.params.sleepMoon = this.featureElement.querySelector(this.params.sleepMoon);

        if (this.params.sleepMain === null) {
          this.params.sleepMain = this.featureElement.querySelector(this.params.sleepMoon);
        }
      }

      if (this.params.sleepMain !== null && typeof this.params.sleepMain === 'string') {
        this.params.sleepMain = this.featureElement.querySelector(this.params.sleepMain);

        if (this.params.sleepDisplay1 === null) {
          this.params.sleepDisplay1 = this.featureElement.querySelector(this.params.sleepMain);
        }
      }

      if (this.params.sleepDisplay1 !== null && typeof this.params.sleepDisplay1 === 'string') {
        this.params.sleepDisplay1 = this.featureElement.querySelector(this.params.sleepDisplay1);

        if (this.params.sleepDisplay2 === null) {
          this.params.sleepDisplay2 = this.featureElement.querySelector(this.params.sleepDisplay1);
        }
      }

      if (this.params.sleepDisplay2 !== null && typeof this.params.sleepDisplay2 === 'string') {
        this.params.sleepDisplay2 = this.featureElement.querySelector(this.params.sleepDisplay2);

        if (this.params.sleepDisplay3 === null) {
          this.params.sleepDisplay3 = this.featureElement.querySelector(this.params.sleepDisplay2);
        }
      }

      if (this.params.sleepDisplay3 !== null && typeof this.params.sleepDisplay3 === 'string') {
        this.params.sleepDisplay3 = this.featureElement.querySelector(this.params.sleepDisplay3);

        if (this.params.sleepDisplay2 === null) {
          this.params.sleepDisplay2 = this.featureElement.querySelector(this.params.sleepDisplay3);
        }
      }

      if (
        this.featureElement !== null &&
        this.params.wrapperElement === null &&
        this.params.targetElement === null &&
        this.params.sleepMoon === null &&
        this.params.sleepMain === null &&
        this.params.sleepDisplay1 === null &&
        this.params.sleepDisplay2 === null &&
        this.params.sleepDisplay3 === null
      ) {
        this.params.wrapperElement = this.wrapperElement;
        this.params.targetElement = this.targetElement;
        this.params.sleepMoon = this.sleepMoon;
        this.params.sleepMain = this.sleepMain;
        this.params.sleepDisplay1 = this.sleepDisplay1;
        this.params.sleepDisplay2 = this.sleepDisplay2;
        this.params.sleepDisplay3 = this.sleepDisplay3;
      }
    }

    attachEvents() {
      this.events.scroll();
      window.addEventListener('load', this.events.load);
      window.addEventListener('scroll', this.events.scroll);
    }

    onLoadHandler() {
      this.events.scroll();
      window.removeEventListener('load', this.events.load);
    }

    onScrollHandler() {
      const winOffsetTop = window.scrollY;
      const winOffsetBottom = winOffsetTop + window.innerHeight;

      const targetOffsetTop = winOffsetTop + this.params.wrapperElement.getBoundingClientRect().top;
      const targetOffsetBottom = targetOffsetTop + this.params.wrapperElement.clientHeight;

      const percentage = (winOffsetTop - targetOffsetTop) / (this.params.wrapperElement.clientHeight - window.innerHeight);
      const range = percentage * 100;
      if (winOffsetTop >= targetOffsetTop && winOffsetBottom <= targetOffsetBottom) {
        if (range > 10 && range <= 40) {
          const step1 = (range - 10) / 30;
          const opacity = step1;
          const transY = step1 * 51.1;
          const scale = -(step1 - 1) + 0.032;
          TweenMax.to(this.params.sleepMoon, 0.2, { ease: 'power1.out', opacity: opacity, y: `${-transY}%`, scale: scale });
        } else {
          if (range <= 10) {
            TweenMax.to(this.params.sleepMoon, 0.2, { ease: 'power1.out', opacity: 0, y: 0, scale: 1 });
          } else if (range > 40) {
            TweenMax.to(this.params.sleepMoon, 0.2, { ease: 'power1.out', opacity: 0, y: '-51.1%', scale: 0.032 });
          }
        }

        if (range > 35 && range <= 42) {
          const opacity = (range - 35) / 7;
          TweenMax.to(this.params.sleepDisplay1, 0.2, { ease: 'power1.out', opacity: opacity });
        } else {
          if (range <= 35) {
            TweenMax.to(this.params.sleepDisplay1, 0.2, { ease: 'power1.out', opacity: 0 });
          } else if (range > 42) {
            TweenMax.to(this.params.sleepDisplay1, 0.2, { ease: 'power1.out', opacity: 1 });
          }
        }

        if (range > 40 && range <= 45) {
          const opacity = (range - 40) / 5;
          TweenMax.to(this.params.sleepMain, 0.2, { ease: 'power1.out', opacity: opacity });
        } else {
          if (range <= 40) {
            TweenMax.to(this.params.sleepMain, 0.2, { ease: 'power1.out', opacity: 0 });
          } else if (range > 45) {
            TweenMax.to(this.params.sleepMain, 0.2, { ease: 'power1.out', opacity: 1 });
          }
        }

        if (range > 50 && range <= 60) {
          const opacity = (range - 50) / 10;
          TweenMax.to(this.params.sleepDisplay2, 0.2, { ease: 'power1.out', opacity: opacity });
        } else {
          if (range <= 50) {
            TweenMax.to(this.params.sleepDisplay2, 0.2, { ease: 'power1.out', opacity: 0 });
          } else if (range > 60) {
            TweenMax.to(this.params.sleepDisplay2, 0.2, { ease: 'power1.out', opacity: 1 });
          }
        }

        if (range > 70 && range <= 80) {
          const opacity = (range - 70) / 10;
          TweenMax.to(this.params.sleepDisplay3, 0.2, { ease: 'power1.out', opacity: opacity });
        } else {
          if (range <= 70) {
            TweenMax.to(this.params.sleepDisplay3, 0.2, { ease: 'power1.out', opacity: 0 });
          } else if (range > 80) {
            TweenMax.to(this.params.sleepDisplay3, 0.2, { ease: 'power1.out', opacity: 1 });
          }
        }
      }
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const params = {
      wrapperElement: '.sticky-track',
      targetElement: '.sticky-obj',
      sleepMoon: '.sticky-obj__moon',
      sleepMain: '.sticky-obj__watches-main',
      sleepDisplay1: '.sticky-obj__watches-display--1',
      sleepDisplay2: '.sticky-obj__watches-display--2',
      sleepDisplay3: '.sticky-obj__watches-display--3',
    };

    new StickyMotion02('.sticky--02', params);
  });
})();
