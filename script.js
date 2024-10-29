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
  event.preventDefault();
  form.reset();
  formDialog.close();
});

// new book constructor
function Book(author, title, pages, read){
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.bookData = kebabCase(title);
}