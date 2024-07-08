// Class Toggle
(function () {
  const params01 = {
    opts: {
      activeType: 'twoWay',
      windowOffset: 0.7,
      targetOffset: 0.5,
    },
    selector: {
      targetElement: '.toggle-list__item.js-watch-grid01 .toggle-image',
      activeElement: '.toggle-list__item.js-watch-grid01',
    },
  };

  new INTERACTIVE.ScrollTrigger('.toggle-wrap', params01);

  const params02 = {
    opts: {
      activeType: 'oneWay',
      windowOffset: 0.7,
      targetOffset: 0.5,
    },
    selector: {
      targetElement: '.toggle-list__item.js-watch-grid02 .toggle-image',
      activeElement: '.toggle-list__item.js-watch-grid02',
    },
  };

  new INTERACTIVE.ScrollTrigger('.toggle-wrap', params02);
})();
