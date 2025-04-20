import express from 'express';
import bookRouter from  "./routers/bookRouter.mjs";
import userRouter from  "./routers/userRouter.mjs";
import transactionRouter from "./routers/transactionRouter.mjs"
import library from "./routers/libraryTemplateRouter.mjs";
import hateoas from "./hateoas/libraryHateoas.mjs";
import error from  "./utilities/error.mjs";
import template from "./templateHelpers/libraryTemplate.mjs";

const app = express();
const PORT = 3000 || 3001;


app.use(express.json());
app.use(express.static('public'));

// middleware

app.engine('library', template.callBackFunc);
app.set("views","./views");
app.set("view engine","library");

// Routes
app.use('/lib',library);
app.use('/lib/books',bookRouter);
app.use('/lib/users',userRouter);
app.use('/lib/transactions',transactionRouter);


// Basic Hateoas
app.get('/',hateoas.libraryHateoas);
app.get(/^\/lib\/book(?!s$).*/, hateoas.booksHateoas);
app.get(/^\/lib\/user(?!s$).*/,hateoas.userHateoas);
app.get(/^\/lib\/transaction(?!s$).*/,hateoas.transactionHateoas);

// transaction by userId
app.get('/transactions/users/:userId',transactionRouter);



// using the view template http://localhost:3000/library
app.get('/library',template.library);


// error handling middleware
app.use((req,res,next)=>{
    next(error(404,'Resource not found!!!'));
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({error: err.message});
});

// listener
app.listen(PORT,(req,res)=>{
    console.log(`Listening to the PORT: ${PORT}`);
});