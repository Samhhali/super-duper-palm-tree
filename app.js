const admin = require('firebase-admin')
const express = require('express');
const http = require('http');
const path = require('path')
const {I18n} = require('i18n');
//const i18next = require('i18next');
//const Backend = require('i18next-fs-backend');
//const middleware = require('i18next-http-middleware');

const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zamah-1301-default-rtdb.europe-west1.firebaseio.com",
  //databaseURL: 'zamah-1301-default-rtdb.europe-west1.firebasedatabase.app',

})
const app = express();

// i18next
//   .use(Backend)
//   .use(middleware.LanguageDetector)
//   .init({
//    fallbackLng: 'en',
//    backend: {
//      loadPath: './locales/{{lng}}/translation.json'
//    }
//   })


app.use(express.json());

//app.use(middleware.handle(i18next)); //<===
const i18n = new I18n({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, '/locales'),
})
app.use(i18n.init)

port = 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

//testing
app.get("/", (req, res) => {
  res.send(" API is running");
});


//routes
const authRouter = require('./routes/auth');
const thingsRouter = require('./routes/things');
const citiesRouter = require('./routes/cities');
const blogRouter = require('./routes/blog');


app.use('/api/auth', authRouter);
app.use('/api/things', thingsRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/blog', blogRouter);



