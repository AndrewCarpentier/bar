const schema = require("mongoose").Schema;

const foodSchema = schema({
  name: { type: String, required: true },
  img: String,
  dispo: { type: Boolean, default: true },
  visible: { type: Boolean, default: true },
  description: schema.Types.Mixed,
  allergene: String,
  categorie: String,
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => value > 0,
      message: "Le prix ne peut pas être inférieur ou égal à 0",
    },
  },
});
module.exports = foodSchema;
