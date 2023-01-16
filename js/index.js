import Books from './modules/Books.js';

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

const books = new Books(booksCnt);

const showFrmAddBookMsg = (isSuccess, msg) => {
  frmAddMsg.classList.remove('d-none');
  if (isSuccess) {
    frmAddMsg.classList.add('message--success');
    setTimeout(() => {
      frmAddMsg.className = 'd-none message';
    }, 2500);
  } else {
    frmAddMsg.classList.add('message--error');
  }
  frmAddMsg.textContent = msg;
};

frmAddBook.addEventListener('submit', (e) => {
  e.preventDefault();
  frmAddMsg.className = 'd-none message';
  const title = frmAddBook.title.value.trim();
  const author = frmAddBook.author.value.trim();
  if (title.length === 0 || author.length === 0) {
    showFrmAddBookMsg(false, 'Fill all inputs before submiting!');
    return;
  }
  books.add(title, author);
  frmAddBook.reset();
  frmAddBook.title.focus();
  showFrmAddBookMsg(true, 'Book added successfully!');
});
