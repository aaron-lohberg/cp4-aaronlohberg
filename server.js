const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/life', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
/*const upload = multer({
  dest: './public/images/',
  limits: {
    fileSize: 10000000
  }
});
*/
// Create a scheme for items in the museum: a title and a path to an image.
const personSchema = new mongoose.Schema({
  name: String,
  level: Number,
  happiness: Number,
});

// Create a model for items in the museum.
const Person = mongoose.model('Person', personSchema);

app.listen(3000, () => console.log('Server listening on port 3000!'));

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/people', async (req, res) => {
  const person = new Person({
    name: req.body.name,
    level: req.body.level,
    happiness: req.body.happiness,
  });
  try {
    await person.save();
    res.send(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/people', async (req, res) => {
  try {
    let persons = await Person.find();
    res.send(persons);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Delete an item from the museum;
app.delete('/api/person/:_id', async (req, res) => {
  try {
    await Person.deleteOne(req.params);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get an item to edit from the museum.
app.put('/api/person/:_id', async (req, res) => {
  try {
    let persons = await Person.findOne(req.params);
    console.log(persons);
    persons.level = (req.body.level + 5);
    persons.save();
    res.send(persons);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get an item to edit from the museum.
app.put('/api/person/married/:_id', async (req, res) => {
  try {
    let persons = await Person.findOne(req.params);
    console.log(persons);
    persons.level = (req.body.level + 5);
    persons.happiness = (req.body.happiness + 5);
    persons.save();
    res.send(persons);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get an item to edit from the museum.
app.put('/api/person/baptism/:_id', async (req, res) => {
  try {
    let persons = await Person.findOne(req.params);
    console.log(persons);
    persons.level = (req.body.level + 10);
    persons.happiness = (req.body.happiness + 10);
    persons.save();
    res.send(persons);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get an item to edit from the museum.
app.put('/api/person/kids/:_id', async (req, res) => {
  try {
    let persons = await Person.findOne(req.params);
    console.log(persons);
    persons.level = (req.body.level + 5);
    persons.happiness = (req.body.happiness + 20);
    persons.save();
    res.send(persons);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// Get an item to edit from the museum.
app.put('/api/person/motorcycle/:_id', async (req, res) => {
  try {
    let persons = await Person.findOne(req.params);
    console.log(persons);
    persons.level = (req.body.level + 999);
    persons.happiness = (req.body.happiness + 999);
    persons.save();
    res.send(persons);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
