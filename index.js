const bookListContainer = document.getElementById("bookList");
const newBookButton = document.getElementById("newBook");
const dialog = document.getElementById("dialog");
const submitButton = document.getElementById("submitButton");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookPages = document.getElementById("bookPages");
const form = document.getElementById("form");
const readStatus = document.getElementsByName("readStatus");

const library = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
}

Book.prototype.updateReadStatus = function () {
  if (this.readStatus === "In progress") {
    this.readStatus = "Completed";
  } else if (this.readStatus === "Completed") {
    this.readStatus = "Not started";
  } else if (this.readStatus === "Not started") {
    this.readStatus = "In progress";
  }
  return this.readStatus;
};

function addBookToLibrary(title, author, pages, readStatus) {
  const book = new Book(title, author, pages, readStatus);
  library.push(book);
}

function generateReadStatusButton(div, book) {
  const readStatusButton = document.createElement("button");
  readStatusButton.setAttribute("id", "readStatusButton");
  let readButtonText = document.createTextNode(book.readStatus);
  readStatusButton.appendChild(readButtonText);
  div.appendChild(readStatusButton);

  readStatusButton.addEventListener("click", () => {
    removeAllChildNodes(readStatusButton);
    readButtonText = document.createTextNode(book.updateReadStatus());
    readStatusButton.appendChild(readButtonText);
  });
}

function getReadStatusCheckedValue() {
  const checkedValue = Array.from(readStatus).find((radio) => radio.checked);
  return checkedValue.value;
}

function generateRemoveButton(div, id) {
  const removeButton = document.createElement("button");
  removeButton.setAttribute("id", "removeButton");
  const removeButtonText = document.createTextNode("Remove from Library");
  removeButton.appendChild(removeButtonText);
  div.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    const index = findIndexToRemoveElement();
    document.getElementById(id).remove();
    library.splice(index, 1);
  });
}

function findIndexToRemoveElement(id) {
  library.findIndex((book) => {
    return book.title === id;
  });
}

function generateBookList(array) {
  removeAllChildNodes(bookListContainer);
  array.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.setAttribute("id", book.title);
    bookListContainer.appendChild(bookDiv);
    bookDiv.innerText = `${book.title}
    by ${book.author}
    ${book.pages} pages
   Read status:`;
    generateReadStatusButton(bookDiv, book);
    generateRemoveButton(bookDiv, book.title);
  });
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

submitButton.addEventListener("click", (e) => {
  addBookToLibrary(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    getReadStatusCheckedValue()
  );
  dialog.close();
  generateBookList(library);
  form.reset();
  e.preventDefault();
});

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});
