const express=require('express')
const router=express.Router()
const { createProductController, updateProductController, getProductsController, productDeleteController } = require('../controller/ProductController')

router.get('/getproducts',getProductsController)
router.post('/addProducts',createProductController)
router.post('/delete/:pid',productDeleteController)
router.put('/update/:pid',updateProductController)

module.exports=router