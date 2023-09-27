const bookListContainer = document.getElementById("bookList");
const newBookButton = document.getElementById("newBook");
const dialog = document.getElementById("dialog");
const submitButton = document.getElementById("submitButton");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const readStatus = document.getElementsByName("readStatus");

const library = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

function addBookToLibrary(title, author, pages, readStatus) {
  const book = new Book(title, author, pages, readStatus);
  library.push(book);
}

function generateBookList(array) {
  array.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookListContainer.appendChild(bookDiv);
    bookDiv.innerText = book;
  });
}

function getReadStatusCheckedValue() {
  const checkedValue = Array.from(readStatus).find((radio) => radio.checked);
  return checkedValue.value;
}

submitButton.addEventListener("click", (e) => {
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    getReadStatusCheckedValue()
  );
  dialog.close();
  console.log(library);
  e.preventDefault();
});

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

generateBookList(library);
