
const Product = require('../../models/product.model')

const getFilteredProduct = async (req,res)=>{
    try {

        const {category = [], brand = [], sortBy = "priceLowToHigh" } = req.query

        let filters = {};
        if(category.length){
            filters.category= {$in: category.split(',')}
        }
        if(brand.length){
            filters.brand= {$in: brand.split(',')}
        }

        let sort = {}

        switch (sortBy) {
            case 'priceLowToHigh':
                sort.price = 1
                
                break;
            case 'priceHighToLow':
                sort.price = -1
                  
                break;
            case 'titleAToZ':
                sort.title = 1
                
                break;
            case 'titleZToA':
                sort.title = -1
                
                break;
        
            default:
                sort.price = 1;
                break;
        }
        const product = await Product.find(filters).sort(sort); 

        res.status(200).json({
            success : true,
            data : product,
            
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
               success: false,
               message: 'Some error Occured' 
        })
        
    }
}


    const getProductDetail = async(req,res)=>{
        try {
           const {id} = req.params;
           const product = await Product.findById(id)  
           
           if(!product) return res.status(404).json({
            success : false,
            message :  'Product not found'
           })

           res.status(200).json({
            success : true,
            data : product,
           })
        } catch (e) {
          res.status(500).json({
               success: false,
               message: 'Some error Occured' 
        })  
        }
    }

module.exports = {getFilteredProduct , getProductDetail}