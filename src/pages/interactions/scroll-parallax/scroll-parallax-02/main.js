(function () {
  document.addEventListener('DOMContentLoaded', () => {
    new INTERACTIVE.ScrollParallax('.parallax--basic02', {
      standard: 'top',
      targetElement: '.parallax-image',
      activeElement: 'parallax-image img',
      startPosition: 7.5,
      endPosition: -7.5,
    });
  });
})();
