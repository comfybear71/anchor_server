const cors = require('cors');
const express = require('express');

const userRouter = require('../Routes/user-routes')
const transactionRouter = require('../Routes/trans-routes')
const balanceRouter = require('../Routes/balance-routes')
const transactionWhereRouter = require('../Routes/transaction-where-routes')

const server = express();

server.use(express.json())
server.use(cors());

server.get('/', (req, res) => {
    res.json({welcome: 'Welcome to ANCHOR.GOLD Turn TERRA into GOLD...!'});
})

server.use('/api/users', userRouter)
server.use('/api/transactions', transactionRouter)
server.use('/api/wallet_balance', balanceRouter)
server.use('/api/transactions_where', transactionWhereRouter)

module.exports = server