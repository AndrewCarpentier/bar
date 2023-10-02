const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (error, isMatch) => {
    if (error) {
      return cb(error);
    }
    cb(null, isMatch);
  });
};

userSchema.statics.createUser = function (email, password, cb) {
  const user = new this({
    username: email,
    email,
    password,
  });
  bcrypt.hash(user.password, 10, (error, hash) => {
    if (error) {
      return cb(error);
    }
    user.password = hash;
    console.log(user);
    user.save((saveError) => {
      if (saveError) {
        console.log(saveError)
        return cb(saveError);
      }
      cb(null, user);
    });
  });
};

module.exports = mongoose.model("User", userSchema);
