const express = require('express');
const Users = require('../models/dbhelpers');

////////////////TRANSACTION//////////////////////////

const router = express.Router()

//ADD A TRANSACTION RECORD
router.post('/:wallet/transactions', (req, res)=> {
    
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
router.get('/', (req, res) => {
    Users.GET_ALL_TRANSACTIONS()
    .then(found => {
        res.status(200).json(found)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not find Transactions"})
    })
})

//FIND ALL TRANSACTIONS BY WALLET ADDRESS
router.get('/:wallet', (req, res) => {
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



module.exports = router