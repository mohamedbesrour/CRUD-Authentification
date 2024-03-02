const PORT = process.env.PORT ?? 8000;
const express = require("express");
const { v4: uuidv4 } =  require('uuid') // donne un identifiant unique
const db = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser"); // Importer bodyParser depuis le package body-parser

const app = express();
app.use(cors())//A RETIRER

// Utiliser bodyParser comme middleware
app.use(bodyParser.json());//A RETIRER
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));//A RETIRER

// Vos autres routes et configurations...
// const userModele = require("./modele/users");

const authRoute = require("./route/authRoute");//A RETIRER
// get all todos
// app.get("/todos", async (req, res) => {
//     try {
//       const todos = await pool.query("SELECT * FROM todos")
//       res.json(todos.rows)
//     } catch (err) {
//       console.log("erreur");
//       console.error(err.message);
//     }
//   })

const corsOptions = {
  origin: "http://localhost:3000", // Autorise les requêtes provenant de ce domaine
  credentials: true, // Indiquez que les cookies et les en-têtes d'authentification peuvent être inclus
};
app.use(cors(corsOptions));//A RETIRER

// Configuration
app.use(bodyParser.json());//A RETIRER
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));//A RETIRER

// db.sequelize
//   .sync({ force: false })
//   .then(async () => {
//     console.log("Base de données synchronisée.");
//   })
//   .catch((error) => {
//     console.error(
//       "Erreur lors de la synchronisation de la base de données:",
//       error
//     );
//   });

app.use("/auth", authRoute);//A RETIRER

app.listen(PORT, () => console.log(`Le serveur a démarré sur le PORT ${PORT}`));
