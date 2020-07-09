import firebase from "@firebase/app";
import "@firebase/firestore";

import Accesso from "../login/access-functions.js";

//CONFIGURAZIONE DATABASE
const firebaseConfig = {
    apiKey: "AIzaSyDlmXCeXTgEEgjlQJ1fRUJGITc1ujPlW7g",
    authDomain: "nextbus-38e73.firebaseapp.com",
    projectId: "nextbus-38e73"
};

//INIZIALIZZAZIONE
firebase.initializeApp(firebaseConfig);

//VARIABILI PER ACCESSO AL DB E ALLE DIFFERENTI COLLEZIONI
var db = firebase.firestore();
var elementiPreferiti = db.collection("elementiPreferiti");
var ultimeRicerche = db.collection("ultimeRicerche");

export default {
    //RESTITUISCE LE LINEE INSERITE NEI PREFERITI PER UNO SPECIFICO UTENTE
    getLineePreferite() {

        //Per prevenire errori lo username nel DB viene salvato sempre in minuscolo
        var user = Accesso.getUsername().toLowerCase();
        var arrayLinee = [];

        return elementiPreferiti
            .where("username", "==", user)
            .get()
            .then(results => {
                results.forEach(doc => {
                    arrayLinee.push(doc.data());
                });

                return arrayLinee;
            });
    },

    //REGISTRA SUL DATABASE UNA NUOVA LINEA PREFERITA PER UNO SPECIFICO UTENTE
    setLineaPreferita(idLinea) {
        var user = Accesso.getUsername().toLowerCase();
        return elementiPreferiti
            .add({
                idLinea: idLinea,
                username: user
            });
    },

    //RIMUOVE DAL DATABASE UNA LINEA PREFERITA SPECIFICA PER UNO SPECIFICO UTENTE
    rimuoviLineaPreferita(idLinea) {
        var user = Accesso.getUsername().toLowerCase();

        //Ricerca dell'elemento e poi eliminazione
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

    //RESTITUISCE UN ARRAY CHE RAPPRESENTA LA LINEA PREFERITA (ARRAY CON UN SOLO ELEMENTO)
    getLineaSingolaPreferita(idLinea) {
        var user = Accesso.getUsername().toLowerCase();
        var arrayLinee = [];

        return elementiPreferiti
            .where("idLinea", "==", idLinea)
            .where("username", "==", user)
            .get()
            .then(results => {

                //Si scorrono tutti i risultati anche se si ipotizza che possa essere solo uno
                results.forEach(doc => {
                    arrayLinee.push(doc.data());
                });
                return arrayLinee;
            });
    },

    //REGISTRA SUL DATABASE L'ULTIMA RICERCA EFFETTUATA DA UNO SPECIFICO UTENTE FACENDO UNA SERIE DI CONTROLLI (N. MAX DI RICERCHE E DUPLICAZIONE RICERCA)
    salvaUltimaRicerca(arrivo, partenza, data, ora) {
        var user = Accesso.getUsername().toLowerCase();

        ultimeRicerche
            .where("username", "==", user)
            .get()
            .then(results => {
                //Rappresenta il numero di ricerche già salvate nel DB
                let i = 0;

                //Rappresenta la presenza o meno di elementi identici nel DB
                let i2 = 0;

                //Variabile necessaria a verificare quale elemento del DB è il meno recente
                let ultimoTimestamp = Date.now() + "";

                results.forEach((item) => {

                    //Volta per volta salvo il timestamp meno recente 
                    if (item.data().timestamp < ultimoTimestamp)
                        ultimoTimestamp = item.data().timestamp;

                    //Se ci sono duplicati incremento la variabile i2 (controllo solo indirizzo di partenza e arrivo)
                    if (item.data().indirizzoArrivo == arrivo && item.data().indirizzoPartenza == partenza)
                        i2++;

                    //Tengo conto del numero di risultati
                    i++;
                });

                //Se sono arrivato ad un massimo di 5 risultati per utente, cancello quello meno recente
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

                //Se non trovo duplicati, salvo la ricerca con il timestamp e lo username
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

    //RESTITUISCE LE ULTIME RICERCHE DI UNO SPECIFICO UTENTE
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