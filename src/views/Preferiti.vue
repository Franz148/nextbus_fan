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
            <div class="md-subhead">
              Linee preferite verranno visualizzate qui
            </div>
          </md-card-header-text>
        </md-card-header>

        <md-card-content class="content">
          <md-list v-if="lineePreferite.length != 0">
            <div v-for="linea in lineePreferite" :key="linea.idLinea">
              <md-list-item :to="'/lineaSingola/' + linea.idLinea + '?routeLongName=' + returnLineaSingola(linea.idLinea).routeLongName">
                <md-avatar>
                  <img :src="getImageFromId(linea.idLinea)" />
                </md-avatar>
                <span class="md-list-item-text">{{returnLineaSingola(linea.idLinea).routeLongName}}</span>

                <md-button class="md-icon-button md-list-action">
                  <md-icon class="md-primary">favorite</md-icon>
                </md-button>
              </md-list-item>
              <md-divider></md-divider>
            </div>
          </md-list>
          <span v-if="lineePreferite.length == 0">Non sono presenti preferiti</span>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import Accesso from "../login/access-functions.js";
import Dbfunctions from "../database/db-functions.js";
import Functions from "../api/functions.js";

export default {
  data: () => ({
    datiLinee: [],
    lineePreferite: []
  }),
  methods: {
    checkAutenticazione() {
      return Accesso.isLoggedIn();
    },

    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },

    returnLineaSingola(id) {
      let i = 0;
      let trovato = false;

      let linea = [];

      while (i < this.datiLinee.length || !trovato) {
        if (id == this.datiLinee[i].id.id) {
          trovato = true;
          linea.push(this.datiLinee[i]);
        }

        i++;
      }

      return linea[0];
    }
  },

  beforeCreate: function() {
    Dbfunctions.getLineePreferite().then(results => {
      this.lineePreferite = results;
    });

    Functions.getLinee(12).then(results => {
      this.datiLinee = results.data;
    });
  }
};
</script>

<style>
</style>