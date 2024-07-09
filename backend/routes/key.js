
// const firebase=require('firebase')

// const firebaseConfig = {
//   apiKey: "AIzaSyCxJt0ZjIVAYoIED4kdYhlM7wAiT49eSEw",
//   authDomain: "backend-b4589.firebaseapp.com",
//   projectId: "backend-b4589",
//   storageBucket: "backend-b4589.appspot.com",
//   messagingSenderId: "722768381387",
//   appId: "1:722768381387:web:c983870efc111bdaa4224e",
//   measurementId: "G-2VP3NCMCM2"
// };

// firebase.intializeApp(firebaseConfig);
// const db=firebase.firestore();



var admin = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');

var serviceAccount = require("../routes/backend-b4589-firebase-adminsdk-j9tix-eeddb6bb28.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
    db
}