const Product = require("../../models/product.model.js");



const serachProducts = async (req,res)=>{
    try {
            const {keyword} = req.params;

            if(!keyword || typeof keyword !== "string"){
                return res.status(400).json({
                    success:false,
                    message:"Keyword is required"
                })
            }

            const regex = new RegExp(keyword, 'i'); // 'i' for case-insensitive
            const createSerachQuery ={
                $or:[
                    {title: regex},
                    {description: regex},
                    {category: regex},
                    {brand: regex},
                ]
            }

            const searchResults = await Product.find(createSerachQuery);

            res.status(200).json({
                success : true,
                data : searchResults
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            sucess:false,
            message:"Server Error in searching products"
        })
        
    }
}


module.exports = {
    serachProducts
}