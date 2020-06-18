<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <md-list class="md-layout-item md-size-80">
      <div v-for="fermata in linea" :key="fermata.id">
        <md-divider></md-divider>
        <md-list-item>
          <md-icon>directions_bus</md-icon>

          <span class="md-list-item-text">{{fermata.name}}</span>

          <md-icon class="md-primary" v-if="fermata.wheelChairBoarding == 1">accessible</md-icon>
          <md-icon class="md-primary">favorite_border</md-icon>
        </md-list-item>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "./functions.js";

export default {
  data: () => ({
    linea: []
    /*idFermate: [],
    nomeFermate: [],
    viaggi: []*/
  }),

  methods: {
    /*funzioneProva(s){
      if(s == ""){
        return false;
      }
      else{
        return true;
      }
    }*/
  },

  created: function() {
    /*
    Functions.getLinee(12)
      .then(results => {
        this.linee = results.data;
      })
      .catch(error => {
        console.error(error);
      });*/

    /*Functions.getLineaSingolaConOrario(12, "10R")
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;
        this.viaggi = results.data.trips[0].stopTimes;
      })
      .catch(error => {
        console.log(error);
      });
      */

    Functions.getLineaSingolaAccessibilita(12, "10R")
      .then(results => {
        this.linea = results.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>