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

//var db = firebase.firestore();
//var iconeLinee = db.collection("iconeLinee");

//var storage = firebase.storage();
//var storageRef = storage.ref();

export default {
    /*aggiuntaIconeLineeAlDatabase() {
        storageRef.child("iconeLinee/").listAll().then(function(result) {
            console.log(result);
            result.items.forEach(function(imageRef) {
                imageRef.getDownloadURL().then(function(url) {
                    console.log(url);
                    console.log(imageRef.name.split(".png")[0]);
                    let id = imageRef.name.split(".png")[0]

                    iconeLinee
                        .doc()
                        .set({
                            idLinea: id,
                            iconaLinea: url
                        });
                });
            });
        });
    },*/
}