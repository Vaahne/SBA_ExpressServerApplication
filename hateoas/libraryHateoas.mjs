// basic links to be displayed for library
function libraryHateoas(req, res){
    return res.json({
        links : [
            {
                href: '/lib/',
                rel: 'library', 
                type: 'GET'
            },
            {
                href: '/lib/books',
                rel: 'books', 
                type: 'GET'
            },
            {
                href: '/lib/users',
                rel: 'users', 
                type: 'GET'
            },
            {
                href: '/library',
                rel: 'Library website',
                type: 'TEMPLATE'
            }
        ]
    });
}
//  links for books
function booksHateoas(){
    return  [
            {
                href: "/lib/books",
                rel : "books",
                type: "GET"
            },
            {
                href: "/lib/books",
                rel : "books",
                type: "POST"
            },
            {
                href: "/lib/books/:id",
                rel : "books",
                type: "GET"
            },
            {
                href: "/lib/books/?id=",
                rel : "books",
                type: "GET"
            },
            {
                href: "/lib/books/:id",
                rel : "books",
                type: "DELETE"
            }
        ]
}
// links for users
function userHateoas(req,res){
    return  [
            {
                href: "/lib/users",
                rel : "users",
                type: "GET"
            },
            {
                href: "/lib/users",
                rel : "users",
                type: "POST"
            },
            {
                href: "/lib/users/:userId",
                rel : "users",
                type: "GET"
            },
            {
                href: "/lib/users/:userId",
                rel : "users",
                type: "DELETE"
            }
        ]
}

// links for transactions
function transactionHateoas(){
    return  [
        {
            href: "/lib/transactions",
            rel : "transactions",
            type: "GET"
        },
        {
            href: "/lib/transactions/:id",
            rel : "transactions",
            type: "GET"
        },
        {
            href: "/transactions/users/:userId",
            rel : "transactions",
            type: "GET"
        },
        {
            href: "/transactions/books/:bookId",
            rel : "transactions",
            type: "GET"
        }    
        ];
}
function getUserLinks(userId){
    return {
        self: { href: `/lib/users/${userId}` },
        update: { href: `/lib/users/${userId}`, method: "PATCH" },
        delete: { href: `/lib/users/${userId}`, method: "DELETE" },
        all: { href: "/lib/users", method: "GET" }
    };  
}

function getBookLinks(bookId){
    return {
        self: { href: `/lib/books/${bookId}` },
        update: { href: `/lib/books/${bookId}`, method: "PATCH" },
        delete: { href: `/lib/books/${bookId}`, method: "DELETE" },
        all: { href: "/lib/books", method: "GET" }
    };
}

function getTransactionLinks(transaction_id) {
    return {
        self: { href: `/lib/transactions/${transaction_id}` },
        update: { href: `/lib/transactions/${transaction_id}`, method: "PATCH" },
        delete: { href: `/lib/transactions/${transaction_id}`, method: "DELETE" },
        all: { href: "/lib/transactions", method: "GET" }
    };
}
export default { libraryHateoas,booksHateoas,userHateoas,transactionHateoas,getTransactionLinks,getBookLinks,getUserLinks};