class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }
}
export default function ManageBook() {
  const library = [];

  function addBookToLibrary(array) {
    const [author, title, pages, read] = array;

    library.push(new Book(author, title, pages, read));
  }

  function getBookList() {
    return library;
  }

  function toggleReadStatus(bookIndex) {
    library[bookIndex].read === 'yes'
      ? (library[bookIndex].read = 'no')
      : (library[bookIndex].read = 'yes');
  }
  function removeBook(bookIndex) {
    library.splice(bookIndex, 1);
  }

  function updateStorage() {
    localStorage.setItem('library', JSON.stringify(library));
  }

  function getLocalStorage() {
    const bookLibrary = JSON.parse(localStorage.getItem('library'));
    bookLibrary.forEach((book) => {
      addBookToLibrary(Object.values(book));
    });
  }

  if (localStorage.getItem('library') === null) {
    addBookToLibrary(['G.R.R Martin', 'A Game of Thrones', '694', 'no']);
    addBookToLibrary(['G.R.R Martin', 'A Clash of Kings', '768', 'no']);
    addBookToLibrary(['G.R.R Martin', 'A Storm of Swords', '973', 'no']);
    addBookToLibrary(['G.R.R Martin', 'A Feast for Crows', '976', 'no']);
    addBookToLibrary(['G.R.R Martin', 'A Dance with Dragons', '1040', 'no']);
    updateStorage();
  } else {
    getLocalStorage();
  }

  return {
    addBookToLibrary,
    getBookList,
    toggleReadStatus,
    removeBook,
    updateStorage,
    getLocalStorage,
  };
}
