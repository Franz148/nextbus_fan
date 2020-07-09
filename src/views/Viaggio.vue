<template>
  <div class="md-layout-item md-size-100">
    <div class="md-layout md-alignment-center-center">
      <div class="md-layout-item md-size-100 md-title">Risultati della ricerca</div>

      <!-- SPINNER DI CARICAMENTO -->
      <div class="md-layout-item md-size-10">
        <md-progress-spinner class="md-layout-item" md-mode="indeterminate" v-show="activeSpinner"></md-progress-spinner>
      </div>

      <!-- ELENCO DEI RISULTATI COME LISTA ESPANDIBILE (OGNI ELEMENTO CONTIENE I PASSAGGI DEI VARI RISULTATI)  -->
      <md-list md-expand-single="true" class="md-layout-item md-size-100 md-triple-line">
        <div v-for="(viaggio, i) in risultati" :key="i">
          <md-list-item md-expand>
            <!-- ICONA PER VEDERE SE IL PERCORSO FA USO DI MEZZI PUBBLICI O NO -->
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

            <!-- PARTE ESPANDIBILE CON OGNI PASSAGGIO DEI SINGOLI RISULTATI -->
            <md-list slot="md-expand" class="md-triple-line">
              <md-list-item
                class="md-inset"
                v-for="(item, index) in viaggio.leg"
                :key="item.endtime"
              >
                <!-- SCELTA AVATAR CON IMPORTANZA ALLE LINEE URBANE DI TRENTO (MOSTRANDO L'IMMAGINE) -->
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

                <!-- SCELTA TESTO IN BASE AL TIPO DI PERCORSO DA FARE (A PIEDI, BUS O TRENO) -->
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

    <!-- EMPTY STATE SE CI SONO ERRORI NELL'API -->
    <md-empty-state
      md-icon="error"
      md-label="C'è stato un errore nella ricerca"
      md-description="Clicca su riprova e reinserisci la partenza e la destinazione."
      v-if="showSBErrore"
    ></md-empty-state>

    <!-- EMPTY STATE SE CI SONO 0 RISULTATI -->
    <md-empty-state
      md-icon="search_off"
      md-label="La ricerca non ha prodotto risultati"
      md-description="Prova a cambiare partenza e arrivo"
      v-if="zeroRisultati"
    ></md-empty-state>

    <!-- SNACKBAR CHE AIUTA A TORNARE IN PIANIFICA SE CI SONO ERRORI NELL'API -->
    <md-snackbar :md-active.sync="showSBErrore" :md-duration="duration">
      <span>La ricerca non è andata a buon fine!</span>
      <md-button class="md-primary" @click="ricercaFallita()">Riprova</md-button>
    </md-snackbar>
  </div>
</template>

<script>
//LIBRERIA PER CONVERSIONE DATA E ORA
import format from "date-fns/format";

//LIBRERIA PER L'ACCESSO
import Accesso from "../login/access-functions.js";

//GESTIONE API
import Functions from "../api/functions.js";

//GESTIONI DB
import dbFunctions from "../database/db-functions";

//UTILIZZO DELLA LIBRERIA LODASH TRAMITE "_"
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
    //RESTITUISCE L'IMMAGINE DELLA LINEA AVENDO L'ID
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },

    //CONVERTE IL TIMESTAMP IN FORMATO hh:mm
    convertTimestampToTime(unix_timestamp) {
      var date = new Date(unix_timestamp);

      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();

      return hours + ":" + minutes.substr(-2);
    },

    //RESTITUISCE UN'ORA IN FORMATO hh:mm:ss DATO COME INPUT L'ORA IN MILLISECONDI
    msToHMS(s) {
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

    //CONVERTE IL TEMPO IN FORMATO hh:mm 24H IN hh:mm AM/PM 12H
    tConvert(time) {
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        time = time.slice(1);
        time[5] = +time[0] < 12 ? "AM" : "PM";
        time[0] = +time[0] % 12 || 12;
      }
      return time.join("");
    },

    //ORDINA I RISULTATI DELLA RICERCA IN BASE A QUALE PERCORSO MI FA ARRIVARE PRIMA IN TERMINI DI TEMPO E NON DI DURATA EFFETTIVA DEL PERCORSO
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

    //FUNZIONE CHE RACCHIUDE TUTTI GLI STEP NECESSARI A PRENDERE I DATI DALLA QUERY DEL PATH ED ESEGUIRE LA CHIAMATA ALL'API IN MODO TALE DA MOSTRARE I RISUTALTI
    loadViaggio() {
      this.indirizzoP = this.$route.query.indirizzoP;
      this.indirizzoA = this.$route.query.indirizzoA;

      let tmpDate = this.$route.query.dataPartenza.split("/");
      this.dataPartenza = format(
        new Date(tmpDate[2], tmpDate[1] - 1, tmpDate[0]),
        "MM/dd/yyyy"
      );

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

          if (results.data.length == 0) {
            this.zeroRisultati = true;
            this.showSBErrore = false;
          } else if (results.data.length != 0) {
            this.zeroRisultati = false;

            //Se ho effettuato il login e la ricerca è andata a buon fine, faccio anche in modo che venga salvata nel DB
            if (Accesso.isLoggedIn()) {
              dbFunctions.salvaUltimaRicerca(
                this.indirizzoA,
                this.indirizzoP,
                this.$route.query.dataPartenza,
                this.$route.query.oraPartenza
              );
            }
          }
        })
        .catch(() => {
          this.showSBErrore = true;
          this.zeroRisultati = false;
          this.activeSpinner = false;
        });
    },

    //SE CI SONO ERRORI NELLA RISPOSTA DELL'API ALLORA RESETTO LA QUERY DEL PATH E TORNO A PIANIFICA GRAZIE ALLO SNACKBAR
    ricercaFallita() {
      this.showSBErrore = false;

      this.$router.replace({ query: null });
      this.$router.push("/pianifica");
    }
  },
  created: function() {
    this.loadViaggio();
  },

  //CONTROLLO NECESSARIO PER FARE RICERCHE UNA VOLTA CHE SI STANNO VISUALIZZANDO I RISULTATI SENZA CHE VENGA RICARICATA LA PAGINA
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