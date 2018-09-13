const express = require('express');
const app = express();
const mongoose = require('mongoose');

const dbURI = 'mongodb://admin:admin1@ds155492.mlab.com:55492/zenpcteam';
// const dbURI = 'mongodb://zenpcteam:test@zenpcteam.ovh:27018/my_database';
mongoose.connect(dbURI, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({firstName:String, lastName:String});

app.get('/', function(req, res) {
    res.send('home page');
});

app.get('/users/addUser', function(req, res) {
    res.send('Use with POST.');
});

app.post('/users/addUser', function(req, res) {
    //change for new user in database
    const obj = {
        firstName: "new",
        lastName: "user"
    }
    const userToAdd = new User(obj);
    userToAdd.save().then(() => console.log(`new user: ${obj.firstName} ${obj.lastName} added`));
    res.send("User added!");
});

app.get('/users/listUser', function(req, res) {
    const User = mongoose.model('User', userSchema);
    const cursor = User.find({}).cursor();
    cursor.on('data', function(doc) {
        console.log(doc);
    });
    cursor.on('close', function() {
        mongoose.connection.close();
        console.log("connection closed");
    });
    res.send("User list should appear on log");
});

app.listen(3000, function () {
    console.log('listening on port 3000!')
});
