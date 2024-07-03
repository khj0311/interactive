(function () {
  window.INTERACTIVE = window.INTERACTIVE || {};

  class ImageSequence {
    constructor(section, params = { opts: {}, selector: {} }) {
      this.opts = {
        currDevice: '',
        prevDevice: '',
        startCount: 0,
        endCount: 0,
        loadOffset: 0,
        playOffset: 0.5,
        playInterval: null,
        loaded: false,
        ...params.opts,
      };

      this.selector = {
        section,
        targetElement: '',
        canvasElement: '',
        imageElement: '',
        ...params.selector,
      };

      this.el = {
        section: document.querySelector(this.selector.section) || null,
        targetElement: null,
        canvasElement: null,
        imageElement: null,
      };

      this.events = {
        load: this.onLoadHandler.bind(this),
        resize: this.onResizeHandler.bind(this),
        scroll: {
          load: this.onScrollLoadSequence.bind(this),
          play: this.onScrollPlaySequence.bind(this),
        },
      };

      this.sequence = {
        canvas: null,
        context: null,
        width: 0,
        height: 0,
        sources: [],
        images: [],
      };

      this.init();
    }

    init() {
      if (this.el.section === null) return;

      this.setElements();
      this.setCanvas();
      this.attachEvents();
    }

    setElements() {
      this.el.targetElement = this.el.section.querySelector(this.selector.targetElement);
      this.el.imageElement = this.el.section.querySelector(this.selector.imageElement);

      if (this.selector.canvasElement !== '') {
        this.el.canvasElement = this.el.section.querySelector(this.selector.canvasElement);
      } else {
        this.el.canvasElement = document.createElement('canvas');
      }

      this.sequence.canvas = this.el.canvasElement;
      this.el.targetElement.appendChild(this.sequence.canvas);
    }

    attachEvents() {
      window.addEventListener('load', this.events.load);
      window.addEventListener('resize', this.events.resize);
      window.addEventListener('scroll', this.events.scroll.load);
    }

    onLoadHandler() {
      this.events.scroll.load();
      this.events.scroll.play();

      window.removeEventListener('load', this.events.load);
    }

    onResizeHandler() {
      if (window.innerWidth > 1023) this.opts.currDevice = 'desktop';
      else if (window.innerWidth <= 1023 && window.innerWidth > 767) this.opts.currDevice = 'tablet';
      else this.opts.currDevice = 'mobile';

      if (this.opts.currDevice !== this.opts.prevDevice) {
        this.onResponsiveChange();
        this.opts.prevDevice = this.opts.currDevice;
      }
    }

    onResponsiveChange() {
      this.sequence.images = [];
      this.setCanvas();
      this.loadSequence();
    }

    onScrollLoadSequence() {
      const winOffsetTop = window.scrollY;
      const winOffsetBottom = winOffsetTop + window.innerHeight;

      const targetOffsetTop = winOffsetTop + this.el.targetElement.getBoundingClientRect().top;
      const targetOffsetBottom = targetOffsetTop + this.el.targetElement.clientHeight;

      if (winOffsetBottom > targetOffsetTop - window.innerHeight * this.opts.loadOffset && winOffsetTop < targetOffsetBottom + window.innerHeight * this.opts.loadOffset) {
        this.loadSequence();
        window.removeEventListener('scroll', this.events.scroll.load);
      }
    }

    onScrollPlaySequence() {
      const params = {
        opts: {
          activeType: 'twoWay',
          windowOffset: 1,
          targetOffset: 0.7,
          activeCallback: () => {
            this.playSequence();
          },
          detectiveCallback: () => {
            this.setDefaultImage();
          },
        },
        selector: {
          targetElement: this.selector.targetElement,
        },
      };

      new INTERACTIVE.ScrollTrigger(this.selector.section, params);
    }

    getSequenceSrc(image) {
      let dataImageSrc = 'data-src-pc';
      if (window.innerWidth > 1023) {
        dataImageSrc = 'data-src-pc';
      } else if (window.innerWidth <= 1023 && window.innerWidth > 767) {
        if (image.getAttribute('data-src-tablet') === null) dataImageSrc = 'data-src-pc';
        else dataImageSrc = 'data-src-tablet';
      } else {
        if (image.getAttribute('data-src-mobile') === null) {
          if (image.getAttribute('data-src-tablet') === null) dataImageSrc = 'data-src-pc';
          else dataImageSrc = 'data-src-tablet';
        } else {
          dataImageSrc = 'data-src-mobile';
        }
      }

      console.log(dataImageSrc);
      return image.getAttribute(dataImageSrc);
    }

    setDefaultImage() {
      const firstImage = new Image();
      firstImage.src = this.sequence.sources[0];
      firstImage.addEventListener('load', () => {
        this.sequence.canvas.width = firstImage.naturalWidth;
        this.sequence.canvas.height = firstImage.naturalHeight;
        this.sequence.width = firstImage.naturalWidth;
        this.sequence.height = firstImage.naturalHeight;
        this.sequence.context.drawImage(firstImage, 0, 0, this.sequence.width, this.sequence.height);
      });
    }

    setCanvas() {
      this.sequence.context = this.sequence.canvas.getContext('2d');

      this.sequence.sources = [];
      const imageElement = this.el.imageElement;
      const imageSrc = this.getSequenceSrc(imageElement).replace('_end', '');

      for (let i = this.opts.startCount; i <= this.opts.endCount; i++) {
        let sequenceSrc = '';
        if (imageSrc.indexOf('.jpg') > -1) {
          sequenceSrc = imageSrc.replace('.jpg', `_${i}.jpg`);
        } else if (imageSrc.indexOf('.png') > -1) {
          sequenceSrc = imageSrc.replace('.png', `_${i}.png`);
        }
        this.sequence.sources.push(sequenceSrc);
      }

      this.setDefaultImage();
    }

    loadSequence() {
      if (this.sequence.images.length > 0) return;

      let loadCount = 0;
      const onLoadImage = (e) => {
        const image = e.currentTarget;
        if (loadCount < this.sequence.sources.length - 1) {
          loadCount++;
          image.removeEventListener('load', onLoadImage);
        } else {
          this.opts.loaded = true;
        }
      };

      for (let i = 0; i < this.sequence.sources.length; i++) {
        const image = new Image();
        image.src = this.sequence.sources[i];

        image.addEventListener('load', onLoadImage);
        this.sequence.images.push(image);
      }
    }

    playSequence() {
      let count = 0;
      console.log(this.sequence.images);
      clearInterval(this.opts.playInterval);
      this.opts.playInterval = setInterval(() => {
        if (!this.opts.loaded) return;
        if (count < this.sequence.images.length) {
          this.sequence.context.drawImage(this.sequence.images[count], 0, 0, this.sequence.width, this.sequence.height);
          count++;
        } else {
          clearInterval(this.opts.playInterval);
        }
      }, 30);
    }

    initSequence() {}
  }

  INTERACTIVE.ImageSequence = ImageSequence;
})();
