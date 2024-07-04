// Parallax 03
(function () {
  window.addEventListener('load', () => {
    const params01 = {
      targetElement: '.parallax-item .item01',
      activeElement: '.parallax-item .item01 img',
      startPosition: -10,
      endPosition: 0,
    };

    const params02 = {
      targetElement: '.parallax-item .item02',
      activeElement: '.parallax-item .item02 img',
      startPosition: 7.5,
      endPosition: -7.5,
    };

    const params03 = {
      standard: 'bottom',
      targetElement: '.parallax-item .item03',
      activeElement: '.parallax-item .item03 img',
      startPosition: -15,
      endPosition: 15,
    };

    const params04 = {
      targetElement: '.parallax-item .item04',
      activeElement: '.parallax-item .item04 img',
      startPosition: 5,
      endPosition: 15,
    };

    const params05 = {
      standard: 'bottom',
      targetElement: '.parallax-item .item05',
      activeElement: '.parallax-item .item05 img',
      startPosition: 0,
      endPosition: -15,
    };

    new INTERACTIVE.ScrollParallax('.parallax--each .item01', params01);
    new INTERACTIVE.ScrollParallax('.parallax--each .item02', params02);
    new INTERACTIVE.ScrollParallax('.parallax--each .item03', params03);
    new INTERACTIVE.ScrollParallax('.parallax--each .item04', params04);
    new INTERACTIVE.ScrollParallax('.parallax--each .item05', params05);
  });
})();
