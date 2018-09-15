const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbURI = 'mongodb://admin:admin1@ds155492.mlab.com:55492/zenpcteam';
// const dbURI = 'mongodb://zenpcteam:test@zenpcteam.ovh:27018/my_database';

const userSchema = new mongoose.Schema({firstName:String, lastName:String});
const User = mongoose.model('User', userSchema);
mongoose.connect(dbURI, { useNewUrlParser: true });

app.get('/', (req, res) => res.send('home page'));

app.get('/users/addUser', (req, res) => res.send('Use with POST'));

app.post('/users/addUser', (req, res) => {
    //change for new user in database
    const obj = { firstName: "or", lastName: "curl" };
    const userToAdd = new User(obj);
    userToAdd.save().then(() => console.log(`new user: ${obj.firstName} ${obj.lastName} added`));
    res.send("User added!");
});

app.get('/users/listUser', (req, res) => {
    const cursor = User.find({}).cursor();
    cursor.on('data', (response) => console.log(response));
    cursor.on('close', () => console.log("request fulfilled"));
    // mongoose.connection.close();
    res.send("User list should appear on log");
});

app.listen(3000, () => console.log('listening on port 3000!'));
