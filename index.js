const server = require('./api/server')

const PORT = 5000;

server.listen(5000, ()=> {
    console.log(`\n*** server running on http://localhost:${PORT}`);
})



