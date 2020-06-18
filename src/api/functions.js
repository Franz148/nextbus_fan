import axios from "axios";

export default {
    helloWorld() {
        alert("ciao mondo!");
    },

    getLinee(agencyId) {
        return axios.get("https://os.smartcommunitylab.it/core.mobility/getroutes/" + agencyId);
    }
}