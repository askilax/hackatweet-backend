var express = require('express');
var router = express.Router();
const argon2 = require('argon2');
const uid2 = require('uid2');
//import du model

router.post('/signup', async (req, res) => {
  // recup les infos envoyer
  let { username, password } = req.body
  // vérifie si les champs sont remplis
  if (!username || !password) {
    return res.json({ result: false, Error: 'Missing or empty fields.' })
  }
  // en minuscule
  username = username.toLowerCase();
  try {
    // vérifie si il existe deja en DB
    const existUser = await User.findOne({ username });
    if (existUser) {
      return res.json({ result: false, Error: 'User already registered.' })
    }
// hash le password avec argon2id (meilleurs que bcrypt)
    const hashedPass = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 131072,
      parallelism: 2,
    });
    // token et enregistrement de l'utilisateur 
    const token = uid2(32)
    const newUser = new User({
      username, password: hashedPass, token,
    })
    await newUser.save();
    res.json({ result: true, Message: `${username} registered successfully.`, token })
  } catch (error) {
    res.status(500).json({ result: false, message: 'Server error', error });
  }
})


router.post('/signin', async (req, res) => {
    // recup les infos envoyer
  let { username, password } = req.body;
    // vérifie si les champs sont remplis
  if (!username || !password) {
    return res.json({ result: false, error: 'Missing or empty fields.' })
  };
   // en minuscule
  username = username.toLowerCase()
  try {
        // vérifie si il existe deja en DB
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return res.json({ result: false, error: 'User not found' })
    }
// compare les deux mots de passe le permier est celui de la DB et le deuxieme celui reçu
    const isMatch = await argon2.verify(existUser.password, password);
    if (!isMatch) {
      return res.json({ result: false, error: 'Incorrect password.' })
    }
    res.json({ result: true, message: `${username} Signin successful`, token: existUser.token })
  } catch (error) {
    res.status(500).json({ result: false, error: 'server error', error })
  }
})



module.exports = router;
