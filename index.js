require("dotenv").config()
const server = require('./api/server')

const port = process.env.PORT || 5000;

server.listen(5000, ()=> {
    console.log(`\n*** server running on port ${port}`);
})



