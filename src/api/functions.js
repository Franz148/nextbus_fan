import axios from "axios";

export default {

    //RESTITUISCE LA LISTA DELLE LINEE DI UNO SPECIFICO SERVIZIO (ES. Autobus urbani trento agencyId = 12 )
    getLinee(agencyId) {
        return axios.get("https://os.smartcommunitylab.it/core.mobility/getroutes/" + agencyId);
    },

    //RESTITUISCE LA LISTA DELLE DELLE FERMATE DI UNA LINEA CON GLI ORARI COMPLETI DI UN GIORNO
    getLineaSingolaConOrario(agencyId, routeId) {
        return axios.get("https://os.smartcommunitylab.it/core.mobility/timetable/" + agencyId + "/" + routeId);
    },

    //RESTITUISCE LA LISTA DELLE FERMATE DI UNA LINEA CON DATI COME ID, NOME, ACCESSIBILITÀ, LAT E LNG 
    getLineaSingolaAccessibilita(agencyId, routeId) {
        return axios.get("https://os.smartcommunitylab.it/core.mobility/getstops/" + agencyId + "/" + routeId);
    },

    //API OPENCAGEDATA --> RESTITUISCE DATI GEOGRAFICI COME LAT E LNG PASSANDO UNA STRINGA (VIENE RISTRETTO IL CAMPO A SOLO RISULTATI IN ITALIANO E GEOGRAFICAMENTE IN ITALIA)
    getRisultatiGeograficiDaInserimento(userInput) {
        return axios.get("https://api.opencagedata.com/geocode/v1/json", {
            params: {
                key: "b57949a16e3e423da14bb1d689d09c4c",
                q: userInput,
                countrycode: "it",
                language: "it"
            }
        });
    },

    //RESTITUISCE UNA SINGLE JOURNEY STRUCTURE PASSANDO LAT E LNG DI PARTENZA E ARRIVO, DATA E ORA DI PARTENZA
    getRisultatiPercorso(partenza, arrivo, dataPartenza, oraPartenza) {
        return axios.post("https://dev.smartcommunitylab.it/core.mobility/plansinglejourney/", {
            "from": {
                "lon": partenza.lng,
                "lat": partenza.lat
            },
            "to": {
                "lon": arrivo.lng,
                "lat": arrivo.lat
            },
            "transportTypes": [
                "TRANSIT",
                "WALK"
            ],
            "departureTime": oraPartenza, //formato 00:00AM/PM
            "date": dataPartenza, //formato MM/dd/yyyy
            "routeType": "fastest",
            "resultsNumber": 5
        });
    },

    //ESEGUE E RESTITUISCE IN UNA VOLTA DUE RICHIESTE PER CONVERTIRE I DUE INDIRIZZI IN COORDINATE GEOGRAFICHE
    richiestaDatiPA(indirizzoPartenza, indirizzoArrivo) {
        const richiestaDatiPartenza = this.getRisultatiGeograficiDaInserimento(indirizzoPartenza);
        const richiestaDatiArrivo = this.getRisultatiGeograficiDaInserimento(indirizzoArrivo);

        return axios.all([richiestaDatiPartenza, richiestaDatiArrivo]).then(axios.spread((...responses) => {
            return responses;
        }));
    },

    //FUNZIONE CHE RACCHIUDE LA CONVERSIONE DEGLI INDIRIZZI (PASSANDO L'INPUT DELL'UTENTE INDIRIZZI, DATA E ORA DELLA PARTENZA) E I RISULTATI IN FORMATO SINGLE JOURNEY STRUCTURE
    pianificaViaggio(indirizzoPartenza, indirizzoArrivo, dataPartenza, oraPartenza) {
        let partenza = { lat: "", lng: "" };
        let arrivo = { lat: "", lng: "" };

        return this.richiestaDatiPA(indirizzoPartenza, indirizzoArrivo)
            .then(responses => {
                console.warn("Richieste rimanenti opencagedata.com: " + responses[1].data.rate.remaining);

                //La funzione di conversione degli indirizzi restituisce più risultati, per comodità diamo per scontato che il primo sia corretto (per questo si usa data.results[0])
                partenza.lat = responses[0].data.results[0].geometry.lat;
                partenza.lng = responses[0].data.results[0].geometry.lng;

                arrivo.lat = responses[1].data.results[0].geometry.lat;
                arrivo.lng = responses[1].data.results[0].geometry.lng;

                return this.getRisultatiPercorso(partenza, arrivo, dataPartenza, oraPartenza);
            })
    }

}