const mongoose = require("mongoose");


const userSchema = mongoose.Schema(
{
    full_name: {
        type: String,
        required:true,
        trim: true,
        text: true,
    }, 
    email:{
        type: String,
        required: [true, "email is required"],
        trim: true,
    },
    mobile_number: {
      type: String,
      minLength: [10, "no should have minimum 10 digits"],
      maxLength: [10, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
      },

      verified:{
        type: Boolean,
        default: false,
      }
}

);
module.exports = mongoose.model("User", userSchema);