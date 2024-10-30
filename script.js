const myLibrary = [];
const showBtn = document.getElementById("show-form-modal");
const formDialog = document.getElementById("form-modal");
const submitBtn = document.getElementById("submit");
const form = document.querySelector("form");
const content = document.querySelector(".content");

// Open form modal
showBtn.addEventListener("click", ()=>{
  formDialog.showModal();
});

// Close form modal
submitBtn.addEventListener("click", (event) => {
  // Prefent default font submit behavior
  event.preventDefault();
  // run addBookToLibrary function after submit button is pressed
  addBookToLibrary(this.author.value, this.title.value, this.pages.value, this.read.value);
  // Immediately display book to page as card
  myLibrary[myLibrary.length -1].displayToCard();
  //reset and closing form dialog after submiting
  form.reset();
  formDialog.close();
  console.log(content);
  console.log(myLibrary);
});

// new book constructor
function Book(author, title, pages, read){
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.bookData = kebabCase(title);
}

Book.prototype.displayToCard = function(){
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const readPara = document.createElement("p");
  const readParaToggle = document.createElement("button");
  const deleteBook = document.createElement("button");
  const dataAttribute = kebabCase(this.title);
  const readStatus = this.read === "yes" ? true: false;
  bookCard.setAttribute("class", "card");
  bookCard.setAttribute("id", dataAttribute)
  bookTitle.textContent = this.title;
  bookAuthor.textContent = this.author;
  bookPages.textContent = this.pages;
  readPara.textContent = readStatus? "You have read this book."
                        : "This book is not read yet.";
  readParaToggle.textContent = readStatus? "Read" : "Unread";
  readParaToggle.setAttribute("class", "read-toggle");
  deleteBook.textContent = "X";
  deleteBook.setAttribute("data-book-title", dataAttribute);
  deleteBook.setAttribute("class", "remove")
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(readPara);
  bookCard.appendChild(readParaToggle);
  bookCard.appendChild(deleteBook);
  content.appendChild(bookCard);
}

function addBookToLibrary(a, t, p, r){
  // Check if there's already a book in a myLibrary array
  if(myLibrary.length == 0){
    myLibrary.push(new Book(a, t, p, r));
  }else{
    // if the book is already in myLibrary this func will not add the book
    if(checkAuthor(myLibrary, a) && checkTitle(myLibrary, t)){
      alert(`This book is already in your galery.`);
    }else{
      myLibrary.push(new Book(a, t, p, r));
    }
  };
}

function checkAuthor(array, a){
  const bookAuthor = array.map(function(e){
    return e.author;
  });
  let result;
	bookAuthor.filter(e =>
    e === a ? result = true: result = false);
  return result;
}

function checkTitle(array, t){
  const bookAuthor = array.map(function(e){
    return e.title;
  });
  let result;
	bookAuthor.filter(e =>
    e === t ? result = true: result = false);
  return result;
}

function kebabCase(str){
  return str.toLowerCase().split(" ").join("-");
}

myLibrary.push(new Book("J.R.R Tolkiens", "The Hobbit", "298", "no"));
myLibrary[0].displayToCard();