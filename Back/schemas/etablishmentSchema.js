const mongoose = require("mongoose");

const etablishmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  userList: [
    {
      userId: String,
      role: String,
      email: String,
    },
  ],
  productList: [
    {
      name: String,
      img: String,
      description: String,
      price: Number,
      sizes: [
        {
          sizes: String,
          price: Number,
        },
      ],
    },
  ],
  commandList: [],
});

etablishmentSchema.statics.createEtablishment = function (
  name,
  userId,
  email,
  cb
) {
  const etablishment = new this({
    name,
    userList: [
      {
        email,
        userId,
        role: "admin",
      },
    ],
  });
  etablishment.save((saveErr) => {
    if (saveErr) {
      return cb(saveErr);
    }
    cb(null, etablishment);
  });
};

module.exports = mongoose.model("Etablishment", etablishmentSchema);
