const express = require('express');
const Users = require('../models/dbhelpers');

/////////////////////WALLET BALANCE////////////////////////

const router = express.Router()

//GET WALLET BALANCE
router.get('/:wallet', (req, res) => {
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

module.exports = router