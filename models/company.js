const mongooose = require("mongoose");

//Company Scheme
const companySchema = mongooose.Schema({
    company_id : String,
    name : String,
    product_ids : Array 
});

const companyModel = mongooose.model("company", companySchema);

module.exports = companyModel;