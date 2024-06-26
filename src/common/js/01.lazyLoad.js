(function () {
  window.INTERACTIVE = window.INTERACTIVE || {};
  class LazyLoad {
    constructor(imgTarget, videoTarget) {
      this.elements = {};
      this.imgTarget = imgTarget ?? '.js-lazy-img';
      this.videoTarget = videoTarget ?? '.js-lazy-video';
      this.device;

      this.events = {
        load: this.onLoadHandler.bind(this),
        scroll: this.onScrollHandler.bind(this),
        resize: window.common.utils.throttle(this.onResizeHandler.bind(this)),
      };

      this.init();
    }

    init() {
      this.setElements();
      this.getDevice();
      this.attachEvents();
    }

    setElements() {
      this.elements.html = document.querySelector('html');
      this.elements.images = document.querySelectorAll(this.imgTarget);
      this.elements.videos = document.querySelectorAll(this.videoTarget);
    }

    attachEvents() {
      window.addEventListener('load', this.events.load);
      window.addEventListener('scroll', this.events.scroll);
      window.addEventListener('resize', this.events.resize);
    }

    onLoadHandler() {
      this.onLazyLoad();
      window.removeEventListener('load', this.events.load);
    }

    getDevice() {
      this.device = this.elements.html.dataset.device;
    }

    getImageSrc(image) {
      // mobile
      if (this.device === 'mobile') {
        if (image.dataset.srcMobile) return image.dataset.srcMobile;
        if (image.dataset.srcTablet) return image.dataset.srcTablet;
        return image.dataset.srcPc;
      }

      // tablet
      if (this.device === 'tablet') {
        if (image.dataset.srcTablet) return image.dataset.srcTablet;
        return image.dataset.srcPc;
      }

      // desktop
      return image.dataset.srcPc;
    }

    replaceImage(image) {
      image.src = this.getImageSrc(image);
      image.classList.replace('js-lazy-img', 'js-img-loaded');
    }

    getVideoSrc(video) {
      // mobile
      if (this.device === 'mobile') {
        if (video.dataset.videoSrcMobile) return video.dataset.videoSrcMobile;
        if (video.dataset.videoSrcTablet) return video.dataset.videoSrcTablet;
        return video.dataset.videoSrcPc;
      }

      // tablet
      if (this.device === 'tablet') {
        if (video.dataset.videoSrcTablet) return video.dataset.videoSrcTablet;
        return video.dataset.videoSrcPc;
      }

      // desktop
      return video.dataset.videoSrcPc;
    }

    setVideoSource(video, videoSrc) {
      const mp4Source = video.querySelectorAll('source')[0] ?? document.createElement('source');
      const webmSource = video.querySelectorAll('source')[1] ?? document.createElement('source');

      mp4Source.src = `${videoSrc}.mp4`;
      webmSource.src = `${videoSrc}.webm`;

      mp4Source.type = 'video/mp4';
      webmSource.type = 'video/webm';

      video.appendChild(mp4Source);
      video.appendChild(webmSource);
    }

    replaceVideo(video) {
      const videoSrc = this.getVideoSrc(video);
      this.setVideoSource(video, videoSrc);

      video.classList.replace('js-lazy-video', 'js-video-loaded');
    }

    trigger(target) {
      if (target.getBoundingClientRect().bottom > -window.innerHeight && target.getBoundingClientRect().top < window.innerHeight * 2) return true;
      return false;
    }

    onLazyLoad() {
      this.elements.images.forEach((image) => {
        if (image.classList.contains('js-img-loaded')) return;

        this.trigger(image) && this.replaceImage(image);
      });

      this.elements.videos.forEach((video) => {
        if (video.classList.contains('js-video-loaded')) return;

        this.trigger(video) && this.replaceVideo(video);
      });
    }

    onScrollHandler() {
      if (
        this.elements.images.length === document.querySelectorAll('.js-img-loaded').length &&
        this.elements.videos.length === document.querySelectorAll('.js-video-loaded').length
      ) {
        return window.removeEventListener('scroll', this.onScrollHandler);
      }

      this.onLazyLoad();
    }

    onResizeHandler() {
      const prevDevice = this.device;
      this.getDevice();

      if (prevDevice !== this.device) {
        this.elements.images.forEach((image) => {
          if (!image.classList.contains('js-img-loaded')) return;
          image.src = this.getImageSrc(image);
        });

        this.elements.videos.forEach((video) => {
          if (!video.classList.contains('js-video-loaded')) return;
          const videoSrc = this.getVideoSrc(video);
          this.setVideoSource(video, videoSrc);
        });
      }
    }
  }

  INTERACTIVE.LazyLoad = LazyLoad;
})();
