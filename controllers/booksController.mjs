import books from '../data/books.mjs';
import hateoas from '../hateoas/libraryHateoas.mjs'

// returns all books or specific book based on query parameter
function allbooks(req,res){
    const {bookId} = req.query; // using query parameter by bookId

    if(bookId){
        const book = books.find((b) => b.bookId == bookId);
        if(book){
            return res.status(200).json({
                ...book,
                _links : hateoas.getBookLinks(bookId)
            });
        }
        return res.send(404).json(`Book not found!!!!`);
    } 

    const bookWithLinks = books.map((b)=>({
        ...b,
        _links:{
            href: `/lib/books/${b.bookId}`
        }
    }));

    return res.json({
        books: bookWithLinks,
        _links: hateoas.booksHateoas()
    });
}
// Returns/gets specific book based on bookId (:id)
function specificBook(req,res,next){
    const id = req.params.id;
    if(id){
        const book = books.find((b)=> b.bookId == id);
        console.log("specifif book",book);
        if(book)
            return res.status(200).json({
                ...book,
                _links: hateoas.getBookLinks(id)
            });
    }
    return res.status(404).json("Book not Found in the library");
}
// adds a book to the books
function addBook(req,res){
    if(req.body && req.body.title){
        const id = books[books.length-1].bookId + 1;
        const book = {bookId : id, title : req.body.title};
        books.push(book);
        return res.status(201).json(book);
    }
    return res.json(`Insufficient Data`);
}
// deletes a book based on the bookId
function deleteBook(req,res){
    const bookId = req.params.id;
    
    for(let b in books){
        if(books[b].bookId == bookId){
            const book = books[b];
            books.splice(b,1);
            return res.status(200).json(book);
        }
    }
    return res.json("Book Not Found");   
}
//  updates a book title based in bookid
function updateBook(req,res){
    const bookId = req.params.id;

    const book = books.find((b,i)=> {
         if(b.bookId == bookId){
           books[i].title = req.body.title;
           return true;
        }
    });
    if(book)
        return res.status(200).json(book);
    return res.json(`Book not found`);
}

export default {addBook,allbooks,deleteBook,updateBook,specificBook};