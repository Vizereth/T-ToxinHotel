class CheckboxList {
  constructor(el) {
    this.el = el;
    this.header = el.querySelector('.checkbox-list__header');
    this.toggle = el.querySelector('.checkbox-list__toggle');
    this.list = el.querySelector('.checkbox-list__list');
  }

  init() {
    this.header.addEventListener('click', () => this.onClickHandler());
  }

  onClickHandler() {
    if (!this.el.classList.contains('checkbox-list--expanded')) {
      this.addActiveClass();
      this.addHeight();
      this.expandLess();
    } else {
      this.removeActiveClass();
      this.removeHeight();
      this.expandMore();
    }
  }

  addActiveClass() {
    this.el.classList.add('checkbox-list--expanded');
  }

  removeActiveClass() {
    this.el.classList.remove('checkbox-list--expanded');
  }

  addHeight() {
    this.list.style.maxHeight = `${this.list.scrollHeight}px`;
  }

  removeHeight() {
    this.list.style.maxHeight = null;
  }

  expandMore() {
    this.toggle.innerHTML = '<span class="material-icons">expand_more</span>';
  }

  expandLess() {
    this.toggle.innerHTML = '<span class="material-icons">expand_less</span>';
  }
}

const initCheckboxList = (() => {
  const checkboxListElements = document.querySelectorAll('.checkbox-list');

  if (!checkboxListElements) return;

  checkboxListElements.forEach((item) => {
    const list = new CheckboxList(item);
    list.init();
  });
})();
