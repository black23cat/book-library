const myLibrary = [];
const showBtn = document.getElementById("show-form-modal");
const formDialog = document.getElementById("form-modal");
const form = document.querySelector("form");
const content = document.querySelector(".content");

// Open form modal
showBtn.addEventListener("click", ()=>{
  formDialog.showModal();
});

form.addEventListener("click", function(e){
  //check what button is being clicked
  switch(e.target.value){
    case "confirm":
      //Set up default value if user not input the form
      if(this.title.value === "") this.title.value = `No Title Book-${myLibrary.length + 1}`;
      if(this.author.value === "") this.author.value = `No Author Book-${myLibrary.length + 1}`;
      if(this.pages.value === "") this.pages.value = "0";
      addBookToLibrary(this.author.value, this.title.value, this.pages.value, this.read.value);
      form.reset();
      formDialog.close();
      break;
    // code to run if cancel button is clicked
    case "cancel":
      formDialog.close();
      break;
  }
});

// New book constructor
function Book(author, title, pages, read){
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.bookData = kebabCase(title);
}

Book.prototype.displayToCard = function(){
  // Creating element necessary for card display
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const readPara = document.createElement("p");
  const readParaToggle = document.createElement("button");
  const deleteBook = document.createElement("button");
  const dataAttribute = kebabCase(this.title);
  const readStatus = this.read === "yes" ? true: false;
  // --------------------------------------------
  // Set up required attribute for card child
  bookCard.setAttribute("class", "card");
  bookCard.setAttribute("id", dataAttribute)
  bookTitle.textContent = this.title;
  bookAuthor.textContent = this.author;
  bookPages.textContent = `${this.pages} pages.`;
  readPara.textContent = readStatus? "You have read this book."
                        : "This book is not read yet.";
  readParaToggle.textContent = readStatus? "Unread" : "Read" ;
  readParaToggle.setAttribute("class", "read-toggle");
  deleteBook.textContent = "X";
  deleteBook.setAttribute("data-book-title", dataAttribute);
  deleteBook.setAttribute("class", "remove")
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
  deleteBook.addEventListener("click", function(){
    // Find index with dataset attribute attach to card display
    const title = this.dataset.bookTitle;
    let bookIndex = myLibrary.map(e => e.bookData).indexOf(title);
    myLibrary.splice(bookIndex, 1);
    // Remove book from display after finding card and book index
    const removeBookDisplay = document.getElementById(title);
    content.removeChild(removeBookDisplay);
  });

  // Function to invoke when readToggle button is clicked
  // This will change the read paragraph 
  readParaToggle.addEventListener("click", () =>{
    // check if the book is already read or not 
    // based on value that user input in form
    const bookReadStatus = this.read === "yes"? true: false;
    if(bookReadStatus){
      this.read = "no";
      readPara.textContent = "This book is not read yet.";
      readParaToggle.textContent = "Read";
    }else{
      this.read = "yes";
      readPara.textContent = "You have read this book.";
      readParaToggle.textContent = "Unread";
    }
  });
}

function addBookToLibrary(a, t, p, r){
  // Check if there's already a book in a myLibrary array
  if(myLibrary.length == 0){
    myLibrary.push(new Book(a, t, p, r));
    myLibrary[myLibrary.length -1].displayToCard();
  }else{
    // If the book is already in myLibrary this func will not add new book
    if(checkAuthor(myLibrary, a) && checkTitle(myLibrary, t)){
      alert(`This book is already in your galery.`);
    }else{
      myLibrary.push(new Book(a, t, p, r));      
      myLibrary[myLibrary.length -1].displayToCard();
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

myLibrary.push(new Book("George R.R Martin", "Game of Thrones", "694", "yes"));
myLibrary.push(new Book("George R.R Martin", "A Clash of Kings", "768", "yes"));
myLibrary.push(new Book("George R.R Martin", "A Storm of Swords", "973", "no"));
myLibrary.push(new Book("George R.R Martin", "A Feast for Crows", "753", "no"));
myLibrary.push(new Book("George R.R Martin", "A Dance with Dragons", "1056", "no"));
myLibrary.forEach(book => book.displayToCard());