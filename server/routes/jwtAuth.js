const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator')

// registering
router.post('/register', async (req, res) => {
  try {
    // 1. Destructor data from body
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

    // 5.Generate JWT pass
    const token = jwtGenerator(newUser.rows[0].user_id)

    res.json({token});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
