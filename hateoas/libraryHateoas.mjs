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
function booksHateoas(req,res){
    return res.json({
        links: [
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
    });
}
// links for users
function userHateoas(req,res){
    return res.json({
        links: [
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
    });
}

// links for transactions
function transactionHateoas(req,res){
    return res.json({
       links: [
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
        ]
    })
}
export default { libraryHateoas,booksHateoas,userHateoas,transactionHateoas};