const productModel=require("../model/productModel")

const createProductController=async (req,resp)=>{       
        try {
            const {name,description,price,quantity}=req.body
    switch(true)
    {
        case !name:
            return resp.status(500).send({error:"Name is required"})
        case !description:
            return resp.status(500).send({error:"Description is required"})
        case !price:
            return resp.status(500).send({error:"Price is required"})
        case !quantity:
            return resp.status(500).send({error:"Quantity is required"})   
    }
    const product = new productModel({ name, description, price, quantity });
    await product.save();

    resp.status(201).json({ message: 'Product added successfully' });

        } catch(error)
        {
            console.error(error);
            resp.status(500).json({ message: 'Internal server error' });
        }
}

const getProductsController=async (req,resp)=>{
    try{
     const product=await productModel.find({})
     resp.status(201).json({ message: 'Product fetched successfully',
        success:true,
        TotalCount:product.length,
        productList:product });

    } catch(error){
        console.error(error);
        resp.status(500).json({ message: 'Internal server error' });
    }
 }


const productDeleteController=async (req,resp)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid)
        resp.status(200).json({
            success:true,
            message:"Product deleted successfully",
        })
    }catch(error){
        resp.status(500).json({
            success:false,
            message:"Error deleting Product",
            error:error.message
        })
    }
}

const updateProductController=async (req,resp)=>{
    try {
        const {name,description,price,quantity}=req.body


const product = await productModel.findByIdAndUpdate(
    req.params.pid,
    { name, description, price, quantity },
    { new: true }
  );

  resp.status(200).json({
    success: true,
    message: "Product updated successfully",
    product,
  });

    } catch(error)
    {
        resp.status(500).json({
            success:false,
            error,
            message:"Error in updating product"
        })
    }
}



module.exports={ createProductController,updateProductController,productDeleteController,getProductsController }