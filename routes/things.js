const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

const db = admin.firestore();
const thingsRef = db.collection('things');

// read all docs inside things collection

router.get('/', async (req,res)=>{
    const snapshot =  await thingsRef.get();
    snapshot.forEach(doc => {
  console.log(doc.id, '=>', doc.data());
});
    
})
module.exports = router;
