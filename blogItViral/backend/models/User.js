const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,

    //the email should be a valid email with correct syntax
    //we wil use a validator to check typed email is correct or not
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter an password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

//fire a function before a doc saved to db
//hashing the password using bcrypt
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//creating a static model 'login' to login a user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});
    if(user){
      const auth = await bcrypt.compare(password, user.password);
      if(auth){
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


const User = mongoose.model("user", userSchema);

module.exports = User;
