<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <md-empty-state
        md-icon="account_circle"
        md-label="Visualizza i tuoi preferiti"
        md-description="Per poter salvare fermate e linee preferite devi effettuare l'accesso"
        v-if="!checkAutenticazione()"
      >
        <md-button class="md-primary md-raised" to="/accesso">Accedi</md-button>
      </md-empty-state>

      <md-card
        class="md-layout-item md-xsmall-size-90 md-small-size-80 md-size-60"
        v-if="checkAutenticazione()"
        md-with-hover
      >
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Lista dei preferiti</div>
            <div class="md-subhead">Le linee preferite verranno visualizzate qui</div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content class="content">
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item md-size-5">
              <md-progress-spinner md-mode="indeterminate" v-show="activeSpinner"></md-progress-spinner>
            </div>

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

            <md-empty-state
              md-icon="favorite_border"
              md-label="Non hai ancora preferiti"
              md-description="Se vuoi visualizzare qui le linee che consulti più spesso vai alla pagina Linee."
              v-else
            >
              <md-button class="md-primary md-raised" to="/linee">Pagina linee</md-button>
            </md-empty-state>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import Accesso from "../login/access-functions.js";
import Dbfunctions from "../database/db-functions.js";
import Functions from "../api/functions.js";
import axios from "axios/";

export default {
  data: () => ({
    datiLinee: [],
    lineePreferite: [],
    activeSpinner: true,
    shownedEmptyState: false
  }),
  methods: {
    checkAutenticazione() {
      return Accesso.isLoggedIn();
    },

    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },

    returnLineaSingola(id) {
      return this.datiLinee.find(linea => linea.id.id == id);
    },

    addFavoriteLine(id, preferiti, i) {
      if (preferiti == 1) {
        Dbfunctions.rimuoviLineaPreferita(id).then(() => {
          this.lineePreferite.splice(i, 1);
          if (this.lineePreferite.length == 0) this.shownedEmptyState = true;
        });
      }
    }
  },

  created: function() {

    const getLinee = Functions.getLinee(12);
    const getPreferiti = Dbfunctions.getLineePreferite();

    axios.all([getLinee, getPreferiti])
    .then(axios.spread((...responses) => {
      this.datiLinee = responses[0].data;
      this.lineePreferite = responses[1];

      this.activeSpinner = false;

      if (this.lineePreferite.length == 0) this.shownedEmptyState = true;
    }));
  }
};
</script>

<style>
</style>