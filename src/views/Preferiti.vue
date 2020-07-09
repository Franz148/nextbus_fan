<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <!-- EMPTY STATE NEL CASO IN CUI NON SI SIA FATTO L'ACCESSO -->
      <md-empty-state
        md-icon="account_circle"
        md-label="Visualizza i tuoi preferiti"
        md-description="Per poter salvare fermate e linee preferite devi effettuare l'accesso"
        v-if="!checkAutenticazione()"
      >
        <md-button class="md-primary md-raised" to="/accesso">Accedi</md-button>
      </md-empty-state>

      <!-- CARD VISUALIZZATA NEL CASO SI SIA FATTO L'ACCESSO -->
      <md-card
        class="md-layout-item md-size-60 md-small-size-80 md-xsmall-size-90"
        v-if="checkAutenticazione()"
      >
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Lista dei preferiti</div>
            <div class="md-subhead">Le linee preferite verranno visualizzate qui</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content class="content">
          <div class="md-layout md-alignment-center-center">
            <!-- SPINNER PER IL CARICAMENTO -->
            <div class="md-layout-item md-size-5">
              <md-progress-spinner md-mode="indeterminate" v-show="activeSpinner"></md-progress-spinner>
            </div>

            <!-- LISTA DEI PREFERITI  -->
            <md-list v-if="!shownedEmptyState" class="md-layout-item md-size-100">
              <div v-for="(linea, i) in lineePreferite" :key="linea.idLinea">
                <md-list-item
                  :to="'/lineaSingola/' + linea.idLinea + '?routeLongName=' + returnLineaSingola(linea.idLinea).routeLongName"
                >
                  <md-avatar>
                    <img :src="getImageFromId(linea.idLinea)" />
                  </md-avatar>
                  <span
                    class="md-list-item-text"
                  >{{returnLineaSingola(linea.idLinea).routeLongName}}</span>

                  <md-button
                    class="md-icon-button md-primary"
                    @click.stop.prevent="addFavoriteLine(linea.idLinea, 1,i)"
                  >
                    <md-icon>favorite</md-icon>
                  </md-button>
                </md-list-item>
                <md-divider></md-divider>
              </div>
            </md-list>

            <!-- EMPTY STATE NEL CASO IN CUI NON CI SIANO PREFERITI -->
            <md-empty-state
              md-icon="favorite_border"
              md-label="Non hai ancora preferiti"
              md-description="Se vuoi visualizzare qui le linee che consulti più spesso vai alla pagina Linee."
              v-if="shownedEmptyState"
            >
              <md-button class="md-primary md-raised" to="/linee">Pagina linee</md-button>
            </md-empty-state>

            <!-- EMPTY STATE MOSTRATO NEL CASO IN CUI CI SIANO ERRORI NELL'API -->
            <md-empty-state
              md-icon="error"
              md-label="C'è stato un errore nel caricamento dei preferiti"
              md-description="Prova a ricaricare la pagina."
              v-if="showErrore"
            ></md-empty-state>
          </div>
        </md-card-content>
      </md-card>
    </div>

    <!-- SNACKBAR IN CASO DI RIMOZIONE DEI PREFERITI DI UNA LINEA -->
    <md-snackbar :md-active.sync="showSBremove" md-persistent>
      <span>
        La
        <b>linea {{testoSnackbar}}</b> è stata rimossa dai preferiti.
      </span>
    </md-snackbar>
  </div>
</template>

<script>
//LIBRERIA GESTIONE ACCESSO
import Accesso from "../login/access-functions.js";

//GESTIONE DATABASE
import Dbfunctions from "../database/db-functions.js";

//GESTIONE API
import Functions from "../api/functions.js";

//AXIOS PER FARE CHIAMATA AXIOS.ALL IN QUESTA PAGINA
import axios from "axios/";

export default {
  data: () => ({
    datiLinee: [],
    lineePreferite: [],
    activeSpinner: true,
    shownedEmptyState: false,
    showSBremove: false,
    testoSnackbar: "",
    showErrore: false
  }),
  methods: {
    //RITORNA TRUE SE L'UTENTE HA FATTO L'ACCESSO
    checkAutenticazione() {
      return Accesso.isLoggedIn();
    },

    //RESTITUISCE L'IMMAGINE IN BASE ALL'ID DELLA LINEA
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },

    //IN BASE ALL'ID RESTITUSISCE UN ELEMENTO DELL'ARRAY LINEE OTTENUTO DALLA CHIAMATA ALL'API
    returnLineaSingola(id) {
      return this.datiLinee.find(linea => linea.id.id == id);
    },

    //PERMETTE DI RIMUOVERE DAI PREFERITI UNA LINEA SPECIFICA (VARIANTE DEL METODO USATO IN LINEE.VUE E LINEASINGOLA.VUE)
    addFavoriteLine(id, preferiti, i) {
      if (preferiti == 1) {
        Dbfunctions.rimuoviLineaPreferita(id).then(() => {
          this.lineePreferite.splice(i, 1);
          if (this.lineePreferite.length == 0) this.shownedEmptyState = true;

          this.showSBremove = true;
          this.testoSnackbar = this.returnLineaSingola(id).routeShortName;
        });
      }
    }
  },

  created: function() {
    //SE L'UTENTE HA FATTO L'ACCESSO, VIENE ESEGUITO UN AXIOS.ALL SULLE CHIAMATE ALLE LINEE TOTALI E ALLE LINEE PREFERITE NEL DB
    if (Accesso.isLoggedIn()) {
      const getLinee = Functions.getLinee(12);
      const getPreferiti = Dbfunctions.getLineePreferite();

      axios
        .all([getLinee, getPreferiti])
        .then(
          axios.spread((...responses) => {
            this.datiLinee = responses[0].data;
            this.lineePreferite = responses[1];

            this.activeSpinner = false;

            if (this.datiLinee.length == 0) {
              this.activeSpinner = false;
              this.showErrore = true;
            }
            if (this.lineePreferite.length == 0) this.shownedEmptyState = true;
          })
        )
        .catch(errors => {
          console.error(errors);

          this.activeSpinner = false;
          this.showErrore = true;
        });
    }
  }
};
</script>

<style>
</style>