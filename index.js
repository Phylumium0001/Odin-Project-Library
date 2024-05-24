function Book(title,author,pages,completionStatus){
    changeStatus= (status)=>{
        status ? completionStatus = false : completionStatus = true
    }
    return {title,author,pages,completionStatus,changeStatus}
}

function Library(){
    let shelves = []
    addBook = (bookObj)=>{
        shelves.push(bookObj)
    }
    removeBook = (bookObj)=>{
        for (const obj of shelves) {
            if (obj['title'] === bookObj['title']){
                let index = shelves.indexOf(obj)
                shelves.splice(index,1)
            }
        }
    }
    checkBookAvailability=(bookObj)=>{
        for (const book of shelves) {
            if (bookObj.title === book.title){
                return true
            }
        }
    }
    return {shelves,addBook,removeBook,checkBookAvailability}
}

// let book1 = Book("Harry","New",232,false)
// let book2 = Book("Barry","Old",422,true)
// let book3 = Book("John","Bro",532,false)

let lib = Library()
// lib.addBook(book1)
// lib.addBook(book2)
// lib.addBook(book3)

function sideBar(){
    const addBookBar = document.querySelector(".add-book-bar")
    const openBtn = document.querySelector('.activateSidePane')
    const closeBtn = document.querySelector('.deactivateSidePane')
    activateSideBar=()=>{
        // Add activate class to side bar
        addBookBar.classList.add("activate")
    }
    deactivateSideBar=()=>{
        // Add activate class to side bar
        addBookBar.classList.remove("activate")
    }
    return {activateSideBar,deactivateSideBar}
}

function domManupulator(){
    // Handles the completion state button
    // progressBtnFunc = (e)=>{
    //     console.log(e)
    // }

    // To be used by the shelves render function
    removeAllItems= ()=>{
        container = document.querySelector(".library-container")
        container.innerHTML = ""
    }
    addBook = (bookObj)=>{
        console.log("In")
        container = document.querySelector(".library-container")
        let bookCont = document.createElement("div")
        bookCont.classList.add("book")
        bookCont.dataset.completed = bookObj.completionStatus ? true : false
        bookCont.dataset.title = bookObj.title

        let imageCont = document.createElement("div")
        imageCont.classList.add("image")
        imageCont.textContent = "Image"
        bookCont.appendChild(imageCont)

        let bookTitle = document.createElement("div")
        bookTitle.classList.add("bookTitle")
        bookTitle.textContent = bookObj.title
        bookCont.appendChild(bookTitle)

        let bookAuthorCont = document.createElement("div")
        bookAuthorCont.classList.add("bookAuthor")
        bookAuthorCont.textContent = `Author:${bookObj.author}`
        bookCont.appendChild(bookAuthorCont)

        let bookPagesCont = document.createElement("div")
        bookPagesCont.classList.add("bookPages")
        bookPagesCont.textContent = `Pages:${bookObj.pages}`
        bookCont.appendChild(bookPagesCont)

        let bookBtnsCont = document.createElement("div")
        bookBtnsCont.classList.add("bookBtns")

        let completedBtnCont = document.createElement("button")
        completedBtnCont.classList.add("completedBtn")
        completedBtnCont.textContent = bookObj.completionStatus ? 'Completed' : "In Progess"
        completedBtnCont.addEventListener('click',(e)=>{
            // Reset the book object val
            bookObj.completionStatus = bookObj.completionStatus ? false: true
            // Reset the dataset val
            e.target.parentNode.parentElement.dataset.completed = bookObj.completionStatus

            completionBtn = e.originalTarget
            completionBtn.textContent = bookObj.completionStatus ? "Completed": "In Progress"
            console.log(bookObj.completionStatus)
        })
        
        bookBtnsCont.appendChild(completedBtnCont)

        let removeBtnCont = document.createElement("button")
        removeBtnCont.classList.add("removeBtn")
        removeBtnCont.textContent = "Remove"
        removeBtnCont.addEventListener("click",(e)=>{
            let domBookTitle = e.target.parentNode.parentElement.dataset.title
            for (let index = 0; index < lib.shelves.length; index++) {
                const element = lib.shelves[index];
                if (element.title === domBookTitle){
                    lib.shelves.splice(index,1)
                }
            }
            removeAllItems()
            renderShelve()
        })

        bookBtnsCont.appendChild(removeBtnCont)

        bookCont.append(bookBtnsCont)
        
        container.appendChild(bookCont)

    }
    renderShelve = ()=>{
        removeAllItems()
        for (const book of lib.shelves) {
            addBook(book)
        }
    }
    return {addBook,renderShelve}
}
man = domManupulator()

function handleForms() {
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const genre = document.getElementById("genre").value
    const completionStatus = document.querySelector("input[name='readStatus']:checked").value
    // Check if Book already exists - Titles are unique
    const newBook = Book(title,author,pages,completionStatus)
    if (lib.checkBookAvailability(newBook)){
        // If book does exist 
        alert(`${title} already exists.`)
    }else{
        lib.addBook(newBook)
        console.log(lib.shelves)
        man.renderShelve()
    }
}

function addListerners(){
    let sideBarObj = sideBar()
    let openBtn = document.querySelector('.activateSidePane')
    let closeBtn = document.querySelector('.deactivateSidePane')
    let form = document.querySelector(".form-container")
    openBtn.addEventListener("click",sideBarObj.activateSideBar)
    closeBtn.addEventListener("click",sideBarObj.deactivateSideBar)
    form.addEventListener("submit",handleForms)
}


// document.querySelector().addEventListener
addListerners()

// man.addBook(book1)
// man.addBook(book2)
// man.addBook(book3)
// man.renderShelve(lib)