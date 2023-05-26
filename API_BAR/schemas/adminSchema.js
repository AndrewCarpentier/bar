const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: "Nom Invalide",
    },
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

adminSchema.statics.createAdmin = function (username, password, cb) {
  const admin = new this({
    username,
    password,
  });
  bcrypt.hash(admin.password, 10, (err, hash) => {
    if (err) {
      return cb(err);
    }
    admin.password = hash;
    admin.save((saveErr) => {
      if (saveErr) {
        return cb(saveErr);
      }
      cb(null, admin);
    });
  });
};

module.exports = mongoose.model("Admin", adminSchema);
