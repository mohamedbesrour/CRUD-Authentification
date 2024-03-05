const pool = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

const getUser = async (req, res) => {
  // console.log(req);
  const { userEmail } = req.params; //pour récupérer seulement l'email admin dans >App.js<
  // console.log(userEmail);
  try {
    const todos = await pool.query(
      'SELECT * FROM todos WHERE user_email = $1',
      [userEmail]
    );
    res.json(todos.rows);
  } catch (err) {
    // console.log("erreur");
    console.error(err);
  }
};

//créé un nouvel élémment de liste
const postTodos = async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  const id = uuidv4();
  try {
    const newToDo = await pool.query(
      `INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5);`,
      [id, user_email, title, progress, date]
    );
    res.json(newToDo);
  } catch (err) {
    console.error(err);
  }
};

//met a jour un élément de la liste avec son id
const putTodos = async (req, res) => {
  const { id } = req.params
  const { user_email, title, progress, date } = req.body
  try {
    const editToDo = await pool.query(
      'UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5;',
      [user_email, title, progress, date, id]
    )
    res.json(editToDo)
  } catch (err) {
    console.error(err);
  }
};

//supprime un élement de la liste
const deleteTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const suppToDo = await pool.query(`DELETE FROM todos WHERE id = $1;`, [id])
    res.json(suppToDo)
  } catch (err) {
    console.error(err)
  }
};

//signup > inscription
const postInscription = async (req, res) => {
  const { email, password } = req.body  // password au lieu de hashed_password
  const salt = bcrypt.genSaltSync(10)
  const HashedPassword = bcrypt.hashSync(password, salt)

  try {
    const signUp = await pool.query(`INSERT INTO users (email, password) VALUES($1, $2)`,
    [email, HashedPassword])

    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})

    res.status(200).json({signUp}) // token    
  }catch (err){
    console.error(err)
    if (err) {
      res.json({ detail: err.detail})
    }
  }
}

// login >  connexion
const postConnexion = async (req, res) => {
  const {email, password} = req.body
  try {
    const users = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (!users.rows.length) return res.json({ detail: 'Cette utilisateur existe pas'})

    const sucess = await bcrypt.compare(password, users.rows[0].password)
    const token = jwt.sign({ email }, 'secret', { expiresIn: '1hr'})

    if (sucess) {
      res.json({ 'email' : users.rows[0].email, token})
    } else {
      res.json({ detail: "Login failed"})
    }
  } catch (err){
    console.error(err)
  }
}

module.exports = { getUser, postTodos, putTodos, deleteTodos, postInscription, postConnexion };
