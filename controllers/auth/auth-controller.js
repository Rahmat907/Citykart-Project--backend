const bcrypt = require("bcryptjs");  // it helps to hash your password
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

// ragiter
const registerUser = async (req, res) => {                  
const { username, email, password } = req.body  // get user details from frontend 
// console.log("username :",username );

try {
    const checkUser = await User.findOne({ email });   // validation - not empty
    if (checkUser)                          // check if User already exits or not 
      return res.json({                     // create user Object- create entry in db
        success: false,                     // remove password and refresh token field from response        
        message: "Email Already exists",    // check for user creation  
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// login

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // console.log('email : ',email);
  // console.log('password : ',password);
  
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exits ! Please register first",
      });
    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrct password! please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
        
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        username: checkUser.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

// logout

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

// auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  try {
    const decode = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser,authMiddleware };
