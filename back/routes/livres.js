const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livresController');

// Afficher tous les livres
router.get('/', livreController.getAllLivres);
// Créer un livre
router.post('/', livreController.createLivre);
// Chercher un livre par son {id}
router.get('/:id', livreController.getLivreById);
// Modifier un livre
router.put('/:id', livreController.updateLivre);
// Supprimer un livre
router.delete('/:id', livreController.deleteLivre);
// Afficher les prets d'un livre
router.get('/:id/prets', livreController.getLivrePrets);

module.exports = router;












// Middleware pour analyser les corps JSON
// router.use(express.json());


// const livres = [
//     { id: 1, name: 'Livre 1' },
//     { id: 2, name: 'Livre 2' },
//     { id: 3, name: 'Livre 3' },
//     { id: 4, name: 'Livre 4' }
// ];

// router.get('/', (req, res) => {
//     res.send('Liste des livres ');
// });

// router.post('/', function (req, res){
//     const livr = req.body;
//     res.status(201).json({message: 'Livre ajouté', livr});
// });

  
// // Endpoint to get total number of livres
// router.get('/nblivres', (req, res) => {
//     const totalLivres = livres.length;
//     res.send(`Nombre total de livres : ${totalLivres}`);
// });

// router.get('/liste', (req, res) => {
//     res.json(livres);
// });


// router.get('/search/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const livre = livres.find(livre => livre.id === id);
//     res.status(200).json(livre);
// });
