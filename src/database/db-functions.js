import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import Accesso from "../login/access-functions.js";

const firebaseConfig = {
    apiKey: "AIzaSyDlmXCeXTgEEgjlQJ1fRUJGITc1ujPlW7g",
    authDomain: "nextbus-38e73.firebaseapp.com",
    projectId: "nextbus-38e73"
};

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var elementiPreferiti = db.collection("elementiPreferiti");

export default {
    getLineePreferite() {
        var user = Accesso.getUsername().toLowerCase();
        var arrayLinee = [];

        return elementiPreferiti
            .where("idFermata", "==", "-1")
            .where("username", "==", user)
            .get()
            .then(results => {
                results.forEach(doc => {
                    arrayLinee.push(doc.data());
                });

                return arrayLinee;
            });
    },
    setLineaPreferita(idLinea) {
        var user = Accesso.getUsername().toLowerCase();
        return elementiPreferiti
            .add({ 
                idFermata:"-1",
                idLinea: idLinea,
                username:user
            });


    }
}