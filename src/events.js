import ManageBook from './book';
import DisplayScreen from './screen-display';

export default function events() {
  const book = ManageBook();
  const screen = DisplayScreen();
  const showFormBtn = document.getElementById('show-form-modal');
  const formDialog = document.getElementById('form-modal');
  const form = document.querySelector('form');
  const content = document.querySelector('.content');

  showFormBtn.addEventListener('click', showFormBtnHandler);
  form.addEventListener('click', formHandler);
  content.addEventListener('click', contentHandler);

  function showFormBtnHandler() {
    formDialog.showModal();
  }

  function formHandler(e) {
    e.preventDefault();
    if (form.checkValidity() === false && e.target.id === 'confirm') {
      alert('fill the empty fields');
    }
    if (form.checkValidity() && e.target.id === 'confirm') {
      const inputValue = [...form.getElementsByTagName('input')].map(
        (input) => input.value,
      );
      inputValue.push(document.getElementById('read').value);
      book.addBookToLibrary(inputValue);
      screen.updateScreen(book.getBookList(), content);
      book.updateStorage();
      formDialog.close();
      form.reset();
    } else if (e.target.id === 'cancel') {
      alert('cancel');
      form.reset();
      formDialog.close();
    }
  }

  function contentHandler(e) {
    const target = e.target;
    const bookIndex = target.parentNode.dataset.index;
    if (target.classList.contains('remove-book')) {
      book.removeBook(bookIndex);
      content.removeChild(target.parentNode);
    }
    if (target.classList.contains('read-toggle')) {
      book.toggleReadStatus(bookIndex);
    }
    book.updateStorage();
    screen.updateScreen(book.getBookList(), content);
  }
  screen.updateScreen(book.getBookList(), content);
}
