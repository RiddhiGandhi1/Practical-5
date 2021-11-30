const express = require("express");
const productModel = require("../models/product");
const router = express.Router();
router.use(express.json());

const productList = require("../models/product")

router.get("/", (req, res) => res.send("Product API"));

//Add Product
router.post("/add", async (req, res) => {
    const { newProduct } = req.body;
    productModel.create(newProduct);
    return res.json({ data : "Product added!" });
});

//Update Product
router.put("/change/:pid", async (req,res) => {
    const pid = req.params.pid;
    const category = req.body.category;
    const updatedProduct = await productModel.findOneAndUpdate(
        { product_id : pid }, 
        { category : category }, 
        { new : true }
    );

    return res.json({ data: "Product Updated!" });
});

//Delete Product
router.delete("/delete/:pid", async (req, res) => {
    const pid = req.params.pid;
    const deleteProduct = await productModel.findOneAndDelete({ product_id : pid });
    return res.json({ data : "Product Deleted!" });
});

//List All Product
router.get("/list", async (req,res) => {
    const productList = await productModel.find();

    if(productList.length === 0) {
        return res.json({ data : "No Product Found" });
    }
    res.json({data : productList});
});

//Companywise Product
router.get("/company/:cid", async (req, res) => {
    const companyID = req.params.cid;
    const productList = await productModel.find({ company_id : companyID });
    return res.json({ data : productList });
});

//Sellerwise Product
router.get("/seller/:sid", async (req, res) => {
    const sellerID = req.params.sid;
    const productList = await productModel.find({ seller_id : sellerID });
    return res.json({ data : productList });
});

module.exports = router;