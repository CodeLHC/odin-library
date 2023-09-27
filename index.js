const bookListContainer = document.getElementById("bookList");

const library = ["The Hobbit", "Meditations", "Bible"];

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

generateBookList(library);
