// Image Sequence
(function () {
  new INTERACTIVE.ImageSequence('.sequence.sequence--image', {
    opts: {
      startCount: 0,
      endCount: 43,
      loadOffset: 2,
      playOffset: 0.4,
    },
    selector: {
      targetElement: '.sequence-visual__inner',
      imageElement: '.sequence-visual__inner img',
    },
  });
})();
