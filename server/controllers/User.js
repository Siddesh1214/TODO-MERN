const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    //fetch data
    const { name, email, password } = req.body;

    //validate
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter all fields'
      });
    }
    
    //check unique user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:'User already Exists',
      })
    }

    //hash the passowrd and create a new user object with it
    let hashPassword
    try {
      hashPassword = await bcrypt.hash(password, 10);
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:'Error in hashing password',
      })
    }
     
    //save entry
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(200).json({
      success: true,
      message: 'user has been created successfully'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:"User can not be registered, please try again later"
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate input data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter values',
      })
    }

    //find user by email address
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found"
      });
    }

    const payload = {
      id: user._id,
      email: user.email
    };
    //compare saved password and password with compare function
    if (bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:'3h',
      })
      
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }

      user.password = undefined;
      user.coktok = token;
      res.cookie('token', token, options).status(200).json({
        success: true,
        token,
        user,
        message: 'USer logged in successfully'
      });
    
  }
  else {
    return res.status(403).json({
      success: false,
      message: 'Incorrect password'
    });
  }



  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Login failure',
    })
  }
}

exports.getMyProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    user:req.user,
  });
}


exports.logout = async (req, res) => {
  res.status(200).cookie('token', "", { expiresIn: new Date(Date.now()) }).json({
    success: true,
    message: 'User logged out'
  });
}