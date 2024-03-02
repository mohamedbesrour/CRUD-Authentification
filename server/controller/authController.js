const { pool } = require("../config/database");
// const Users = require("../modele/users");

// const register = async (req, res) => {
//   try {
//     const { name, email, password, phoneNumber } = req.body;
//     // Créer un nouvel utilisateur en utilisant le modèle Users
//     const newUser = await Users.create({ name, email, password, phoneNumber });
//     res.status(200).json(newUser);
//   } catch (error) {
//     res
//       .status(401)
//       .json({ message: "Problème lors de la création de l'utilisateur" });
//   }
// };

const getUser = async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos");
    //   pool.query("SELECT * FROM user")
    res.json(todos.rows[0]);
  } catch (err) {
    console.log("erreur");
    console.error(err.message);
  }
};

module.exports = { getUser };
// module.exports = { register, getUser };
