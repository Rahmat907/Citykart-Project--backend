const dotenv = require('dotenv')
dotenv.config()
const express = require("express");
const mongoose = require("mongoose");
// const cookieParser = require('cookie-parser')
const cors = require("cors"); // ek ke sath proxy bhi atta hai jo direct kar deyta hai fronted server to server
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth/auth.route.js')
const adminProductsRouter= require('./routes/admin/products.routes.js')
const adminOrdersRouter = require('./routes/admin/Order.route.js')
const shopProductRouter = require('./routes/shop-view/product-route.js')
const shopCartRouter = require('./routes/shop-view/cart-route.js')
const shopAdressRouter = require('./routes/shop-view/address.route.js')
const shopOrdersRouter = require('./routes/shop-view/order.route.js')
const shopSearchRouter = require('./routes/shop-view/search.route.js')
const shopaskAiRouter = require('./routes/shop-view/ai.route.js')


mongoose
  .connect(`mongodb+srv://rahmatkingkhan4_db_user:${process.env.MONGODB_PASSWORD}@citykartproject.tldv2kq.mongodb.net/`)
  .then(() => console.log("mongo db connect"))
  .catch((error) => console.log(error));

const app = express();
const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: 'https://citykart-frontend.vercel.app',
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type", // josn type main bhejeyga 
      "Authorization", // token bhejeyga
      "Cache-Control", // no cache k liye
      "Expires",  // cache k liye
      "Pragma", // cache k liye
    ],
    credentials: true, // cookie ko allow karne k liye
  })
);

app.get('/', (req, res)=>{
  res.status(200).json({
    success: true,
    project : "Citykart API",
    developer : "Rahmat77",
    status : "Running"
  })
})
app.use(cookieParser()); // middleware
app.use(express.json());
app.use('/api/auth', authRouter)        //controller ne diya route ko route ne diya server ko
app.use('/api/admin/products', adminProductsRouter);
app.use('/api/admin/orders', adminOrdersRouter);
app.use('/api/shop/products', shopProductRouter)
app.use('/api/shop/cart', shopCartRouter)
app.use('/api/shop/address', shopAdressRouter)
app.use('/api/shop/order' , shopOrdersRouter)
app.use('/api/shop/search' , shopSearchRouter)
app.use('/api/shop/ai' , shopaskAiRouter)
app.listen(port, () => console.log(`Server is now running this port ${port}`));