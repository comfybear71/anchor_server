const express = require('express');
const Users = require('../models/dbhelpers');

/////////////////////USER////////////////////////

const router = express.Router()

//ADD NEW WALLET WHEN WALLET CONNECTS
router.post('/', (req, res) => {
    Users.add(req.body)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not add Wallet, already exists"})
    })
})

//FINDS ALL WALLETS
router.get('/', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ message: "Can not get Wallet"})
    })
})

//FIND A WALLET BY WALLET ADDRESS
router.get('/:wallet', (req, res) => {
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
router.delete ('/:wallet', (req, res) => {
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
router.patch('/:wallet', (req, res)=> {
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

module.exports = router