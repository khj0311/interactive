const initUtils = () => {
  const throttle = (callback, delay = 100) => {
    let timer;
    return function() {
      if (!timer) {
        timer = setTimeout(_ => {
          callback.apply(this, arguments);
          timer = undefined;
        }, delay);
      }
    };
  };

  const detectedDevice = (() => {
    const elems = {};
    let device = '12';

    const deviceVariant = {
      mobile: 'mobile',
      tablet: 'tablet',
      desktop: 'desktop'
    };

    let breakpoint = {
      mobile: 767,
      tablet: 1023
    };

    const init = breakpoint => {
      breakpoint && setBreakPoint(breakpoint);
      setElements();
      bindEvents();
    };

    const setElements = () => {
      elems.html = document.querySelector('html');
    };

    const bindEvents = () => {
      onResizeHandler();
      window.addEventListener('resize', throttle(onResizeHandler));
    };

    const setBreakPoint = (_breakpoint = { mobile: 767, tablet: 1023 }) => {
      try {
        if (_breakpoint.mobile > _breakpoint.tablet) {
          throw new Error('mobile 값보다 tablet 값이 더 커야합니다.');
        }
      } catch (e) {
        console.error(e);
        return;
      }

      breakpoint = {
        mobile: _breakpoint.mobile,
        tablet: _breakpoint.tablet
      };
    };

    const onResizeHandler = () => {
      let currentDevice;

      if (window.innerWidth <= breakpoint.mobile) {
        currentDevice = deviceVariant.mobile;
      }
      if (window.innerWidth > breakpoint.mobile && window.innerWidth <= breakpoint.tablet) {
        currentDevice = deviceVariant.tablet;
      }
      if (window.innerWidth > breakpoint.tablet) {
        currentDevice = deviceVariant.desktop;
      }

      if (currentDevice === device) return;

      elems.html.dataset.device = currentDevice;
      device = currentDevice;
    };

    const getDevice = () => device;

    return { init, getDevice };
  })();

  return { throttle, detectedDevice };
};

window.addEventListener('DOMContentLoaded', () => {
  console.log('1. DOMContentLoaded');

  window.common = window.common || {};
  window.common.utils = initUtils();
  // breakpoint 커스텀 가능
  window.common.utils.detectedDevice.init();

  new INTERACTIVE.LazyLoad();
});

window.addEventListener('load', () => {
  console.log('2. load');
});
