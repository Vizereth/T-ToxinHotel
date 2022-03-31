class RoomsFormToggle {
  constructor(el) {
    this.el = el;
    this.form = this.el.querySelector(".rooms__form");
    this.toggle = this.el.querySelector('.rooms__form-toggle');
  }

  init() {
    this.toggle.addEventListener('click', () => this.onClickHandler());
  }

  onClickHandler() {
    if (!this.form.classList.contains('rooms__form--active')) {
      this.addActiveClass();
      this.toggleOff();
    } else {
      this.removeActiveClass();
      this.toggleOn();
    }
  }

  addActiveClass() {
    this.form.classList.add('rooms__form--active');
  }

  removeActiveClass() {
    this.form.classList.remove('rooms__form--active');
  }

  toggleOn() {
    this.toggle.innerHTML = `<span class="material-icons">keyboard_double_arrow_down</span>`;
  }

  toggleOff() {
    this.toggle.innerHTML = `<span class="material-icons">keyboard_double_arrow_up</span>`;
  }
}

const initRoomsForm = (() => {
  const roomsForm = document.querySelector('.rooms__form-wrapper');

  if (!roomsForm) return;

  new RoomsFormToggle(roomsForm).init();
})();
