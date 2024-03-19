const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

const mongoUrl =
  'mongodb+srv://ijlalssck1940:ijlalssck1940@cluster0.ya8mk2a.mongodb.net/StackTechAssingment';

const JWT_SECRET =
  'hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe';
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Database Connected');
  })
  .catch(e => {
    console.log(e);
  });

require('./UserDetails');
const User = mongoose.model('UserInfo');

app.get('/', (req, res) => {
  res.send({status: 'Started'});
});

app.post('/register', async (req, res) => {
  const {name, email, password, confirmPassword} = req.body;

  const oldUser = await User.findOne({email: email});

  if (oldUser) {
    return res.send({status: 'Error', message: 'Email already exists'});
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name: name,
      email: email,
      password: encryptedPassword,
      confirmPassword: confirmPassword,
    });
    res.send({status: 'OK', message: 'User Created Successfully'});
  } catch (error) {
    res.status(500).send({status: 'Error', message: 'Internal Server Error'});
  }
});

app.post('/loginuser', async (req, res) => {
  const {email, password} = req.body;
  const oldUser = await User.findOne({email});

  if (!oldUser) {
    return res.send({status: 'Error', message: "User doesn't exist"});
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({email: oldUser.email}, JWT_SECRET);
    return res.status(200).json({status: 'OK', data: token});
  } else {
    return res.send({status: 'Error', message: 'Invalid email or password'});
  }
});

app.post('/userdata', async (req, res) => {
  const {token} = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({email: useremail}).then(data => {
      return res.send({status: 'OK', data: data});
    });
  } catch (error) {
    return res.send({status: 'Error', message: error});
  }
});

app.listen(3000, () => {
  console.log('Server Started');
});
