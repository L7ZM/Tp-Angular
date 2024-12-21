const Abonne = require('../models/abonesModel');

exports.getAllAbonnes = async (req, res) => {
    const abonnes = await Abonne.findAll();
    res.json(abonnes);
};

exports.createAbonne = async (req, res) => {
    const abonne = await Abonne.create(req.body);
    res.json(abonne);
};

exports.getAbonneById = async (req, res) => {
    const abonne = await Abonne.findByPk(req.params.id);
    res.json(abonne);
};

exports.updateAbonne = async (req, res) => {
    const abonne = await Abonne.update(req.body, { where: { id: req.params.id } });
    res.json(abonne);
};

exports.deleteAbonne = async (req, res) => {
    await Abonne.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Abonné supprimé' });
};
