class LikeButton {
  constructor(el) {
    this.el = el;
    this.liked = false;
  }

  init() {
    this.isLiked();
    this.el.addEventListener('click', () => this.onClickHandler());
  }

  isLiked() {
    this.el.classList.contains('like-btn--active')
      ? (this.liked = true)
      : (this.liked = false);
  }

  onClickHandler() {
    if (!this.liked) {
      this.addActiveClass();
      this.like();
    } else {
      this.removeActiveClass();
      this.dislike();
    }
  }

  like() {
    this.liked = true;
  }

  dislike() {
    this.liked = false;
  }

  addActiveClass() {
    this.el.classList.add('like-btn--active');
  }

  removeActiveClass() {
    this.el.classList.remove('like-btn--active');
  }
}

const initLikeButtons = (() => {
  const buttons = document.querySelectorAll('.like-btn');

  if (!buttons) return;

  buttons.forEach((item) => {
    new LikeButton(item).init();
  });
})();
