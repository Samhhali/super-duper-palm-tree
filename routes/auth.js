const express = require('express');
const { auth } = require('firebase-admin');
const router = express.Router();
const admin = require('firebase-admin')




router.post('/createuser', async (req, res)=>{
// create Authentication user 
 if (!req.body.email || !req.body.password) {
    res.json({ sucess: false, msg: 'Please pass email and password correctly' });
} else {
    try {
        let email = req.body.email
        let pass =req.body.password
        let userRecord = await admin
        .auth()
        .createUser({
          email: email,
          password: pass,
        });
    
        return res.json({userid: userRecord.uid})
    
    } catch (error) {
        return res.json({sucess: false, msg: error.message});
    }
}});



router.get('/listAllUsers/:id?', async (req, res)=>{
  // list users
    // List batch of users, 1000 at a time.
    const userID = req.params.id;

    if(userID){
        try {
            const user = await admin.auth().getUser(userID);
            return res.json(user);           
        } catch (error) {
            return res.json({sucess: false, msg: "User not found!"});
        }
        
    }
    let listUsersResult = await admin.auth().listUsers(10);
    
        listUsersResult.users.forEach((userRecord) => {
          console.log('user', userRecord.toJSON());
        });
        // if (listUsersResult.pageToken) {
        //   // List next batch of users.
        //   listAllUsers(listUsersResult.pageToken);
        // }
    //   }
    //   .catch((error) => {
    //     console.log('Error listing users:', error);
    //   });
      console.log('done!')
      return res.json(listUsersResult.users);
  // Start listing users from the beginning, 1000 at a time.
})

module.exports = router;

