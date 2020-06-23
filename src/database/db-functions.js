import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDlmXCeXTgEEgjlQJ1fRUJGITc1ujPlW7g",
    authDomain: "nextbus-38e73.firebaseapp.com",
    projectId: "nextbus-38e73",
    storageBucket: "nextbus-38e73.appspot.com"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var iconeLinee = db.collection("iconeLinee");
//var elementiPreferiti = db.collection("elementiPreferiti");

//var storage = firebase.storage();
//var storageRef = storage.ref();

export default {
    getLineePreferite() {

    },

    getFermatePreferite() {

    }
}