<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- <div class="md-layout-item md-size-100">
      <md-avatar>
          <img src="https://placeimg.com/40/40/people/5" alt="People">
        </md-avatar>
      <h1>nome fermata</h1>
    </div> -->
    


    <md-list class="md-layout-item md-size-50">
      <!-- <div v-for="n in idFermate.length-1" :key="idFermate[n]"> -->
        <div v-for="(id,n) in idFermate" :key="idFermate[n]">
        <!--fermata abilitata-->
        <!--passa = trip[n] se "" allora non passa-->
        <template v-if="viaggi[n] !=''">
          <md-list-item>
            <md-icon class="md-primary">directions_bus</md-icon>

            <div class="md-list-item-text">
              <span>{{nomeFermate[n]}}</span>
              <span>Orario previsto: {{viaggi[n]}}</span>
              
              <!-- <span>Orario previsto: {{accessibilita[n].wheelChairBoarding}}</span> -->
              <!-- <span>{{ritornaAccessibile(accessibilita[n])}}</span> -->
            </div>

            <md-icon class="md-primary" v-if="ritornaAccessibile(accessibilita[n]) != 0">accessible</md-icon>
            <!-- <md-icon class="md-primary">favorite_border</md-icon> -->
          </md-list-item>
        </template>

        <!--fermata non abilitata-->

        <template v-else>
          <md-list-item>
            <md-icon>directions_bus</md-icon>
            <div class="md-list-item-text">
              <span>{{nomeFermate[n]}}</span>
            </div>
            <md-icon v-if="ritornaAccessibile(accessibilita[n]) != 0">accessible</md-icon>
          </md-list-item>
        </template>

        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "../api/functions.js";
//import functions from '../api/functions.js';
export default {
  data: () => ({
    idFermate: [],
    nomeFermate: [],
    viaggi: [],
    accessibilita: [],
    accessibile: []
  }),
  created: function() {
    //(idAgency,idRotes)
    Functions.getLineaSingolaConOrario(12, "10R")
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;

        //la posizione di results.data.trips è la trip
        this.viaggi = results.data.trips[1].stopTimes;
      })
      .catch(error => {
        console.error(error);
      });

    Functions.getLineaSingolaAccessibilita(12, "10R")
      .then(results2 => {
        this.accessibilita = results2.data;
        
        //console.log(this.accessibilita[23].wheelChairBoarding);
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    ritornaAccessibile(accessibile) {
      
      return accessibile.wheelChairBoarding;
    }
  }
};
</script>


<style>
</style>