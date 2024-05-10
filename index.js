const myLibrary = [];

function Book(author, title, pages,haveRead) {
  this.Author = author,
  this.Title = title,
  this.Pages = pages,
  this.haveRead = haveRead
}
const book1= new Book("J.K Rowlings", "Song of Ice and Fire", 369,false)
myLibrary.push(book1)

function addBookToLibrary(book) {
  myLibrary.push(book)
  console.log(myLibrary)
}


function displayBooks() {
    const oldNode = document.querySelector(".bookstore")
    const bookstore = document.createElement("div")
    bookstore.setAttribute("class", "bookstore")
    

    // Loop through the library array
    for (const books of myLibrary){
      const book = document.createElement("div")
      book.setAttribute("class","book")

      console.log("Display function")
      // console.log(myLibrary[book])
      let bookObj = books
      const profilePic = document.createElement("img")
      profilePic.setAttribute("src","./image_1714556660513_ujkw1a.svg")
      book.appendChild(profilePic)
      // Loop through the book object properties
      Object.keys(bookObj).forEach(key=>{
          const p = document.createElement("p")
          p.textContent = `${key}: ${bookObj[key]}`
          book.appendChild(p)
        })
        bookstore.appendChild(book)
      }


    oldNode.parentNode.replaceChild(bookstore,oldNode)
    // book.textContent = `${book1.title} by ${book1.author},${book1.pages} pages.`
    
    
}
document.addEventListener("DOMContentLoaded",displayBooks())

const form = document.querySelector(".book-form")
const submitBtn = document.querySelector(".submit")
form.addEventListener("submit",(e)=>{
  e.preventDefault()

  // Data from radio options
  const data = new FormData(form)
  console.log(data)
  let title = data.get("book-title")
  let author = data.get("book-author")
  let pages = data.get("book-pages")
  let haveRead = data.get("read-status")

  // Add Book to library array
  addBookToLibrary(new Book(author,title,pages,haveRead))
    

submitBtn.addEventListener("clicked",(e)=>{form.submit()})
})
// Refreshing the library
// const refresh = document.querySelector(".refresh")
// refresh.addEventListener("clicked",displayBooks())