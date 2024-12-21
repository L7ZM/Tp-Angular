const express = require('express');
const router = express.Router();
const abonneController = require('../controllers/abonesController');

router.get('/', abonneController.getAllAbonnes);
router.post('/', abonneController.createAbonne);
router.get('/:id', abonneController.getAbonneById);
router.put('/:id', abonneController.updateAbonne);
router.delete('/:id', abonneController.deleteAbonne);

module.exports = router;
















// const abonnes = require('../abonesListe.json');

// router.get('/', (req, res) => {
//     res.status(200).json(abonnes);
// });

// router.get('/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const abone = abonnes.find(abone => abone.id === id);
//     res.status(200).json(abone);
// });

// module.exports = router;