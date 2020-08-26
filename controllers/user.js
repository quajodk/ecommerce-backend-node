const User = require('../models/user');
const Token = require('../models/token');
const helper = require('../utils/_helpers');

// @desc Create User
// @route POST api/v1/auth
// @access Public
exports.createUser = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    // check for user
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exist..',
      });
    }

    const hashPassword = helper.hash(password);

    if (hashPassword) {
      const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        createdAt: Date.now(),
      });

      if (newUser) {
        const token = helper.token(Array.from(hashPassword).length);
        const loginToken = await Token.create({
          token,
          login: true,
          user: newUser._id,
        });

        const data = {...newUser._doc, token: loginToken.token};
        return res.status(201).json({
          success: true,
          data: data,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error',
        });
      }
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// desc Log user in
// @route POST api/v1/auth/login
// @access Public
exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    // check for user
    const user = await User.findOne({email});
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User does not exist',
      });
    }

    const isMatch = user.password === helper.hash(password);
    if (isMatch) {
      const token = helper.token(Array.from(user.password).length);
      const newToken = await Token.create({
        token,
        login: true,
        user: user._id,
      });

      if (newToken) {
        const data = {...user._doc, token: newToken.token};
        return res.status(200).json({
          success: true,
          data: data,
        });
      }
    } else {
      return res.status(403).json({
        success: false,
        error: 'Invalid password',
      });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);

      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error',
      });
    }
  }
};

// @desc Log user out
// @route GET api/v1/auth/me/:token
// @access Private
exports.logout = async (req, res, next) => {
  try {
    const token = req.params.token;
    //   check for token
    const tokenData = await Token.findOne({token});

    if (!tokenData) {
      return res.status(404).json({
        success: false,
        error: 'No token found',
      });
    }

    await Token.deleteOne({_id: tokenData._id});

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
