const schema = require("mongoose").Schema;
const Beer = require("../schemas/beerSchema");

const commandSchema = schema({
  beers: [
    { beer: { type: Beer }, count: { type: Number }, price: { type: Number } },
  ],
  validate : {type : Boolean, default : false}
});

module.exports = commandSchema;
