// where we write our knex queries
const db = require('../dbConfig')

module.exports = {
    add,
    find,
    findByWallet,
    removeWallet,
    ADD_TRANSACTION,
    GET_ALL_TRANSACTIONS,
    GET_ALL_TRANSACTION_WALLET,
    GET_ALL_TRANSACTION_WHERE,
    GET_WALLET_BALANCE,
    UPDATE_UST_BALANCE
}

///////////////////USERS////////////////
async function add(user) {
    // return await db('users').insert(user, ['id', 'wallet'])
    return await db('users').insert(user, ['id', 'wallet'])
}

function find() {
    return db('users')
}

function findByWallet(wallet) {
    return db('users')
    .where({ wallet: wallet })
    .first()
}

function removeWallet(wallet) {
    return db('users')
    .where({ wallet })
    .del()
}
async function UPDATE_UST_BALANCE(wallet, changes) {
    // return (
    //     db('users')
    //     .where({ wallet })
    //     .update( changes, [wallet] )
    // )


    return await db('users').where({ wallet}).update(changes, ['id', 'wallet'])
}

////////////////TRANSACTION//////////////////////////

//////////////////////////////////////////////
async function ADD_TRANSACTION(transaction, user_id) {
    // const [id] = await db('transactions')
    // .where({ user_id })
    // .insert(transaction)

    // return FIND_TRANSACTION(id)
    return await db('transactions').where({ user_id }).insert(transaction, ['id'])
}

function FIND_TRANSACTION(id){
    return db('transactions')
    .where({ id })
}
////////////////////////////////////////////

function GET_ALL_TRANSACTIONS(){
    return db('transactions')
}

function GET_ALL_TRANSACTION_WALLET(wallet) {
    return db('transactions')
    .where({ wallet })
}

async function GET_ALL_TRANSACTION_WHERE(transaction_type) {
    return await db('transactions').sum('amount')
    .where({ transaction_type })
    
}

function GET_WALLET_BALANCE(wallet) {
    return db('transactions')
    .where({ wallet }).sum('amount')
}




