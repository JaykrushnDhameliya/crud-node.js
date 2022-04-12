const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const app = express();
const port = 5000;
const URL = "mongodb+srv://Project_0:Project_0@cluster0.vahyq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";



mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
});


app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send("hello from homepage")
});
app.all('*', (req, res) => {
    res.send("that route doesn't exist")
});


app.listen(port, () => {
    console.log(`port running is http://localhost:${port}`)
});

