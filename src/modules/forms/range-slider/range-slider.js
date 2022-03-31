import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const initRangeSlider = (() => {
  const rangeSlider = document.querySelector('.range-slider');

  if (!rangeSlider) return;

  const rangeSliderWrapper = document.querySelector('.range-slider__wrapper');

  noUiSlider.create(rangeSliderWrapper, {
    range: {
      min: 0,
      max: 15000,
    },

    margin: 300,

    step: 1,

    start: [5000, 10000],
    connect: true,

    orientation: 'horizontal',

    format: wNumb({
        decimals: 0,
        thousand: ' ',
        suffix: '₽'
    })
  });

  const sliderValueElements = [
    rangeSlider.querySelector('.range-slider__value-start'),
    rangeSlider.querySelector('.range-slider__value-end'),
  ];

  rangeSliderWrapper.noUiSlider.on('update', (values, handle) => {
    sliderValueElements[handle].textContent = values[handle];
  });
})();
