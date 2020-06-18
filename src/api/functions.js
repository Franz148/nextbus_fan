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
        return axios.get("https://os.smartcommunitylab.it/core.mobility/getstops/" + agencyId + "/" + routeId);
    }
}