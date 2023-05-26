const mongoose = require("mongoose");
const foodSchema = require("../schemas/foodSchema");
const Foods = mongoose.model("Food", foodSchema);
const express = require("express");
const router = express.Router();
router.post("/newFood", (req, res) => {
  const food = new Foods(req.body);
  food
    .save()
    .then(() => {
      const message =
        "Enregistrement de la nouvelle nourriture dans la base de données réussi";
      res.json({ message, food });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});
router.get("/getAllFoods", (req, res) => {
  Foods.find({}).then((foods) => {
    const message = "La liste des nourritures a bien été récupérée.";
    res.json({ message, foods });
  });
});
router.get("/getOneFood/:id", (req, res) => {
  const foodId = req.params.id;
  Foods.findById(foodId, (err, food) => {
    if (!food) {
      res.status(404).json("Aucun food trouvé avec cet ID");
    } else {
      const message = "Le food à été récupérée avec succès";
      res.json({ message, food });
    }
  });
});

router.put("/majOneFood/:id", (req, res) => {
  const foodId = req.params.id;
  const updatedData = req.body;
  Foods.findById(foodId, (err, food) => {
    if (err) {
      res.status(500).json(err);
    } else if (!food) {
      const message = "Aucun food trouvée avec cet ID";
      res.status(404).json({ message });
    } else {
      Foods.findByIdAndUpdate(foodId, updatedData, (err, food) => {
        if (err) {
          res.status(500).json(err);
        } else {
          Foods.find({}).then((foods) => {
            const message = "La liste des foods a bien été récupérée.";
            res.json({ message, foods });
          });
        }
      });
    }
  });
});

router.delete("/deleteOneFood/:id", (req, res) => {
  const foodId = req.params.id;
  Foods.findById(foodId, (err, food) => {
    if (err) {
      res.status(500).json(err);
    } else if (!food) {
      res.status(404).json("Aucun food trouvé avec cet ID");
    } else {
      Foods.findByIdAndRemove(foodId, (err, food) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const message = "Le food à été supprimé avec succès";
          res.json({ message, food });
        }
      });
    }
  });
});

module.exports = router;
