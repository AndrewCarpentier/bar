const router = require("express").Router();
const apiAuth = require("./auth");
const apiEtablishment = require("./etablishment");
const apiProduct = require("./product");
const apiPayment = require("./payment");

router.use("/auth", apiAuth);
router.use("/etablishment", apiEtablishment);
router.use("/product", apiProduct);
router.use("/payment", apiPayment);
module.exports = router;
