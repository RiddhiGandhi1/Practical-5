const mongooose = require("mongoose");

//Company Scheme
const sellerSchema = mongooose.Schema({
    seller_id : String,
    name : String,
    product_ids : Array
});

const sellerModel = mongooose.model("seller", sellerSchema, "seller");

module.exports = sellerModel;