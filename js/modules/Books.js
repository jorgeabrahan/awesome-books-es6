import Book from './Book.js';

export default class Books {
  constructor(container, message) {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.container = container;
    this.msgNoBooks = container.querySelector('#msgNoBooks');
    this.message = message;
    if (this.amount > 0) {
      this.load();
      return;
    }
    this.toggleNoBooksMessage();
  }

  showMessage(isSuccess, msg) {
    this.message.classList.remove('d-none');
    this.message.textContent = msg;
    if (isSuccess) {
      this.message.classList.add('message--success');
      this.msgTimer = setTimeout(() => {
        this.message.className = 'd-none message';
      }, 2500);
      return;
    }
    clearTimeout(this.msgTimer);
    this.message.classList.add('message--error');
  }

  toggleNoBooksMessage() {
    if (this.amount === 0) {
      this.msgNoBooks.classList.remove('d-none');
      return;
    }
    this.msgNoBooks.classList.add('d-none');
  }

  load() {
    const instances = [];
    const fragment = document.createDocumentFragment();
    this.books.forEach(({ title, author, id }) => {
      const book = new Book(title, author, id);
      fragment.appendChild(this.create(book));
      instances.push(book);
    });
    this.container.appendChild(fragment);
    this.books = instances;
  }

  saveLocally() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  remove(button) {
    this.books = this.books.filter((book) => book.id !== button.id);
    button.parentElement.remove();
    this.saveLocally();
    this.toggleNoBooksMessage();
  }

  add(title, author) {
    const book = new Book(title, author);
    this.books.push(book);
    this.container.appendChild(this.create(book));
    this.saveLocally();
    this.toggleNoBooksMessage();
  }

  create(book) {
    const html = book.createHtml(this.remove);
    const btn = html.querySelector('button');
    btn.addEventListener('click', ({ target }) => {
      this.remove(target);
    });
    return html;
  }

  get amount() {
    return this.books.length;
  }
}
