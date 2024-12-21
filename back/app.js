const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use( bodyParser.urlencoded({ extended: true }));

// const initDb = require('./src/db/initDb');
const auth = require('./src/auth/auth');

// Importation des routes
const livresRoutes = require("./routes/livres");
const abonesRoutes = require("./routes/abones");
const pretsRoutes = require("./routes/prets");
const loginRoutes = require("./routes/security/loginRoutes");

// Utilisation des routes
app.use("/livres", livresRoutes);
app.use("/abones", abonesRoutes);
app.use("/prets", pretsRoutes);
// app.use('users', auth, require("./routes/userRoutes"));
app.use('/auth', loginRoutes);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

const Livre = require("./models/livresModel");
const Abonne = require("./models/abonesModel");
const Pret = require("./models/pretsModel");
const AuthUser = require('./models/usersModel');
const sequelize = require("./config/database");


sequelize.sync().then(() => {
    console.log("Database & tables created!");
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});

