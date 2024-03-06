const PORT = process.env.PORT ?? 8000;
const express = require("express");
const db = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser"); // Importer bodyParser depuis le package body-parser
const app = express();

app.use(cors())
app.use(express.json())

// Utiliser bodyParser comme middleware
app.use(bodyParser.json());//A RETIRER
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));//A RETIRER

const authRoute = require("./route/authRoute");//A RETIRER

const corsOptions = {
  origin: "http://localhost:3000", // Autorise les requêtes provenant de ce domaine
  credentials: true, // Indiquez que les cookies et les en-têtes d'authentification peuvent être inclus
};
app.use(cors(corsOptions));//A RETIRER

app.use("/auth", authRoute);//A RETIRER

app.listen(PORT, () => console.log(`Le serveur a démarré sur le PORT ${PORT}`));