const bookListContainer = document.getElementById("bookList");
const newBookButton = document.getElementById("newBook");
const submitButton = document.getElementById("submitButton");
const dialog = document.getElementById("dialog");
const form = document.getElementById("form");
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

Book.prototype.updateReadStatusClass = function (rsButton) {
  if (this.readStatus === "In progress") {
    rsButton.classList.remove("notStarted");
    rsButton.classList.add("progress");
  } else if (this.readStatus === "Completed") {
    rsButton.classList.remove("progress");
    rsButton.classList.add("completed");
  } else if (this.readStatus === "Not started") {
    rsButton.classList.remove("completed");
    rsButton.classList.add("notStarted");
  }
};

function addBookToLibrary(title, author, pages, readStatus) {
  const book = new Book(title, author, pages, readStatus);
  library.push(book);
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

function generateReadStatusButton(div, book) {
  const readStatusButton = document.createElement("button");
  readStatusButton.setAttribute("id", "readStatusButton");
  let readButtonText = document.createTextNode(book.readStatus);
  readStatusButton.appendChild(readButtonText);
  book.updateReadStatusClass(readStatusButton);
  div.appendChild(readStatusButton);

  readStatusButton.addEventListener("click", () => {
    removeAllChildNodes(readStatusButton);
    readButtonText = document.createTextNode(book.updateReadStatus());
    readStatusButton.appendChild(readButtonText);
    book.updateReadStatusClass(readStatusButton);
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

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

submitButton.addEventListener("click", (e) => {
  if (validateForm()) {
    addBookToLibrary(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      getReadStatusCheckedValue()
    );
    dialog.close();
    generateBookList(library);
    form.reset();
  }
  e.preventDefault();
});

newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

// form validation functions

function validateForm() {
  const titleError = validateBookTitle(bookTitle.value);
  if (titleError) {
    alert(titleError);
    return false;
  }

  const authorError = validateAuthor(bookAuthor.value);
  if (authorError) {
    alert(authorError);
    return false;
  }

  const pageError = validatePages(bookPages.value);
  if (pageError) {
    alert(pageError);
    return false;
  }
  return true;
}

function validateBookTitle(title) {
  if (title.length == 0) {
    return "Book title cannot be empty";
  }
  return "";
}

function validateAuthor(author) {
  const regexNoNumbersOrSpecialChars = /^[a-zA-Z\s\-]+$/;
  if (author.length === 0) {
    return "Author's name can't be blank";
  } else if (!author.match(regexNoNumbersOrSpecialChars)) {
    return "Author's name can't contain numbers or special characters";
  }
  return "";
}

function validatePages(pages) {
  const regexDigitsOnly = /\d/g;
  if (!pages.match(regexDigitsOnly)) {
    return "Pages must be numbers only";
  } else if (pages.length > 20000) {
    return "Pages must be fewer than 20,000";
  }
  return "";
}
