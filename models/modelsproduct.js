const mongoose = require("mongoose")
const slug = require("mongoose-slug-updater")

mongoose.plugin(slug);// kich hoat slug
const productSchema = new mongoose.Schema(
    {    
title : String,
slug: {type: String,
    slug:"title", // khi chay 1 trang web url se la ../title
    unique: true // de ko bi trung slug 
},
description:String,
price : Number,
discountPercentage : Number,
stock : Number,
thumbnail :String,
status :String,
position : Number,
deleted : {
    type: Boolean,
    default: false // khi tao san pham thi mac ding la false
},
deletedAt: Date
    }, { strict: false, 
        timestamps: true // mac dinh se tao ra them creatat và updateat

     }
);

const Product = mongoose.model("Product" , productSchema, "products");


module.exports = Product ;