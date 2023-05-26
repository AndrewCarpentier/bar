const mongoose = require("mongoose");
const softSchema = require("../schemas/softSchema");
const Softs = mongoose.model("Soft", softSchema);
const express = require("express");
const router = express.Router();
router.post("/newSoft", (req, res) => {
  const soft = new Softs(req.body);
  soft
    .save()
    .then(() => {
      const message =
        "Enregistrement du nouveau soft dans la base de données réussi";
      res.json({ message, soft });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});
router.get("/getAllSofts", (req, res) => {
  Softs.find({}).then((softs) => {
    const message = "La liste des boissons a bien été récupérée.";
    res.json({ message, softs });
  });
});
router.get("/getOneSoft/:id", (req, res) => {
  const softId = req.params.id;
  Softs.findById(softId, (err, soft) => {
    if (!soft) {
      res.status(404).json("Aucun soft trouvé avec cet ID");
    } else {
      const message = "Le soft à été récupérée avec succès";
      res.json({ message, soft });
    }
  });
});

router.put("/majOneSoft/:id", (req, res) => {
  const softId = req.params.id;
  const updatedData = req.body;
  Softs.findById(softId, (err, soft) => {
    if (err) {
      res.status(500).json(err);
    } else if (!soft) {
      const message = "Aucun soft trouvée avec cet ID";
      res.status(404).json({ message });
    } else {
      Softs.findByIdAndUpdate(softId, updatedData, (err, soft) => {
        if (err) {
          res.status(500).json(err);
        } else {
          Softs.find({}).then((softs) => {
            const message = "La liste des softs a bien été récupérée.";
            res.json({ message, softs });
          });
        }
      });
    }
  });
});

router.delete("/deleteOneSoft/:id", (req, res) => {
  const softId = req.params.id;
  Softs.findById(softId, (err, soft) => {
    if (err) {
      res.status(500).json(err);
    } else if (!soft) {
      res.status(404).json("Aucun soft trouvé avec cet ID");
    } else {
      Softs.findByIdAndRemove(softId, (err, soft) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const message = "Le soft à été supprimé avec succès";
          res.json({ message, soft });
        }
      });
    }
  });
});

module.exports = router;
