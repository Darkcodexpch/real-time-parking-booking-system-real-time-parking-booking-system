import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDUH7hTPGVQlhc506W-dGR9OpeeStvjrKI",
    authDomain: "parking-recruitment-system.firebaseapp.com",
    databaseURL: "https://parking-recruitment-system-default-rtdb.firebaseio.com",
    projectId: "parking-recruitment-system",
    storageBucket: "parking-recruitment-system.appspot.com",
    messagingSenderId: "821515729327",
    appId: "1:821515729327:web:d13b1f15a123d7554b975a",
    measurementId: "G-RWT3QVVBXD"

});
let storage = firebaseApp.storage();
let storageRef = storage.ref();
const db = firebaseApp.database();
const auth = firebaseApp.auth();
export { db, auth, storageRef }