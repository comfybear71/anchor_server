const express = require('express');
const Users = require('../models/dbhelpers');

/////////////////////WALLET BALANCE////////////////////////

const router = express.Router()

//FINDS ALL TRANSACTION WHERE EQUAL DEPOSIT, WITHDRAW, PURCHASE
router.get('/:trans', (req, res) => {
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

module.exports = router