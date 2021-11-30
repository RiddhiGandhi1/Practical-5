const express = require("express");
const sellerModel = require("../models/seller");
const router = express.Router();
router.use(express.json());

const sellerList = require("../models/seller");

router.get("/", (req, res) => res.send("Seller API"));

//Add Seller
router.post("/add", async (req, res) => {
    const { newSeller } = req.body;
    sellerModel.create(newSeller);
    return res.json({data : "Seller added!"});
});

//Update Seller
router.put("/change/:sid", async (req, res) => {
    const sid = req.params.sid;
    const productIDs = req.body.product_ids;
    const updatedSeller = await sellerModel.findOneAndUpdate(
        { seller_id : sid }, 
        { product_ids : productIDs }, 
        { new : true }
    );
    return res.json({data : "Seller's Product Changed!"});
});

//Delete Seller
router.delete("/delete/:sid", async (req, res) => {
    const sid = req.params.sid;
    const deleteSeller = await sellerModel.findOneAndDelete({ seller_id : sid });
    console.log(JSON.stringify(deleteSeller));
    return res.json({ data : "Seller Deleted!" });
});

//List All Seller
router.get("/list", async (req,res) => {
    const sellerList = await sellerModel.find();
    if(sellerList.length === 0) {
        return res.json({ data : "No Seller Found:(!" });
    }
    return res.json({data : sellerList});
});

//Seller List Based on Product Name
router.get("/product/:productName", async (req, res) => {
    const productName = req.params.productName;
    const productModel = require("../models/product");
    const product = await productModel.findOne({ title : productName });
    
    if (product == null || product.length < 0){
        return res.json({ data : "No Product Found :(!" });
    } else {
        const sellerList = await sellerModel.find({ product_ids : product["product_id"] });
        if (sellerList.length === 0) {
            return res.json({ data : "No Company Found :(!" });
        }
        return res.json({ data : sellerList });
    }
});

module.exports = router;