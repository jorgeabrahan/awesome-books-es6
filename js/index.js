import Books from './modules/Books.js';
import setInitialTime from './modules/setInitialTime.js';

const booksCnt = document.getElementById('booksCnt');
const frmAddBook = document.getElementById('frmAddBook');
const frmAddMsg = document.getElementById('frmAddMsg');
const btnsPages = document.querySelectorAll('button[to-open]');

btnsPages.forEach((btnPage) => {
  btnPage.addEventListener('click', () => {
    const opened = document.querySelector('[open]');
    opened.removeAttribute('open');
    const toOpen = document.getElementById(`${btnPage.getAttribute('to-open')}`);
    toOpen.setAttribute('open', '');

    document.querySelector('.header__button--active').classList.remove('header__button--active');
    btnPage.classList.add('header__button--active');
  });
});

const books = new Books(booksCnt, frmAddMsg);

frmAddBook.addEventListener('submit', (e) => {
  e.preventDefault();
  frmAddMsg.className = 'd-none message';
  const title = frmAddBook.title.value.trim();
  const author = frmAddBook.author.value.trim();
  if (title.length === 0 || author.length === 0) {
    books.showMessage(false, 'Fill all inputs before submiting!');
    return;
  }
  books.add(title, author);
  frmAddBook.reset();
  frmAddBook.title.focus();
  books.showMessage(true, 'Book added successfully!');
});

window.onload = () => {
  setInitialTime();
};
