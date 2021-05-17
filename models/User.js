const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// userSchema
const userSchema = new Schema({
  firstName:{
    type: String,
    required : true,
    required: "First name is Required"
  },
  lastName:{type:String, 
    required:true,
    required: "Last name is Required"
  },
  email:{
    type:String,
    required:true,
    match:[/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  password:{
    type:String,
    required: true,
  },
 // DOB: {type:Date, required:true},
   DarkTheme: {type :Boolean, default: false},
  journals:[{ type:Schema.Types.ObjectId, ref :"Journal"}],
  quotes :[{type:Schema.Types.ObjectId, ref: "Quote"}],
  articles:[{type:Schema.Types.ObjectId, ref:"Article"}]
});
const User = mongoose.model("User", userSchema);
module.exports = User;




