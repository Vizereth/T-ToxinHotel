class CustomMenu {
  constructor(menuClass, toggleClass) {
    this.menuClassName = menuClass;
    this.toggleClassName = toggleClass;
    this.menu = document.querySelector(`.${this.menuClassName}`);
    this.toggle = document.querySelector(`.${this.toggleClassName}`);
  }

  init() {
    if (!this.menu || !this.toggle) return;

    this.toggle.addEventListener("click", () => this.onClickHandler());
  }

  onClickHandler() {
    if (!this.menu.classList.contains(`${this.menuClassName}--active`)) {
      this.addMenuActiveClass();
      this.addToggleActiveClass();
    } else {
      this.removeMenuActiveClass();
      this.removeToggleActiveClass();
    }
  }

  addMenuActiveClass() {
    this.menu.classList.add(`${this.menuClassName}--active`);
  }

  removeMenuActiveClass() {
    this.menu.classList.remove(`${this.menuClassName}--active`);
  }

  addToggleActiveClass() {
    this.toggle.classList.add(`${this.toggleClassName}--toggled`);
  }

  removeToggleActiveClass() {
    this.toggle.classList.remove(`${this.toggleClassName}--toggled`);
  }
}

const initMenu = (() => {
  const menuClassName = "header__nav";
  const toggleClassName = "icon-menu";

  const menu = new CustomMenu(menuClassName, toggleClassName);
  menu.init();
})();
