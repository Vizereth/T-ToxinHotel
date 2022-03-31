/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

import Swiper, { Navigation, Pagination } from "swiper";
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

const initRoomCardSwiper = () => {
  const swipers = document.querySelectorAll('.room-card__swiper');

  if (!swipers) return;

  swipers.forEach((swiper) => {
    const pagination = swiper.querySelector('.swiper-pagination');
    const prev = swiper.querySelector('.swiper-button-prev');
    const next = swiper.querySelector('.swiper-button-next');

    new Swiper(swiper, {
      modules: [Navigation, Pagination],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 100,
      autoHeight: true,
      speed: 800,

      pagination: {
        el: pagination,
        bulletClass: "swiper-pag-bullet",
        bulletActiveClass: "swiper-pag-bullet-active"
      },

      navigation: {
        prevEl: prev,
        nextEl: next,
      },
    });
  });
};

function initSliders() {
  if (document.querySelector(".swiper")) {
    initRoomCardSwiper();
  }
}

function initSlidersScroll() {
  let sliderScrollItems = document.querySelectorAll(".swiper_scroll");
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector(".swiper-scrollbar");
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: "vertical",
        slidesPerView: "auto",
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener("load", function (e) {
  initSliders();
});
