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

// This is required otherwise req.body is undefined instead of the expected JSON object
app.use(express.json());

app.post('/create/product', (req, res) => {
  if (req != null || req != undefined) {

    console.log('req body:', req.body);

    let payload = req.body;

    console.log('payload name:', payload.name);

    let priceId = createPrice(payload);
    let mediaId = createImage(payload);

    payload.price = priceId;
    payload.media = mediaId;
    let productId = createProduct(payload);
    
    res.status(200).send(JSON.stringify(payload));

  } else {
    console.error("Error: request is undefined: ", err);
    res.status(406).send('The request was empty. Cannot process.');
  }

});

function createImage(payload) {
  let sql = 'INSERT INTO MEDIA (name, type, path) VALUES ($1, $2, $3)';

  let media = payload.media;
  connection.query(sql, [media.name, media.type, media.path], (error, results, fields) => {

    if (error) {
      console.log("Error create media item: ", error);
      return false;
    }

    console.log("Success: created media item:", results);
   
    if (results.rows != null || results.rows != undefined) {
      return results.rows[0].id;
    } else {
      return null;
    }
    
  });
}


function createPrice(payload) {
  let sql = 'INSERT INTO PRICE_INFO (ref, price, tax) VALUES ($1, $2, $3)';

  let price = payload.price;
  connection.query(sql, [price.ref, price.price, price.tax], (error, results, fields) => {

    if (error) {
      console.log("Error create priceInfo item: ", error);
      return false;
    }

    console.log("Success: created priceInfo item:", results);
   
    if (results.rows != null || results.rows != undefined) {
      return results.rows[0].id;
    } else {
      return null;
    }
    
  });
}
function createProduct(product) {
  let sql = 'INSERT INTO CS_PRODUCT (name, description, price, image_url) VALUES ($1, $2, $3, $4)';

  connection.query(sql, [product.name, product.description, product.price, product.media], (error, results, fields) => {

    if (error) {
      console.log("Error creating product: ", error);
      return false;
    }

    console.log("Success: created product:", results);
    
    if (results.rows != null || results.rows != undefined) {
      return results.rows[0].id;
    } else {
      return null;
    }
  
  });
}

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


module.exports = app;