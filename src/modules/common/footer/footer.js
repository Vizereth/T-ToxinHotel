class FooterNav {
  constructor() {
    this.navElements = document.querySelectorAll('.footer__nav');
  }

  init() {
    this.navElements.forEach((item) => {
      const navListElement = item.querySelector('.footer__nav-list');
      const navHeaderElement = item.querySelector('.footer__nav-header');
      navHeaderElement.addEventListener('click', () =>
        this.onClickHandler(navListElement)
      );
    });
  }

  onClickHandler(navEl) {
    if (!navEl.classList.contains('footer__nav-list--active')) {
      this.addActiveClass(navEl);
      this.addHeight(navEl);
    } else {
      this.removeActiveClass(navEl);
      this.removeHeight(navEl);
    }
  }

  addActiveClass(el) {
    el.classList.add('footer__nav-list--active');
  }
  removeActiveClass(el) {
    el.classList.remove('footer__nav-list--active');
  }

  addHeight(el) {
    el.style.maxHeight = `${el.scrollHeight}px`;
  }

  removeHeight(el) {
    el.style.maxHeight = null;
  }
}

const initFooterNav = (() => {
  const footerMenuElement = document.querySelector('.footer__menu');

  if (!footerMenuElement) return;

  const footerNav = new FooterNav();
  footerNav.init();
})();
