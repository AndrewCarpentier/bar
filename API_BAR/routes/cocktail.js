const mongoose = require("mongoose");
const cocktailSchema = require("../schemas/cocktailSchema");
const Cocktails = mongoose.model("Cocktail", cocktailSchema);
const express = require("express");
const router = express.Router();
router.post("/newCocktail", (req, res) => {
  const cocktail = new Cocktails(req.body);
  cocktail
    .save()
    .then(() => {
      const message =
        "Enregistrement du nouveau cocktail dans la base de données réussi";
      res.json({ message, cocktail });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});
router.get("/getAllCocktails", (req, res) => {
  Cocktails.find({}).then((cocktails) => {
    const message = "La liste des cocktails a bien été récupérée.";
    res.json({ message, cocktails });
  });
});
router.get("/getOneCocktail/:id", (req, res) => {
  const cocktailId = req.params.id;
  Cocktails.findById(cocktailId, (err, cocktail) => {
    if (!cocktail) {
      res.status(404).json("Aucun cocktail trouvé avec cet ID");
    } else {
      const message = "Le cocktail à été récupérée avec succès";
      res.json({ message, cocktail });
    }
  });
});

router.put("/majOneCocktail/:id", (req, res) => {
  const cocktailId = req.params.id;
  const updatedData = req.body;
  Cocktails.findById(cocktailId, (err, cocktail) => {
    if (err) {
      res.status(500).json(err);
    } else if (!cocktail) {
      const message = "Aucun cocktail trouvée avec cet ID";
      res.status(404).json({ message });
    } else {
      Cocktails.findByIdAndUpdate(cocktailId, updatedData, (err, cocktail) => {
        if (err) {
          res.status(500).json(err);
        } else {
          Cocktails.find({}).then((cocktails) => {
            const message = "La liste des cocktails a bien été récupérée.";
            res.json({ message, cocktails });
          });
        }
      });
    }
  });
});

router.delete("/deleteOneCocktail/:id", (req, res) => {
  const cocktailId = req.params.id;
  Cocktails.findById(cocktailId, (err, cocktail) => {
    if (err) {
      res.status(500).json(err);
    } else if (!cocktail) {
      res.status(404).json("Aucun cocktail trouvé avec cet ID");
    } else {
      Cocktails.findByIdAndRemove(cocktailId, (err, cocktail) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const message = "Le cocktail à été supprimé avec succès";
          res.json({ message, cocktail });
        }
      });
    }
  });
});

module.exports = router;
