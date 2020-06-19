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

    //Funzione di prova per API con SingleJourney
    pianificaViaggio() {
        return axios.get("https://dev.smartcommunitylab.it/core.mobility/plansinglejourney/", {
            params: {
                "from": {
                    "lon": "11.151796",
                    "stopId": null,
                    "name": null,
                    "stopCode": null,
                    "lat": "46.066799"
                },
                "to": {
                    "lon": "11.11889",
                    "stopId": null,
                    "name": null,
                    "stopCode": null,
                    "lat": "46.066695"
                },
                "routeType": "fastest",
                "resultsNumber": 1,
                "departureTime": "00:00PM",
                "date": "06/20/2020",
                "transportTypes": [
                    "TRANSIT"
                ]
            }
        });
    }
}