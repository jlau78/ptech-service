const express = require("express");
const cors = require("cors");
const app = express();
const Pool = require('pg').Pool;
const dbconfig = require('./config/dbconfig');

const putCatalog = require('./put/catalog');
const viewCatalog = require('./view/read');


// Handle CORS by setting OPTIONS for express
app.use(cors({
    origin: '*'
}));

app.use('/put', putCatalog);
app.use('/', viewCatalog);


app.listen(3001, () => {
    console.log('Server is running at port 3001');
});