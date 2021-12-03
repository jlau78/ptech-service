const express = require("express");
const cors = require("cors");
const app = express();
const Pool = require('pg').Pool;
const dbconfig = require('./../config/dbconfig');

const connection = new Pool(dbconfig);

// Handle CORS by setting OPTIONS for express
app.use(cors({
    origin: '*'
}));

app.get("/products/:category",(req,res) => {

    let sql = 'SELECT P.ID, P.NAME, P.DESCRIPTION , M.PATH AS MEDIA , PI.PRICE , PI.TAX '
        + 'FROM CS_PRODUCT P '
        + 'JOIN CS_CATEGORY_PRD CP ON CP.PRODUCT_ID = P.ID '
        + 'JOIN MEDIA M ON M.ID = P.LIST_MEDIA '
        + 'JOIN PRICE_INFO PI ON PI.ID = P.PRICE '
        + 'WHERE CP.CATEGORY_ID=$1'

    let products;
    let category = req.params.category;
    connection.query(sql, [category], (error, results, fields) => {
        products = results.rows; 
        if (error) {
            console.error(error.message);
            res.status(500).send('Internal server error:',error);
            return;
        }

    console.log("Found products for category:",category,", products:",products);

    products.map(item => console.log(JSON.parse(JSON.stringify(item))));
    console.log("Array of json parsed: " + JSON.parse(JSON.stringify(products)));
    console.log("Array of json: " + products);

    res.status(200).json(products);
    });
});

app.get("/product/:productid",(req,res) => {

    let sql = 'SELECT P.ID, P.NAME, P.DESCRIPTION , M.PATH AS MEDIA , PI.PRICE , PI.TAX '
        + 'FROM CS_PRODUCT P '
        + 'JOIN MEDIA M ON M.ID = P.MEDIA '
        + 'JOIN PRICE_INFO PI ON PI.ID = P.PRICE '
        + 'WHERE P.ID=$1'
    let products;
    let prodId = req.params.productid;
    connection.query(sql, [prodId], (error, results, fields) => {
        products = results.rows; 
        if (error) {
            console.error('Error occurred querying pg:',error.message);
            res.status(500).send('Internal server error happened:'+error);
            // return;
            throw error;
        }

    console.log("Found product with id:",prodId,", products:",products);

    products.map(item => console.log(JSON.parse(JSON.stringify(item))));
    console.log("Array of product parsed: " + JSON.parse(JSON.stringify(products)));
    console.log("Array of product json: " + JSON.stringify(products));

    res.status(200).json(products);
    });
});


app.get("/skus/:productid",(req,res) => {

    let sql = 'SELECT S.ID, S.NAME, S.DESCRIPTION FROM CS_SKU S JOIN CS_PROD_SKU CP '
    + 'ON CP.SKU_ID = S.ID WHERE CP.PRODUCT_ID=$1';
    let skus = {};
    let productid = req.params.productid;
    connection.query(sql, [productid], (error, results, fields) => {
        skus = results.rows; 
        if (error) {
            console.error(error.message);
            res.status(500).send('Internal server error:',error);
            return;
        }

    //console.log("Found products for category:",category,", products:",products);
    res.status(200).json(skus).header({"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "*" });

    });
});


app.get("/attribs/:productid",(req,res) => {

    let sql = 'SELECT CA.ID, CA.NAME, CA.DESCRIPTION , CA.VALUE '
    + 'FROM CS_PRODUCT P '
    + 'JOIN CS_PROD_ATTRIBUTE CP ON CP.PRODUCT_ID = P.ID '
    + 'JOIN CS_ATTRIBUTE CA ON CA.ID = CP.ATTRIBUTE_ID '
    + 'WHERE P.ID = $1'
    ;

    let attributes;
    let product = req.params.productid;
    connection.query(sql, [product], (error, results, fields) => {
        attributes = results.rows; 
        if (error) {
            console.error(error.message);
            res.status(500).send('Internal server error:',error);
            return;
        }

    console.log("Found attributes for product:",product,", attributes:",attributes);

    attributes.map(item => console.log(JSON.parse(JSON.stringify(item))));
    console.log("Array of json parsed: " + JSON.parse(JSON.stringify(attributes)));
    console.log("Array of attributes json: " + JSON.stringify(attributes));

    res.status(200).json(attributes);
    });
});

module.exports = app;

