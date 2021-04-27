const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo')
const authorization = require('../middleware/authorization')

// REGISTER route
router.post('/register', validInfo, async (req, res) => {
  try {
    // 1. Deconstruct data from body
    const { name, email, password } = req.body;

    // 2. Check if user already exists
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).send('User already exists');
    }
    // 3. Create an encrypted password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bycryptPassword = await bcrypt.hash(password, salt);

    // 4.Add user to db
    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bycryptPassword]
    );

    // 5.Generate JWT pass with user id
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });

    // Error Handling
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// LOGIN route
router.get('/login', validInfo, async (req, res) => {
  try {
    // 1. Destruct data from body
    const { email, password } = req.body;

    // 2. Check if user already exists
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // 3. check if incoming password is the same as database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    ); // return boolean

    if (!validPassword) {
      return res.status(401).json('Password or Email is incorrect');
    }

    // 4. Generate JWT pass with user id
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.sendFile({ token });

    // Error Handling
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
