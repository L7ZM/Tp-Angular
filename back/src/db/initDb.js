const sequelize = require('../../config/database');
const AuthUser = require('../../models/usersModel');
const bcrypt = require('bcryptjs');

const initDb = async () => {
    try {
      await sequelize.sync(); // Réinitialise la base de données
      console.log('Database synchronized');

      // Hacher le mot de passe avant de créer l'utilisateur
      const hashedPassword = await bcrypt.hash('testpassword', 10);

      // Ajouter un utilisateur pour les tests
      const user = await AuthUser.create({
        username: 'testuser',
        password: hashedPassword
      });
      console.log('Test user created:', user.toJSON());
    } 
    catch (error) {
      console.error('Error initializing database:', error);
    } 
    finally {
      await sequelize.close();
    }
};

initDb();
