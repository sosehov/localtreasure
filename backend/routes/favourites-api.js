const express = require('express');
const router  = express.Router();
const favouriteQueries = require('../db/queries/favourites');

router.get('/', (req, res) => {
  favouriteQueries.getFavourites(req.query.userId)
    .then(items => {
      res.json( { items });
    })
    .catch(err => {
      console.log('error getting favourites:', err);
    });
}); 

router.post('/', (req, res) => {
  favouriteQueries.addFavourite(req.body.item)
    .then(() =>
      res.status()
    )
    .catch(err => {
      console.log('error writing favourite:', err);
    });
}); 

module.exports = router;