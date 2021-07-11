const express = require('express');
const router = express.Router();
const blog = require('../realtime/blog')
const admin = require('firebase-admin')
const db = admin.database();
const ref = db.ref("Blog");
const usersRef = ref.child('users');
const postsRef = ref.child('posts');


router.get('/list', async (req, res)=>{
     ref.on('child_added', (snapshot, prevChildKey) => {
        const newPost = snapshot.val();
        console.log('Author: ' + newPost.author);
        console.log('Title: ' + newPost.title);
        console.log('Previous Post ID: ' + prevChildKey);
      });
    res.send(req.t('blog_get_sucess'));
    //res.send('sucess');
})


module.exports = router;
