const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async (req, res, next) => {
	try {
		const { token } = req.cookies || req.header("Authorization").replace("Bearer ", "");
		// const token=req.header("Authorization").replace("Bearer ","");
		// console.log("header ",token);

		if (!token) {
			return res.status(404).json({
				success: false,
				message: "Login first",
			});
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// console.log("decoded", decoded);

    req.user = await User.findById(decoded.id);
    req.user.password = undefined;
    next();


  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something wrong happned",
    });
  }
};
