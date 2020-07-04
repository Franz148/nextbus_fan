<template>
  <div class="md-layout-item md-size-100">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-100 md-title">Risultati della ricerca</div>
      <div class="md-layout-item md-size-10">
        <md-progress-spinner class="md-layout-item" md-mode="indeterminate" v-show="activeSpinner"></md-progress-spinner>
      </div>

      <md-list md-expand-single="true" class="md-layout-item md-size-100 md-triple-line">
        <div v-for="(viaggio, i) in risultati" :key="i">
          <md-list-item md-expand>
            <md-icon v-if="viaggio.walkingDuration == (viaggio.duration / 1000)">directions_walk</md-icon>
            <md-icon v-if="viaggio.walkingDuration != (viaggio.duration / 1000)">directions_bus</md-icon>
            <div class="md-list-item-text">
              <span>
                Partenza
                <b>{{convertTimestampToTime(viaggio.startime)}}</b>
              </span>

              <span>
                Arrivo
                <b>{{convertTimestampToTime(viaggio.endtime)}}</b>
              </span>

              <span>
                Durata
                <b>{{msToHMS(viaggio.duration)}}</b>
              </span>
            </div>

            <md-list slot="md-expand" class="md-triple-line">
              <md-list-item
                class="md-inset"
                v-for="(item, index) in viaggio.leg"
                :key="item.endtime"
              >
                <md-avatar class="md-avatar-icon" v-if="item.transport.type == 'WALK'">
                  <md-icon>directions_walk</md-icon>
                </md-avatar>
                <md-avatar
                  class="md-avatar-icon"
                  v-if="item.transport.type == 'BUS' && item.transport.agencyId != 12"
                >
                  <md-icon>directions_bus</md-icon>
                </md-avatar>
                <md-avatar v-if="item.transport.type == 'BUS' && item.transport.agencyId == 12">
                  <img :src="getImageFromId(item.transport.routeId)" />
                </md-avatar>
                <md-avatar class="md-avatar-icon" v-if="item.transport.type == 'TRAIN'">
                  <md-icon>train</md-icon>
                </md-avatar>
                <div class="md-list-item-text">
                  <span
                    v-if="item.transport.type == 'BUS' && item.transport.agencyId != 12"
                  >{{index + 1}}) Linea: {{item.transport.routeShortName}} | P: {{item.from.name}}</span>
                  <span v-else>{{index + 1}}) P: {{item.from.name}}</span>
                  <span>A: {{item.to.name}}</span>

                  <span>Partenza alle: {{convertTimestampToTime(item.startime)}}</span>
                </div>
              </md-list-item>
            </md-list>
          </md-list-item>
          <md-divider></md-divider>
        </div>
      </md-list>
    </div>

    <md-empty-state
      md-rounded
      md-icon="error"
      md-label="C'è stato un errore nella ricerca"
      md-description="Clicca su riprova e reinserisci la partenza e la destinazione."
      v-if="showSBErrore"
    ></md-empty-state>

    <md-empty-state
      md-rounded
      md-icon="search_off"
      md-label="La ricerca non ha prodotto risultati"
      md-description="Prova a cambiare partenza e arrivo"
      v-if="zeroRisultati"
    ></md-empty-state>

    <md-snackbar :md-active.sync="showSBErrore" :md-duration="duration">
      <span>La ricerca non è andata a buon fine!</span>
      <md-button class="md-primary" @click="ricercaFallita()">Riprova</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import Accesso from "../login/access-functions.js";
import Functions from "../api/functions.js";
import dbFunctions from '../database/db-functions';
var _ = require("lodash");

export default {
  data: () => ({
    risultati: [],
    indirizzoP: "",
    indirizzoA: "",
    dataPartenza: "",
    oraPartenza: "",
    activeSpinner: true,
    showSBErrore: false,
    duration: Infinity,
    zeroRisultati: false
  }),

  methods: {
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },
    convertTimestampToTime(unix_timestamp) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();

      // Will display time in 10:30:23 format
      return hours + ":" + minutes.substr(-2);
    },

    msToHMS(s) {
      // Pad to 2 or 3 digits, default is 2
      function pad(n, z) {
        z = z || 2;
        return ("00" + n).slice(-z);
      }

      var ms = s % 1000;
      s = (s - ms) / 1000;
      var secs = s % 60;
      s = (s - secs) / 60;
      var mins = s % 60;
      var hrs = (s - mins) / 60;

      return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
    },

    tConvert(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    },

    ordinaRisultati() {
      let confronta = (a, b) => {

        const ricercaA = a.endtime;
        const ricercaB = b.endtime;

        let comparison = 0;

        if (ricercaA > ricercaB) {
          comparison = 1;
        } else if (ricercaA < ricercaB) {
          comparison = -1;
        }
        
        return comparison;
      };

      this.risultati.sort(confronta);
    },

    loadViaggio() {
      this.indirizzoP = this.$route.query.indirizzoP;
      this.indirizzoA = this.$route.query.indirizzoA;
      this.dataPartenza = this.$route.query.dataPartenza;
      this.oraPartenza = this.tConvert(this.$route.query.oraPartenza);

      Functions.pianificaViaggio(
        this.indirizzoP,
        this.indirizzoA,
        this.dataPartenza,
        this.oraPartenza
      )
        .then(results => {
          this.activeSpinner = false;

          this.risultati = results.data;
          this.ordinaRisultati();

          if (results.data.length == 0) this.zeroRisultati = true;
          if (results.data.length != 0) {
            this.zeroRisultati = false;

            if(Accesso.isLoggedIn()){
              dbFunctions.salvaUltimaRicerca(this.indirizzoA, this.indirizzoP, this.dataPartenza, this.$route.query.oraPartenza);
            }
          }
        })
        .catch(() => {
          this.showSBErrore = true;
          this.activeSpinner = false;
        });
    },
    ricercaFallita() {
      this.showSBErrore = false;

      this.$router.replace({ query: null });
      this.$router.push("/pianifica");
    }
  },
  created: function() {
    this.loadViaggio();
  },

  watch: {
    $route(from, to) {
      if (_.isEqual(from.query, to.query) == false) {
        this.activeSpinner = true;
        this.loadViaggio();
      }
    }
  }
};
</script>

<style scoped>
</style>