const AuthUser = require('../models/usersModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const privatekey = require('../src/auth/private_key');

const loginController = {
    login: async (req, res) => {
        console.log('est entre..');
        console.log(req.body);
        AuthUser.findOne({ where: { username: req.body.username } }).then(user => {
            console.log('Testing user..')
            if (!user) {
                console.log('Testing user..')
                const message = `L'utilisateur n'existe pas.`;
                return res.status(404).json({ message })
            }
            bcryptjs.compare(req.body.password, user.password).then(isPasswordValid => {
                if (!isPasswordValid) {
                    const message = `Le mot de passe est invalide.`;
                    return res.status(404).json({ message })
                }
                // JWT
                const token = jwt.sign(
                    { userId: user.id },
                    privatekey,
                    { expiresIn: '24h' }
                )
                const message = `L'utilisateur a été connecté avec succès.`;
                return res.json({ message, data: user, token })
            })
        })
        .catch(error => {
            const message = `Vous n'avez pas été connecté. Réessayez dans quelqueq instants.`;
            return res.status(404).json({ message, data: error })
        })
    }
}

module.exports = loginController;

// exports.login = async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         // Vérifier si l'utilisateur existe
//         const user = await AuthUser.findOne({ where: { username } });
//         if (!user) {
//         return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
//         }

//         // Vérifier le mot de passe
//         const isPasswordValid = await bcryptjs.compare(password, user.password);
//         if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
//         }

//         // Générer un token JWT
//         const token = jwt.sign({ id: user.id, username: user.username }, 'secret_key', { expiresIn: '1h' });

//         res.json({ message: 'Connexion réussie', token });
//     } 
//     catch (error) {
//         res.status(500).json({ message: 'Erreur serveur', error: error.message });
//     }
// };
