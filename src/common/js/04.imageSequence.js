(function() {
  window.INTERACTIVE = window.INTERACTIVE || {};

  class ImageSequence {
    constructor(featureElement, params) {
      const defaultParams = {
        targetElement: null,
        canvasElement: null,
        imageElement: '.sequence-image',
        startCount: 0,
        endCount: 0,
        loadOffset: 0,
        playOffset: 0.5
      };

      this.featureElement = featureElement ? document.querySelector(featureElement) : document;
      this.params = { ...defaultParams, ...params };

      this.options = {
        device: 'desktop',
        _device: '',
        width: 0,
        height: 0,
        canvas: null,
        context: null,
        sequenceSrc: [],
        sequenceImages: [],
        interval: null,
        loaded: false
      };

      this.events = {
        load: this.onLoadHandler.bind(this),
        resize: this.onResizeHandler.bind(this),
        scroll: {
          load: this.onScrollLoadSequence.bind(this),
          play: this.onScrollPlaySequence.bind(this)
        }
      };

      this.setElements();
      this.setCanvas();
      this.attachEvents();
    }

    setElements() {
      if (this.params.targetElement !== null && typeof this.params.targetElement === 'string') {
        this.params.targetElement = this.featureElement.querySelector(this.params.targetElement);
      }

      if (this.params.imageElement !== null && typeof this.params.imageElement === 'string') {
        this.params.imageElement = this.featureElement.querySelector(this.params.imageElement);
      }

      if (this.params.canvasElement !== null) {
        if (typeof this.params.canvasElement === 'string') {
          this.params.canvasElement = this.featureElement.querySelector(this.params.canvasElement);
        }
      } else {
        this.params.canvasElement = document.createElement('canvas');
      }

      this.options.canvas = this.params.canvasElement;
      this.params.targetElement.appendChild(this.options.canvas);
    }

    attachEvents() {
      // this.events.scroll.load();

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
      if (window.innerWidth > 1023) this.options.device = 'desktop';
      else if (window.innerWidth <= 1023 && window.innerWidth > 767) this.options.device = 'tablet';
      else this.options.device = 'mobile';

      if (this.options.device !== this.options._device) {
        this.onResponsiveChange();
        this.options._device = this.options.device;
      }
    }

    onResponsiveChange() {
      this.options.sequenceImages = [];
      this.setCanvas();
      this.loadSequence();
    }

    onScrollLoadSequence() {
      const winOffsetTop = window.scrollY;
      const winOffsetBottom = winOffsetTop + window.innerHeight;

      const targetOffsetTop = winOffsetTop + this.params.targetElement.getBoundingClientRect().top;
      const targetOffsetBottom = targetOffsetTop + this.params.targetElement.clientHeight;

      if (winOffsetBottom > targetOffsetTop - window.innerHeight * this.params.loadOffset && winOffsetTop < targetOffsetBottom + window.innerHeight * this.params.loadOffset) {
        this.loadSequence();
        window.removeEventListener('scroll', this.events.scroll.load);
      }
    }

    onScrollPlaySequence() {
      const params = {
        activeType: 'twoWay',
        targetSelector: '.mtg-comp-exploration__visual-inner',
        windowOffset: 1,
        targetOffset: 0.7,
        activeCallback: () => {
          this.playSequence();
        },
        detectiveCallback: () => {
          this.setDefaultImage();
        }
      };

      new INTERACTIVE.ScrollTrigger('.mtg-comp-exploration', params);
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

      return image.getAttribute(dataImageSrc);
    }

    setDefaultImage() {
      const firstImage = new Image();
      firstImage.src = this.options.sequenceSrc[0];
      firstImage.addEventListener('load', () => {
        this.options.canvas.width = firstImage.naturalWidth;
        this.options.canvas.height = firstImage.naturalHeight;
        this.options.width = firstImage.naturalWidth;
        this.options.height = firstImage.naturalHeight;
        this.options.context.drawImage(firstImage, 0, 0, this.options.width, this.options.height);
      });
    }

    setCanvas() {
      this.options.context = this.options.canvas.getContext('2d');

      this.options.sequenceSrc = [];
      const imageElement = this.params.imageElement;
      const imageSrc = this.getSequenceSrc(imageElement).replace('_end', '');

      for (let i = this.params.startCount; i <= this.params.endCount; i++) {
        let sequenceSrc = '';
        if (imageSrc.indexOf('.jpg') > -1) {
          sequenceSrc = imageSrc.replace('.jpg', `_${i}.jpg`);
        } else if (imageSrc.indexOf('.png') > -1) {
          sequenceSrc = imageSrc.replace('.png', `_${i}.png`);
        }
        this.options.sequenceSrc.push(sequenceSrc);
      }

      this.setDefaultImage();
    }

    loadSequence() {
      if (this.options.sequenceImages.length > 0) return;

      let loadCount = 0;
      const onLoadImage = e => {
        const image = e.currentTarget;
        if (loadCount < this.options.sequenceSrc.length - 1) {
          loadCount++;
          image.removeEventListener('load', onLoadImage);
        } else {
          this.options.loaded = true;
        }
      };

      for (let i = 0; i < this.options.sequenceSrc.length; i++) {
        const image = new Image();
        image.src = this.options.sequenceSrc[i];

        image.addEventListener('load', onLoadImage);
        this.options.sequenceImages.push(image);
      }
    }

    playSequence() {
      let count = 0;
      clearInterval(this.options.interval);
      this.options.interval = setInterval(() => {
        if (!this.options.loaded) return;
        if (count < this.options.sequenceImages.length) {
          this.options.context.drawImage(this.options.sequenceImages[count], 0, 0, this.options.width, this.options.height);
          count++;
        } else {
          clearInterval(this.options.interval);
        }
      }, 30);
    }

    initSequence() {}
  }

  INTERACTIVE.ImageSequence = ImageSequence;
})();
