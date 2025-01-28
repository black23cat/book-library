export default function DisplayScreen() {
  function updateScreen(array, contentNode) {
    contentNode.textContent = '';
    if (array.length === 0 || array === undefined) {
      return;
    }
    array.forEach((book, index) => {
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
      readPara.textContent =
        book.read === 'yes'
          ? 'You have read this book.'
          : 'This book is not read yet.';
      readParaToggle.textContent = book.read === 'yes' ? 'Unread' : 'Read';
      readParaToggle.setAttribute('class', 'read-toggle');
      readParaToggle.setAttribute('title', 'Toggle read status');
      deleteBook.textContent = 'X';
      deleteBook.setAttribute('class', 'remove-book');
      deleteBook.setAttribute('title', 'Delete book');
      // --------------------------------------------
      // Append child to card container
      bookCard.appendChild(bookTitle);
      bookCard.appendChild(bookAuthor);
      bookCard.appendChild(readPara);
      bookCard.appendChild(readParaToggle);
      bookCard.appendChild(bookPages);
      bookCard.appendChild(deleteBook);
      // Append card to main content
      contentNode.appendChild(bookCard);
    });
  }
  return {
    updateScreen,
  };
}
