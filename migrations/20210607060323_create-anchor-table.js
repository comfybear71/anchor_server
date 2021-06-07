
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.text('wallet', 128).unique().notNullable()
        tbl.float('ustBalance').notNullable()
        tbl.timestamps(true, true)
    })
    .createTable('transactions', tbl => {
        tbl.increments() 
        tbl.text('wallet', 128)
            .notNullable()
        tbl.string('transaction_type')
            .notNullable()
        tbl.float('amount')
            .notNullable()
        tbl.string('txHash')
            .notNullable()
        tbl.timestamps(true, true)
        //Below is the foriegn key to the users table
        tbl.integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('transactions').dropTableIfExists('users')
};
