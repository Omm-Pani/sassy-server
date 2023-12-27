// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const { generateToken } = require("./tokens");
const User = require("./UserModel");
const { validateLength } = require("./validation");

exports.register = async (req, res) => {
    try {
      const {
        full_name,
        email,
        mobile_number,
        password,
      } = req.body;
    
      const check = await User.findOne({ email });

      if (check) {
        return res.status(400).json({
          message:
            "This email address already exists,try with a different email address",
        });
      }

      if (!validateLength(full_name, 3, 30)) {
        return res.status(400).json({
          message: "first name must between 3 and 30 characters.",
        });
      }
      if (!validateLength(password, 6, 40)) {
        return res.status(400).json({
          message: "password must be atleast 6 characters.",
        });
      }

      const cryptedPassword = await bcrypt.hash(password, 12);


      const user = await new User({
        full_name,
        email,
        mobile_number,
        password: cryptedPassword,
      }).save();
  
    //   const emailVerificationToken = generateToken(
    //     { id: user._id.toString() },
    //     "1d"
    //   );
    //   const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    //   sendVerificationEmail(user.email, user.first_name, url);
  
      // const token = generateToken({ id: user._id.toString() }, "7d");
  
      res.send({
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        // token: token,
        verified: user.verified,
        message: "Register success! Please verify your email address",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "The email you entered is not connected to an account.",
        });
      }

      const checkPassword = await bcrypt.compare(password, user.password);


      if (!checkPassword) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      // const token = generateToken({ id: user._id.toString() }, "7d");
  
      res.send({
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        // token: token,
        verified: user.verified,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  