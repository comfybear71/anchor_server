const cors = require('cors');
const express = require('express');
const Users = require('./models/dbhelpers');

const server = express();

server.use(express.json())
server.use(cors());

const PORT = 5000;

server.get('/', (req, res) => {
    //res.send({welcome: 'Welcome to project 3 or PART III'});
    res.json({welcome: 'Welcome to project 3 or PART III'});
})

/////////////////////USER////////////////////////

//ADD NEW WALLET WHEN WALLET CONNECTS
server.post('/api/users', (req, res) => {
    Users.add(req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not add Wallet, already exists"})
    })
})

//FINDS ALL WALLETS
server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not get Wallet"})
    })
})

//FIND A WALLET BY WALLET ADDRESS
server.get('/api/users/:wallet', (req, res) => {
    const { wallet } = req.params

    Users.findByWallet(wallet)
    .then(user => {
        if (user){
            res.status(200).json(user)
        } else {
            res.status(404).json({message: "Wallet not Found..."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "There is a problem..."})
    })
})

//DELETES A WALLET BY USING WALLET ADDRESS
server.delete ('/api/users/:wallet', (req, res) => {
    const { wallet } = req.params
    Users.removeWallet(wallet)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: "Successfully deleted Wallet"})
        } else {
            res.status(404).json({message: "Unable to locate Wallet"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Unable to perform operation"})
    })
})

//UPDATES UST BALANCE WITH PATCH
server.patch('/api/users/:wallet', (req, res)=> {
    const { wallet } = req.params
    const changes = req.body
    Users.UPDATE_UST_BALANCE(wallet, changes)
    .then(balance => { 
        if(balance) {
            res.status(200).json(balance)
        } else {
            res.status(404).json({message: "Wallet Not found to Update Balance"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "THERE was an ERROR"})
    })

})


////////////////TRANSACTION//////////////////////////

//ADD A TRANSACTION RECORD
server.post('/api/users/:wallet/transactions', (req, res)=> {
    
    const { wallet } = req.params
    const transaction = req.body
    

        
    Users.findByWallet(wallet)
    .then(user => {
        var id = user.id

        if (!transaction.user_id) {
            transaction["user_id"] = parseInt(id, 10)
        }

        Users.findByWallet(wallet)
        .then(user => {
            if(!user) {
                res.status(404).json({ message: "Invalid Wallet address"})
            } 
        
            // Check for all required fields
            if(!transaction.wallet || !transaction.transaction_type || !transaction.amount || !transaction.txHash) {
                res.status(400).json({ message: "Must provide all fields, transaction_type, amount, txHash"})
            }

            

            Users.addTransaction(transaction, id)
            .then(trans => {
                if(trans) {
                    res.status(200).json( trans )
                } 
            })
            .catch(err => {
                res.status(500).json({ message: "Transaction Failed"})
            })
        })
        .catch(err => {
            res.status(500).json({ message: "ERROR ADDING TRANSACTION"})
        })
    })
})

//FIND ALL TRANSACTION
server.get('/api/transactions', (req, res) => {
    Users.GET_ALL_TRANSACTIONS()
    .then(found => {
        res.status(200).json(found)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not find Transactions"})
    })
})

//FIND ALL TRANSACTIONS BY WALLET ADDRESS
server.get('/api/transactions/:wallet', (req, res) => {
    const { wallet } = req.params
    Users.GET_ALL_TRANSACTION_WALLET(wallet)
    .then(found => {
        if (found){
            res.status(200).json(found)
        } else {
            res.status(404).json({message: "Wallet not Found..."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "There is a problem..."})
    })
})

//FINDS ALL TRANSACTION WHERE EQUAL DEPOSIT, WITHDRAW, PURCHASE
server.get('/api/transactions_where/:trans', (req, res) => {
    const { trans } = req.params
    Users.GET_ALL_TRANSACTION_WHERE(trans)
    .then(found => {
        if (found){
            res.status(200).json(found)
        } else {
            res.status(404).json({message: "Wallet not Found..."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "There is a problem..."})
    })
})

//GET WALLET BALANCE
server.get('/api/wallet_balance/:wallet', (req, res) => {
    const { wallet } = req.params
    Users.GET_WALLET_BALANCE(wallet)
    .then(found => {
        if (found){
            res.status(200).json(found)
        } else {
            res.status(404).json({message: "Wallet not Found..."})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "There is a problem..."})
    })
})




////////////////LISTENING////////////
server.listen(5000, ()=> {
    console.log(`\n*** server running on http://localhost:${PORT}`);
})



