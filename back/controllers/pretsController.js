const Pret = require('../models/pretsModel');
const Livre = require('../models/livresModel');
const Abonne = require('../models/abonesModel');

const { Op } = require('sequelize');

exports.getAllPrets = async (req, res) => {
    const prets = await Pret.findAll();
    res.json(prets);
};

exports.createPret = async (req, res) => {
    const pret = await Pret.create(req.body);
    res.json(pret);
};

exports.getPretById = async (req, res) => {
    const pret = await Pret.findByPk(req.params.id);
    res.json(pret);
};

exports.updatePret = async (req, res) => {
    const pret = await Pret.update(req.body, { where: { id: req.params.id } });
    res.json(pret);
};

exports.deletePret = async (req, res) => {
    await Pret.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Prêt supprimé' });
};


exports.getPretsDetails = async (req, res) => {
    try {
        const prets = await Pret.findAll({
            attributes: ['date_pret', 'date_retour'],
            include: [
            {
                model: Livre,
                attributes: ['titre', 'auteur']
            },
            {
                model: Abonne,
                attributes: ['nom', 'prenom', 'adresse']
            }
            ]
        });
        res.json(prets);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLivrePrets = async (req, res) => {
    try {
        const prets = await Pret.findAll({
            attributes: ['date_pret', 'date_retour'],
            include: [
            {
                model: Livre,
                attributes: ['titre', 'auteur']
            }
            ]
        });
        res.json(prets);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

