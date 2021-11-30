const express = require("express");
const companyModel = require("../models/company");
const router = express.Router();
router.use(express.json());

const companyList = require("../models/company");

router.get("/", (req, res) => res.send("Company API"));

//Add Compan
router.post("/add", (req, res) => {
    const { newCompany } = req.body;
    companyModel.create(newCompany);
    return res.json({data : "Company added!"});
});

//Update Company
router.put("/change/:cid", async (req, res) => {
    const cid = req.params.cid;
    const productIDs = req.body.product_ids;
    const updatedCompany = await companyModel.findOneAndUpdate(
        { company_id : cid }, 
        { product_ids : productIDs }, 
        { new : true }
    );

    return res.json({ data: "Company's Updated!" });
});

//Delete Company
router.delete("/delete/:cid", async (req, res) => {
    const cid = req.params.cid;
    const deletedCompany = await companyModel.findOneAndDelete({ company_id : cid});
    console.log(JSON.stringify(deletedCompany));
    return res.json({ data : "Company Deleted!" })
});

//List All Companies
router.get("/list", async (req,res) => {
    const companyList = await companyModel.find();
    if (companyList.length === 0) {
        return res.json({ data : "No Company Found :(!" });
    }
    return res.json({ data : companyList });
});

//Company List Based on Product Name
router.get("/Product/:productName", async (req,res) => {
    const productName = req.params.productName;
    const productModel = require("../models/product");
    const product = await productModel.findOne({ title : productName });
    
    if (product == null || product.length < 0){
        return res.json({ data : "No Product Found :(!" });
    } else {
        const companyList = await companyModel.find({ product_ids : product["product_id"] });
        if (companyList.length === 0) {
            return res.json({ data : "No Company Found :(!" });
        }
        return res.json({ data : companyList });
    }
});

module.exports = router;