const mongooose = require("mongoose");

//Product Schema
const productSchema = mongooose.Schema({
    product_id : String,
    title : String,
    price : String,
    category : Array,
    company_id : String,
    seller_id : Array
});

const productModel = mongooose.model("productManagement", productSchema, "productManagement");

module.exports = productModel;
