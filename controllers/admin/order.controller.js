
const Order = require('../../models/Order.model')



const getAllOrderofAllUser = async (req,res)=>{
  try {

    const orders = await Order.find({})

    if(!orders.length){
      return res.status(404).json({
        success : false,
        message : 'No Order Found!'
      })
    }

    res.status(200).json({
      success : true,
      data : orders
    })
  } catch (error) {
     console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
    
  }
}
const getOrderDetailsForAdmin = async (req,res)=>{
  try {
        const {id} = req.params;
        const order = await Order.findById(id)

    if(!order){
      return res.status(404).json({
        success : false,
        message : 'Order Not Found!'
      })
    }
    
    res.status(200).json({
      success : true, 
      data : order
    })      
  } catch (error) {
     console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
    
  }
}

  const updateOrderStatusForAdmin = async (req,res)=>{
    try {
          const {id} = req.params;
          const {orderStatus} = req.body;
          const order = await Order.findById(id)

    if(!order){
      return res.status(404).json({
        success : false,
        message : 'Order Not Found!'
      })
    }

    await Order.findByIdAndUpdate(id, { orderStatus });
    res.status(200).json({
      success : true, 
      message : 'Order Status Updated Successfully'
    })
  }catch (error) {
     console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
}


module.exports = {getAllOrderofAllUser,getOrderDetailsForAdmin, updateOrderStatusForAdmin}