### Library Management System
 A full-stack Library Management System built with Express.js, offering management of books, users, and transactions via both UI and API (Thunder Client). The system uses a template view engine for rendering dynamic HTML, includes custom middleware for input validation, and provides complete CRUD functionalities.
## Features
 books,users,transactions
 All CRUD operations and get all
    using UI (used template view engine)
    using thunderclient
## RegEx handling with Hateoas support
 Implemented HATEOAS by adding navigational links to every resource in API responses.
## Access
 Interactive UI (Template Engine powered)
 Thunder Client(API testing)
# Error handling 
 Customized error handling middleware to gracefully catch and respond to all application errors.
## Custome middleware 
    validating username
    validating transaction type
## Template engine
 Dynamic page rendering using common layout structure
  userTemplate - displays user information and actions
  bookTemplate - manages book listing and crud
  libraryTemplate - handles transactions
  formTemplate - Reusable form for both users and Books
## static files
 Organized under public directory
    css:from styles folder from public
    js: from scripts folder from public
## query parameter
    /lib/transactions?transaction_id=1 - search a transaction
    /lib/books?book_id=1 - search a book
    /lib/users?user_id=1 - search a user
## input validation with express-validator
 Used express-validator to validate the book title before performing any business logic.
## To Run
 npm i
 npm start
# Visit 
 http://localhost:3000/library