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
var ultimeRicerche = db.collection("ultimeRicerche");

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
                idFermata: "-1",
                idLinea: idLinea,
                username: user
            });
    },
    rimuoviLineaPreferita(idLinea) {
        var user = Accesso.getUsername().toLowerCase();
        return elementiPreferiti
            .where("idLinea", "==", idLinea)
            .where("username", "==", user)
            .get()
            .then(results => {
                results.forEach(doc => {
                    return elementiPreferiti.doc(doc.id).delete();
                });
            });
    },
    getLineaSingolaPreferita(idLinea) {
        var user = Accesso.getUsername().toLowerCase();
        var arrayLinee = [];

        return elementiPreferiti
            .where("idLinea", "==", idLinea)
            .where("username", "==", user)
            .get()
            .then(results => {
                results.forEach(doc => {
                    arrayLinee.push(doc.data());
                });
                return arrayLinee;
            });
    },

    salvaUltimaRicerca(arrivo, partenza, data, ora) {
        var user = Accesso.getUsername().toLowerCase();

        ultimeRicerche
            .where("username", "==", user)
            .get()
            .then(results => {
                let i = 0;
                let i2 = 0;
                let ultimoTimestamp = Date.now() + "";

                results.forEach((item) => {
                    if (item.data().timestamp < ultimoTimestamp)
                        ultimoTimestamp = item.data().timestamp;


                    if (item.data().indirizzoArrivo == arrivo &&
                        item.data().indirizzoPartenza == partenza
                    )
                        i2++;


                    i++;
                });

                if (i >= 5) {
                    ultimeRicerche
                        .where("timestamp", "==", ultimoTimestamp)
                        .where("username", "==", user)
                        .get()
                        .then(results => {
                            results.forEach(doc => {
                                ultimeRicerche.doc(doc.id).delete();
                            });
                        });
                }

                if (i2 == 0) {

                    ultimeRicerche
                        .add({
                            dataPartenza: data,
                            indirizzoArrivo: arrivo,
                            indirizzoPartenza: partenza,
                            oraPartenza: ora,
                            timestamp: Date.now(),
                            username: user
                        });
                }

            });
    },

    getUltimeRicerche() {
        var user = Accesso.getUsername().toLowerCase();

        return ultimeRicerche
            .where("username", "==", user)
            .get()
            .then(results => {
                let aResults = [];

                results.forEach((item) => {
                    aResults.push(item.data());
                });

                return aResults;
            });
    }
}