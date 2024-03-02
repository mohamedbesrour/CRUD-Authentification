const PORT = process.env.PORT ?? 8000;
const express = require("express");
const db = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser"); // Importer bodyParser depuis le package body-parser

const app = express();

// Utiliser bodyParser comme middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Vos autres routes et configurations...
// const userModele = require("./modele/users");

const authRoute = require("./route/authRoute");
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
app.use(cors(corsOptions));

// Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

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

app.use("/auth", authRoute);

app.listen(PORT, () => console.log(`Le serveur a démarré sur le PORT ${PORT}`));
