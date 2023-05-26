const express = require("express");
const router = express.Router();
const Admin = require("../schemas/adminSchema");

router.post("/newAdmin", (req, res) => {
  const { username, password } = req.body;
  Admin.createAdmin(username, password, (err, admin) => {
    if (err) {
      return res.status(500).json(err);
    }
    const message = "Admin créer avec succès";
    res.json({ message, admin });
  });
});

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  Admin.findOne({ username }, (err, admin) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (!admin) {
      return res.status(404).json({ message: "Utilisateur inexistant" });
    }
    admin.comparePassword(password, (passwordErr, isMatch) => {
      if (passwordErr) {
        return res.status(500).json(passwordErr);
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
      res.json({ message: "Connexion réussie" });
    });
  });
});

module.exports = router;
