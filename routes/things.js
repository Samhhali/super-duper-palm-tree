const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

const db = admin.firestore();
const thingsRef = db.collection('things');

// read all docs inside things collection

router.get('/', async (req, res) => {
  let snapshot = await thingsRef.get();
  snapshot.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });
  snapshot = await thingsRef.where("name", "==", "apple")
    .where("number", ">", 3)
    .orderBy("number").get();
  snapshot.forEach(doc => {
    let data = doc.data();
    console.log(data.name ,doc.get('number'));
  });
  return res.json({});

});
module.exports = router;
