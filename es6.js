class Book{
    constructor(title,author,id){
        this.title = title;
        this.author = author;
        this.id = id;
    }
}

class UI{

    addBookToList(book){
        const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr')
    row.innerHTML = `
     <td>${book.title}</td>
     <td>${book.author}</td>
     <td>${book.id}</td>
     <td><a href="#" class="delete">X<a/></td>

    `
    list.appendChild(row)
    }

    showAlert(message,className){
        const div = document.createElement('div');
        // Add classes
        div.className = `alert ${className}`;   
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.container');
        // Get Form
        const form = document.getElementById('book-form');
        // Insert alert
        container.insertBefore(div,form);
        // Timeout after 3 sec
        setTimeout(function(){
            document.querySelector('.alert').remove()
        },3000)
    }

    clearField(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('id').value = '';
    }

    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
        }
    }
}

// Local Storage Class

class Store{
    
    static getBooks(){
     let books;
     if(localStorage.getItem('books') === null){
         books = [];
     } else{
         books = JSON.parse(localStorage.getItem('books'))
     }
     return books;
    }
    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI;
        // Add book to UI
        ui.addBookToList(book)
        
        })

    }
    static addBook(book){
     const books = Store.getBooks();
     books.push(book)
     localStorage.setItem('books',JSON.stringify(books))
    }
    
    static removeBook(id){
    const books = Store.getBooks();
    books.forEach(function(book,index){
        if(book.id === id){
            books.splice(index,1)
        }
    });
    localStorage.setItem('books',JSON.stringify(books))

}
}

//  Dom Load Event

document.addEventListener('DOMContentLoaded', Store.displayBooks)


// Event Listeners for add book


const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit',function(e){
    // Get Form Values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const ID = document.getElementById('id').value;
     // Instintiate Book
    const book = new Book(title,author,ID);

    // Instintiate UI
    const ui = new UI();
    // Validate
    if(title === '' || author === '' || id ===''){
        // Error Alert
        ui.showAlert('Please fill in all fields','error')
    } else{
         // Add Book to List
            ui.addBookToList(book)
        // Add to LocalStorage
        Store.addBook(book)
        // Show success
        ui.showAlert('Book Added Successfully','success')
        // ClearFields
            ui.clearField();
    } 
    e.preventDefault()
})


// Event Listener for delete

document.getElementById('book-list').addEventListener('click',function(e){

    // Instantiate the UI
    const ui = new UI()
    // Delete from book
    ui.deleteBook(e.target)
    // Remove from LocalStorage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show message
    ui.showAlert('Book Removed!','success')
    e.preventDefault()
})



















