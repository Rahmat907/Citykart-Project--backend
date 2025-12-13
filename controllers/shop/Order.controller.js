const paypal = require("../../helper/paypal.js");
const Order = require("../../models/Order.model.js");
const Cart = require("../../models/cart.models.js");
const Product = require("../../models/product.model.js");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      username,
      cartId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderData,
      orderUpdateData,
      paymentId,
      payerId,
    } = req.body;

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => ({
              name: item.title,
              sku: item.productId,
              price: Number(item.price).toFixed(2),
              currency: "USD",
              quantity: item.quantity,
            })),
          },
          amount: {
            currency: "USD",
            total: Number(totalAmount).toFixed(2),
          },
          description: "description",
        },
      ],
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("PAYPAL CREATE ERROR:", error);
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment",
        });
      } else {
        const newlyCreatedOrder = new Order({
          userId,
          username,
          cartId,
          cartItems,
          addressInfo,
          orderStatus,
          paymentMethod,
          paymentStatus,
          totalAmount,
          orderData,
          orderUpdateData,
          paymentId,
          payerId,
        });

        await newlyCreatedOrder.save();

        const approvalURL = paymentInfo.links.find((link) =>
          link.rel.toLowerCase().includes("approval")
        ).href;

        res.status(201).json({
          success: true,
          approvalURL,
          orderId: newlyCreatedOrder._id,
        });
      }
    });
  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Some error occurred",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for(let item of order.cartItems){
      const product =  await Product.findById(item.productId);

      if(!product){
          return res.status(404).json({
            success : false,
            message : `Product with id ${item.productId} not found`
          })
      }
      product.totalStock -= item.quantity;
      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Confirmed",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Some Error Occured" });
  }
};

const getAllOrderbyUser = async (req,res)=>{
  try {
    const {userId} = req.params;

    const orders = await Order.find({userId})

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
const getOrderDetails = async (req,res)=>{
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

module.exports = { createOrder, capturePayment, getAllOrderbyUser, getOrderDetails };
