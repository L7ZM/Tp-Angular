const express = require('express');
const router = express.Router();
const pretController = require('../controllers/pretsController');

router.get('/', pretController.getAllPrets);
router.post('/', pretController.createPret);
router.get('/pretsDetails', pretController.getPretsDetails);
router.get('/livrePrets', pretController.getLivrePrets);
router.get('/:id', pretController.getPretById);
router.put('/:id', pretController.updatePret);
router.delete('/:id', pretController.deletePret);


module.exports = router;

























// const prets = [
//     { id: 1, name: 'Pret 1' },
//     { id: 2, name: 'Pret 2' },
//     { id: 3, name: 'Pret 3' },
//     { id: 3, name: 'Pret 4' }
// ];
// router.get('/', (req, res) => {
//     res.send('Liste des prets');
// });


// router.get('/liste', (req, res) => {
//     let html = '<table>';
//     html += '<tr><th>ID</th><th>Pret</th></tr>';
//     for(const pret of prets) {
//         html += `<tr><td>${pret.id}</td><td>${pret.name}</td></tr>`;
//     }
//     html += '</table>';
//     res.send(html);
// });


// module.exports = router;