const admin = require('firebase-admin')
const express = require('express');
const http = require('http');
const path = require("path");

const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

port = 3000;
const app = express();
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`listening on port ${port}...`);
  });

app.use(express.json());
//testing
app.get("/", (req, res) => {
    res.send(" API is running");
  });


//routes
const authRouter = require('./routes/auth');
const thingsRouter = require('./routes/things');

app.use('/api/auth', authRouter);
app.use('/api/things', thingsRouter);

// //create user
// function createUser(){
//     admin.auth().createUser({
//         email: String,
//         Password: String,
//     }).then(user => res.send(user))
//     .catch(err => res.status(422).send({ error: err }));
// }




