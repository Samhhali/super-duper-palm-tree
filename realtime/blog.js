const admin = require('firebase-admin');
// const serviceAccount = require('../serviceAccountKey.json')
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     //databaseURL: "https://zamah-1301-default-rtdb.europe-west1.firebaseio.com",
//     databaseURL: 'https://zamah-1301-default-rtdb.europe-west1.firebasedatabase.app',

// })
const db = admin.database();
const ref = db.ref("Blog");
const usersRef = ref.child('users');
const postsRef = ref.child('posts');

async function setUser() {
    console.log('Start : => ')
    await usersRef.set({
        alanisawesome: {
            date_of_birth: 'June 23, 1912',
            full_name: 'Alan Turing'
        },
        gracehop: {
            date_of_birth: 'December 9, 1906',
            full_name: 'Grace Hopper'
        }
    }, (error) => {
        if (error) {
            console.log('Data could not be saved.' + error);
        } else {
            console.log('Data saved successfully.');
        }
    }
    );
    console.log('End: =>  ');
}
//setUser();

function setUserChild() {
    usersRef.child('alanisawesome').set({
        date_of_birth: 'June 23, 1998',
        full_name: 'Alan Turing'
    });
    usersRef.child('gracehop').set({
        date_of_birth: 'December 9, 1906',
        full_name: 'Grace Hopper'
    });
}

//setUserChild();


function updateUser() {
    const hopperRef = usersRef.child('gracehop');
    hopperRef.update({
        'nickname': 'Amazing Grace'
    });
}
//updateUser();

const newPostRef = postsRef.push();
async function pushPosts() {
    postsRef.push({                          // push == push.set
        author: 'gracehop',  
        title: 'Announcing COBOL, a New Programming Language'
      });;
}
//pushPosts();

async function read(){
    ref.on('value', (snapshot) => {
        console.log(snapshot.val());
      }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
      }); 
}