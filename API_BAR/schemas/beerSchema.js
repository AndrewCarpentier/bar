const schema = require("mongoose").Schema;

const beerSchema = schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9\s]+$/.test(value),
      message: "Nom Invalide",
    },
  },
  img: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.match(/\.(jpg|png)$/),
      message: "Image Invalide",
    },
  },
  degre: { type: Number, default: 0 },
  dispo: {
    type: Boolean,
    default: true,
  },
  visible: { type: Boolean, default: true },
  description: schema.Types.Mixed,
  allergene: String,
  sizes: [
    {
      _id: false,
      size: {
        type: String,
        required: true,
        validate: {
          validator: (value) => ["25cl", "33cl", "50cl", "1L"].includes(value),
          message:
            "taille invalide, les tailles valides sont :25cl, 33cl, 50cl, 1L ",
        },
      },
      price: {
        type: Number,
        required: true,
        validate: {
          validator: (value) => value > 0,
          message: "Le prix ne peut pas être inférieur ou égal à 0",
        },
      },
      available: { type: Boolean, default: true },
    },
  ],
});

module.exports = beerSchema;
