const mongoose = require("mongoose");
const beerSchema = require("../schemas/beerSchema");
const Beers = mongoose.model("Beers", beerSchema);
const express = require("express");
const router = express.Router();
router.post("/newBeer", (req, res) => {
  const beer = new Beers(req.body);
  beer
    .save()
    .then(() => {
      const message =
        "Enregistrement de la nouvelle bière dans la base de données réussi";
      res.json({ message, beer });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});
router.get("/getAllBeers", (req, res) => {
  Beers.find({}).then((beers) => {
    const message = "La liste des boissons a bien été récupérée.";
    res.json({ message, beers });
  });
});
router.get("/getOneBeer/:id", (req, res) => {
  const beerId = req.params.id;
  Beers.findById(beerId, (err, beer) => {
    if (!beer) {
      res.status(404).json("Aucune bière trouvée avec cet ID");
    } else {
      const message = "La bière à été récupérée avec succès";
      res.json({ message, beer });
    }
  });
});

router.put("/majOneBeer/:id", (req, res) => {
  const beerId = req.params.id;
  const updatedData = req.body;
  Beers.findById(beerId, (err, beer) => {
    if (err) {
      res.status(500).json(err);
    } else if (!beer) {
      const message = "Aucune bière trouvée avec cet ID";
      res.status(404).json({ message });
    } else {
      Beers.findByIdAndUpdate(beerId, updatedData, (err, beer) => {
        if (err) {
          res.status(500).json(err);
        } else {
          Beers.find({}).then((beers) => {
            const message = "La liste des boissons a bien été récupérée.";
            res.json({ message, beers });
          });
        }
      });
    }
  });
});

router.delete("/deleteOneBeer/:id", (req, res) => {
  const beerId = req.params.id;
  Beers.findById(beerId, (err, beer) => {
    if (err) {
      res.status(500).json(err);
    } else if (!beer) {
      res.status(404).json("Aucune bière trouvée avec cet ID");
    } else {
      Beers.findByIdAndRemove(beerId, (err, beer) => {
        if (err) {
          res.status(500).json(err);
        } else {
          const message = "La bière à été supprimée avec succès";
          res.json({ message, beer });
        }
      });
    }
  });
});

module.exports = router;
