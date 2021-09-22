const express = require("express");
const app = express();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'passw0rd',
  database : 'ptech'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('Connected to MySQL Server!');
});

app.get("/products/:category",(req,res) => {

    let sql = 'SELECT P.ID, P.NAME, P.DESCRIPTION FROM CS_PRODUCT P JOIN CS_CATEGORY_PRD CP '
    + 'ON CP.PRODUCT_ID = P.ID WHERE CP.CATEGORY_ID=?';
    let products;
    let category = req.params.category;
    connection.query(sql, [category], (error, results, fields) => {
        products = JSON.stringify(results); 
        if (error) {
            console.error(error.message);
            res.status(500).json('Internal server error:',error);
            return;
        }

    console.log("Found products for category:",category,", products:",products);

    res.status(200).json(products);

    });

});

app.get("/skus/:productid",(req,res) => {

    let sql = 'SELECT S.ID, S.NAME, S.DESCRIPTION FROM CS_SKU S JOIN CS_PROD_SKU CP '
    + 'ON CP.SKU_ID = S.ID WHERE CP.PRODUCT_ID=?';
    let skus = {};
    let productid = req.params.productid;
    connection.query(sql, [productid], (error, results, fields) => {
        skus = JSON.stringify(results); 
        if (error) {
            console.error(error.message);
            res.status(500).send('Internal server error:',error);
            return;
        }

    //console.log("Found products for category:",category,", products:",products);
    res.status(200).json(skus);

    });

});




app.listen(3000, () => {
    console.log('Server is running at port 3000');
});