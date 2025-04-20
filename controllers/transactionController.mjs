import transactions from "../data/transactions.mjs";

// returns or gets all transactions
function allTransactions(req,res){
    const {transaction_id} =req.query;
    
    if(transaction_id){
        const transaction = transactions.find((t)=> t.transaction_id == transaction_id);
        if(transaction)
            return res.json(transaction);
        return res.status(404).json("Transaction not found");
    }
    return res.json(transactions);
}
// updates/patches a transaction based on the transaction_Id
function borrowOrReturn(req,res){
    const transaction_id = req.params.id;
    const reqType = req.body.type;

    if(!transaction_id)
        return res.status(400).json(`Empty Transaction id`);

    const transaction = transactions.find((t)=> t.transaction_id == transaction_id);

    if(!transaction)
        return res.status(404).json("Invalid transaction Id");

    if(transaction.type == reqType)
        return res.status(400).json(`Book is already in ${reqType}ed. Cannot ${reqType} again `);

    transaction.type = reqType;
    
    return res.json({ 
        message: "Transaction successfully updated",
        transaction:   transaction
    });
}

// gets a transaction by transaction_id
function searchTransaction(req,res){
    const transaction_id = req.params.id;
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    if(userId){
        const transaction = transactions.filter((t)=> t.userId == userId);
        if(transaction.length == 0)
            return res.status(404).json(`No transactions for the given userId`);
        return res.status(200).json(transaction);    
    }
    if(bookId){
        const transaction = transactions.filter((t)=> t.bookId == bookId);
        if(transaction.length == 0)
            return res.status(404).json(`No transactions for the given bookId`);
        return res.status(200).json(transaction);    
    }


    if(!transaction_id)
        return res.status(400).json(`Empty Transaction id`);

    const transaction = transactions.find((t)=> t.transaction_id == transaction_id);
    if(transaction)
        return res.json(transaction);
    return res.status(404).json("Transaction not found");
}

export default {allTransactions,borrowOrReturn, searchTransaction};