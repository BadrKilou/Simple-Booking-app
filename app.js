// BOOK CONSTRUCTOR
function Book(title,author,id){
    this.title = title;
    this.author = author;
    this.id = id;
}

// UI CONSTRUCTOR

function UI(){}
UI.prototype.addBookTolist = function(book){
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
// SHOW ALERT

UI.prototype.showAlert = function(message,className){
  // Create a div
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

UI.prototype.clearField = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('id').value = '';

}

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}

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
            ui.addBookTolist(book)
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

    ui.deleteBook(e.target)
    // Show message
    ui.showAlert('Book Removed!','success')
    e.preventDefault()
})
































// // BOOK CONSTRUCTOR
// function Book(title,author,id){
//     this.title = title;
//     this.author = author;
//     this.id = id;
// }

// // UI CONSTRUCTOR

// function UI(){}
// UI.prototype.addBookTolist = function(book){
//     const list = document.getElementById('book-list');
//     // Create tr element
//     const row = document.createElement('tr')
//     row.innerHTML = `
//      <td>${book.title}</td>
//      <td>${book.author}</td>
//      <td>${book.id}</td>
//      <td><a href="#" class="delete">X<a/></td>

//     `
//     list.appendChild(row)
    
// }

// UI.prototype.clearField = function(){
//     document.getElementById('title').value = '';
//     document.getElementById('author').value = '';
//     document.getElementById('id').value = '';

// }

// // Event Listeners


// const bookForm = document.getElementById('book-form');
// bookForm.addEventListener('submit',function(e){
//     // Get Form Values
//     const title = document.getElementById('title').value;
//     const author = document.getElementById('author').value;
//     const ID = document.getElementById('id').value;
//      // Instintiate Book
//     const book = new Book(title,author,ID);

//     // Instintiate UI
//     const ui = new UI();
//     // Add Book to List
//     ui.addBookTolist(book)
//     // ClearFields

//     ui.clearField();

    




//     e.preventDefault()
   
// })

