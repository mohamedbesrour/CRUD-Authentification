const { pool } = require("../config/database");
require("../route/authRoute");
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
  console.log(req);
  const { userEmail } = req.params; //pour récupérer seulement l'email admin dans >App.js<
  console.log(userEmail);
  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    //   pool.query("SELECT * FROM user")
    res.json(todos.rows);
  } catch (err) {
    console.log("erreur");
    console.error(err.message);
  }
};

//créé un nouvel élémment de liste
const postTodos = async (req, res) => {
  const {user_email, title, progress, date} = req.body
  const id = uuidv4()
  try {
    pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)`,
    [id, user_email, title, progress, date])
  } catch (err) {
    console.error(err)
  }
}

module.exports = { getUser, postTodos };
// module.exports = { register, getUser };
