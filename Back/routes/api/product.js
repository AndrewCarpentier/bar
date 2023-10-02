const router = require("express").Router();
const Etablishment = require("../../schemas/etablishmentSchema");

router.post("/create", async (req, res) => {
  const { product, idEtablishment } = req.body;
  const etablishment = await Etablishment.findById(idEtablishment);
  etablishment.productList.push(product);
  await Etablishment.findByIdAndUpdate(idEtablishment, etablishment);
  res.json(etablishment);
});

router.put("/update", async (req, res) => {
  const { product, idEtablishment, oldProduct } = req.body;
  const etablishment = await Etablishment.findById(idEtablishment);
  const list = [];
  etablishment.productList.map((p) => {
    if (p._id.toString() === oldProduct._id) {
      list.push({ ...product, _id: oldProduct._id });
    } else {
      list.push(p);
    }
  });
  etablishment.productList = list;
  await Etablishment.findByIdAndUpdate(idEtablishment, etablishment);
  res.json(etablishment);
});

module.exports = router;
