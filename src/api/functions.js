import axios from "axios";

export default {
    getLinee(agencyId) {
        //this.linee = results.data;

        return axios.get("https://os.smartcommunitylab.it/core.mobility/getroutes/" + agencyId);
    },

    getLineaSingolaConOrario(agencyId, routeId) {
        /*this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;
        this.viaggi = results.data.trips[0].stopTimes;*/

        //     <md-list>
        //   <div v-for="n in idFermate.length" :key="idFermate[n]">
        //     <md-list-item v-if="funzioneProva(viaggi[n])">
        //       <div class="md-list-item-text">
        //         <span>{{idFermate[n]}}</span>
        //         <span>{{nomeFermate[n]}}</span>
        //         <span>{{viaggi[n]}}</span>
        //       </div>
        //     </md-list-item>
        //     <md-divider></md-divider>
        //   </div>
        // </md-list>

        return axios.get("https://os.smartcommunitylab.it/core.mobility/timetable/" + agencyId + "/" + routeId);
    },

    getLineaSingolaAccessibilita(agencyId, routeId) {

        //this.linea = results.data

        //     <md-list class="md-layout-item md-size-80">
        //   <div v-for="fermata in linea" :key="fermata.id">
        //     <md-divider></md-divider>
        //     <md-list-item>
        //       <md-icon>directions_bus</md-icon>

        //       <span class="md-list-item-text">{{fermata.name}}</span>

        //       <md-icon class="md-primary" v-if="fermata.wheelChairBoarding == 1">accessible</md-icon>
        //       <md-icon class="md-primary">favorite_border</md-icon>
        //     </md-list-item>
        //   </div>
        // </md-list>
        return axios.get("https://os.smartcommunitylab.it/core.mobility/getstops/" + agencyId + "/" + routeId);
    },

    getArrayOrarioTotaleLineaSingola(agencyId, routeId) {

        /*
        <md-field class="md-layout-item md-size-80">
      <label>Quale orario vuoi?</label>
      <md-input type="number" v-model="numOrario"></md-input>
    </md-field>

    <p class="md-layout-item md-size-80">Orario selezionato: {{numOrario}} | Orari totali: {{orari.length - 1}}</p>

    <md-list class="md-layout-item md-size-80" v-if="numOrario != null ">
      <md-list-item v-for="orarioSingolo in orari[numOrario].stopTimes" :key="orarioSingolo">
        <md-icon>move_to_inbox</md-icon>
        <span class="md-list-item-text">{{orarioSingolo}}</span>
      </md-list-item>
    </md-list>

        */

        //this.orari = data;

        return this.getLineaSingolaConOrario(agencyId, routeId).then(results => {
            return results.data.trips;
        });
    },

    //API opencagedata
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

    //Restituisce le possibili strade da percorrere 
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

    //Due richieste contemporanee A/R da indirizzi
    richiestaDatiPA(indirizzoPartenza, indirizzoArrivo) {
        const richiestaDatiPartenza = this.getRisultatiGeograficiDaInserimento(indirizzoPartenza);
        const richiestaDatiArrivo = this.getRisultatiGeograficiDaInserimento(indirizzoArrivo);

        return axios.all([richiestaDatiPartenza, richiestaDatiArrivo]).then(axios.spread((...responses) => {
            return responses;
        }));
    },

    pianificaViaggio(indirizzoPartenza, indirizzoArrivo, dataPartenza, oraPartenza) {
        let partenza = { lat: "", lng: "" };
        let arrivo = { lat: "", lng: "" };

        return this.richiestaDatiPA(indirizzoPartenza, indirizzoArrivo)
            .then(responses => {
                console.warn("Richieste rimanenti opencagedata.com: " + responses[1].data.rate.remaining);

                partenza.lat = responses[0].data.results[0].geometry.lat;
                partenza.lng = responses[0].data.results[0].geometry.lng;

                arrivo.lat = responses[1].data.results[0].geometry.lat;
                arrivo.lng = responses[1].data.results[0].geometry.lng;

                return this.getRisultatiPercorso(partenza, arrivo, dataPartenza, oraPartenza);
            })
    }

}