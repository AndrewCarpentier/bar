const router = require("express").Router();
const Etablishment = require("../../schemas/etablishmentSchema");

router.post("/create", async (req, res) => {
  const { name, idUser, email } = req.body;
  Etablishment.createEtablishment(
    name,
    idUser,
    email,
    (error, etablishment) => {
      if (error) {
        return res.status(500).json(error);
      } else {
        res.json(etablishment);
      }
    }
  );
});

router.get("/getAll/:id", async (req, res) => {
  const { id } = req.params;
  const etablishments = await Etablishment.find();
  const list = [];
  etablishments.map((etablishment) => {
    if (etablishment.userList.find((e) => e.userId === id)) {
      list.push(etablishment);
    }
  });
  
  res.json(list);
});

router.get("/getOneById/:id", async (req, res) => {
  const { id } = req.params;
  const etablishment = await Etablishment.findById(id);
  res.json(etablishment);
});

router.put("/updateEtablishment", async (req, res) => {
  const { etablishment } = req.body;
  await Etablishment.findByIdAndUpdate(etablishment._id, etablishment);
});

router.post("/addNewTeamMember", async (req, res) => {
  const { etablishment, email } = req.body;
  etablishment.userList.push({ email, role: "user" });
  await Etablishment.findByIdAndUpdate(etablishment._id, etablishment);
  res.json(etablishment);
});

router.post("/deleteUserById", async (req, res) => {
  const { etablishment, idxUserDelete } = req.body;
  etablishment.userList = etablishment.userList.filter(
    (user, idx) => idx !== idxUserDelete
  );
  await Etablishment.findByIdAndUpdate(etablishment._id, etablishment);
  res.json(etablishment);
});

router.post("/deleteProductById", async (req, res) => {
  const { etablishment, idProductDelete } = req.body;
  console.log(idProductDelete);
  etablishment.productList = etablishment.productList.filter(
    (p) => p._id != idProductDelete
  );
  console.log(etablishment.productList.length);
  await Etablishment.findByIdAndUpdate(etablishment._id, etablishment);
  res.json(etablishment);
});

module.exports = router;
