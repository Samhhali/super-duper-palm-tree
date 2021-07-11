const express = require('express');
const router = express.Router();
const admin = require('firebase-admin')

const db = admin.firestore();
const citiesRef = db.collection("cities");

// read all docs inside things collection

// router.get('/', async (req, res) => {
//     const snapshot = await citiesRef.get();
//     snapshot.forEach(doc => {
//         console.log(doc.id, '=>', doc.data());
//     });
//     return res.json({});


// });
router.post('/citiesCollection', async (req, res) => {

    citiesRef.doc("SF").set({
        name: "San Francisco", state: "CA", country: "USA",
        capital: false, population: 860000,
        regions: ["west_coast", "norcal"]
    });
    citiesRef.doc("LA").set({
        name: "Los Angeles", state: "CA", country: "USA",
        capital: false, population: 3900000,
        regions: ["west_coast", "socal"]
    });
    citiesRef.doc("DC").set({
        name: "Washington, D.C.", state: null, country: "USA",
        capital: true, population: 680000,
        regions: ["east_coast"]
    });
    citiesRef.doc("TOK").set({
        name: "Tokyo", state: null, country: "Japan",
        capital: true, population: 9000000,
        regions: ["kanto", "honshu"]
    });
    citiesRef.doc("BJ").set({
        name: "Beijing", state: null, country: "China",
        capital: true, population: 21500000,
        regions: ["jingjinji", "hebei"]
    });
    console.log('Done setting!');
    return res.json({});


});

router.post('/citiesSubCollection', async (req, res) => {

    await citiesRef.doc('SF').collection('landmarks').doc().set({
        name: 'Golden Gate Bridge',
        type: 'bridge'
    });
    await citiesRef.doc('SF').collection('landmarks').doc().set({
        name: 'Legion of Honor',
        type: 'museum'
    });
    await citiesRef.doc('LA').collection('landmarks').doc().set({
        name: 'Griffith Park',
        type: 'park'
    });
    await citiesRef.doc('LA').collection('landmarks').doc().set({
        name: 'The Getty',
        type: 'museum'
    });
    await citiesRef.doc('DC').collection('landmarks').doc().set({
        name: 'Lincoln Memorial',
        type: 'memorial'
    });
    await citiesRef.doc('DC').collection('landmarks').doc().set({
        name: 'National Air and Space Museum',
        type: 'museum'
    });
    await citiesRef.doc('TOK').collection('landmarks').doc().set({
        name: 'Ueno Park',
        type: 'park'
    });
    await citiesRef.doc('TOK').collection('landmarks').doc().set({
        name: 'National Museum of Nature and Science',
        type: 'museum'
    });
    await citiesRef.doc('BJ').collection('landmarks').doc().set({
        name: 'Jingshan Park',
        type: 'park'
    });
    await citiesRef.doc('BJ').collection('landmarks').doc().set({
        name: 'Beijing Ancient Observatory',
        type: 'museum'
    });

    console.log('Done setting subCollections!');
    return res.json({});
});


router.get('/collectionGroup', async (req, res) => {

    const Snapshot = await db.collectionGroup('landmarks').where('type', '==', 'museum').get();
    Snapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.get('type'));
    });
    return res.json({});

});

// router.get('/:id?', async (req, res) => {
//     const id = req.params.id;
//     const snapshot = await citiesRef.doc(id).get();

//     if (snapshot.exists) {
//         try {
//             let data = snapshot.data();
//             console.log(snapshot.createTime);
//             console.log(snapshot.ref.parent);

//                 console.log(snapshot.id, "=> ", data.state);

//         } catch (error) {
//             return res.json({ sucess: false, msg: " Wrong input" });
//         }
//     }

//     const doc = await citiesRef.doc('SF').get();
//     const data = doc.data();
//     if (!doc.exists) {
//         console.log('No such document!');
//     } else {
//         let regionA = data.regions[0];
//         let regionB = data.regions[1];

//         console.log('Document id:', data.name, " region 1 =>  ", regionA,  " region 2 =>  ", regionB);
//     }
//     return res.json({ sucess: false, msg: " Wrong input" });


// });

router.get('/paginate/', async (req, res) => {

    const query = citiesRef.orderBy('population').limit(3);
    let snapshot = await query.get();
    console.log("First patch ==========>")
    snapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data())
    })
    // last doc 
    const last = snapshot.docs[snapshot.docs.length - 1];
    // next patch
    const next = citiesRef.orderBy('population')
        .startAfter(last.data().population).limit(3);

    snapshot = await next.get();
    console.log("second patch ==========>")
    snapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data())
    })

    return res.send('s');


});
module.exports = router;
