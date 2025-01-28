class Book {
  constructor(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  get bookReadStatus() {
    return this.read === 'yes';
  }
}

const screenDisplay = (function () {
  const myLibrary = [];
  const showBtn = document.getElementById('show-form-modal');
  const formDialog = document.getElementById('form-modal');
  const form = document.querySelector('form');
  const content = document.querySelector('.content');

  function updateScreen() {
    content.textContent = '';
    myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      const bookTitle = document.createElement('p');
      const bookAuthor = document.createElement('p');
      const bookPages = document.createElement('p');
      const readPara = document.createElement('p');
      const readParaToggle = document.createElement('button');
      const deleteBook = document.createElement('button');
      bookCard.setAttribute('class', 'card');
      bookCard.setAttribute('data-index', index);
      bookTitle.textContent = `"${book.title}"`;
      bookAuthor.textContent = book.author;
      bookPages.textContent = `${book.pages} pages.`;
      readPara.textContent = book.bookReadStatus
        ? 'You have read this book.'
        : 'This book is not read yet.';
      readParaToggle.textContent = book.bookReadStatus ? 'Unread' : 'Read';
      readParaToggle.setAttribute('class', 'read-toggle');
      readParaToggle.setAttribute('title', 'Toggle read status');
      deleteBook.textContent = 'X';
      deleteBook.setAttribute('class', 'remove');
      deleteBook.setAttribute('title', 'Delete book');
      // --------------------------------------------
      // Append child to card container
      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(bookPages);
      bookCard.appendChild(readPara);
      bookCard.appendChild(readParaToggle);
      bookCard.appendChild(deleteBook);
      // Append card to main content
      content.appendChild(bookCard);

      // Function to invoke when removeBook button is clicked
      bookCard.addEventListener('click', cardClickHandler);
      function cardClickHandler(e) {
        if (e.target === deleteBook) {
          const bookCard = document.querySelector(`[data-index="${index}"]`);
          myLibrary.splice(index, 1);
          content.removeChild(bookCard);
          console.log(myLibrary);
          updateScreen();
        }
        if (e.target === readParaToggle) {
          if (book.bookReadStatus) {
            book.read = 'no';
            readPara.textContent = 'This book is not read yet.';
            readParaToggle.textContent = 'Read';
          } else {
            book.read = 'yes';
            readPara.textContent = 'You have read this book.';
            readParaToggle.textContent = 'Unread';
          }
        }
      }
    });
  }

  // Open form modal
  showBtn.addEventListener('click', () => {
    formDialog.showModal();
  });

  form.addEventListener('click', formEventHandler);
  function formEventHandler(e) {
    //check what button is being clicked
    switch (e.target.value) {
      case 'confirm':
        //Check for empty title and author input
        if (this.title.value === '' || this.author.value === '') {
          alert(`The book author and title must be filled!`);
          return;
        }
        //Check for double book title
        const bookTitle = myLibrary.map((e) => {
          return e.title;
        });
        if (!bookTitle.includes(this.title.value)) {
          // No title exist in library push the
          // new book object to myLibrary
          myLibrary.push(
            new Book(
              this.author.value,
              this.title.value,
              this.pages.value,
              this.read.value,
            ),
          );
          updateScreen();
        } else {
          alert(`${this.title.value} is already in your galery.`);
        }
        form.reset();
        formDialog.close();
        break;
      // code to run if cancel button is clicked
      case 'cancel':
        formDialog.close();
        break;
    }
  }

  updateScreen();
})();
