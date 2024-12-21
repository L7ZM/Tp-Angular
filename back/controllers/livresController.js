// const { where } = require('sequelize');
const Livre = require("../models/livresModel");
const Pret = require("../models/pretsModel");

exports.getAllLivres = async (req, res) => {
  const livres = await Livre.findAll();
  res.json(livres);
};

exports.createLivre = async (req, res) => {
  const livre = await Livre.create(req.body);
  res.json(livre);
};

exports.getLivreById = async (req, res) => {
  const livre = await Livre.findByPk(req.params.id);
  res.json(livre);
};

exports.updateLivre = async (req, res) => {
  await Livre.update(req.body, { where: { id: req.params.id } });
  const livr = await Livre.findOne({ where: { id: req.params.id } });
  res.json(livr);
};

exports.deleteLivre = async (req, res) => {
  await Livre.destroy({ where: { id: req.params.id } });
  res.json({ message: "Le livre est supprimé !" });
};

exports.getLivrePrets = async (req, res) => {
    try {
        const livreId = req.params.id;
        const livre = await Livre.findByPk(livreId, {
        include: [
            {
            model: Pret,
            attributes: ['date_pret', 'date_retour']
            }
        ]
        });

        if (!livre) {
            return res.status(404).json({ error: 'Livre non trouvé' });
        }

        res.json(livre);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
