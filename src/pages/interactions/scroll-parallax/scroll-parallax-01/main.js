(function () {
  document.addEventListener('DOMContentLoaded', () => {
    new INTERACTIVE.ScrollParallax('.parallax--basic01', {
      standard: 'top',
      targetElement: '.parallax-image',
      activeElement: 'parallax-image img',
      startPosition: 0,
      endPosition: -15,
    });
  });
})();
