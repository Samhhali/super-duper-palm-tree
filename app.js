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
const citiesRouter = require('./routes/cities');

app.use('/api/auth', authRouter);
app.use('/api/things', thingsRouter);
app.use('/api/cities', citiesRouter);



