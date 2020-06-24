<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- <div class="md-layout-item md-size-100">
      <md-avatar>
          <img src="https://placeimg.com/40/40/people/5" alt="People">
        </md-avatar>
      <h1>nome linea</h1>
    </div>-->

    <md-card class="md-layout-item md-size-50">
      <md-card-header>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-15">
            <md-avatar>
              <img :src="getImageFromId(idRoutes)" />
            </md-avatar>
          </div>
          <div class="md-layout-item md-size-85">
            <div class="md-title">{{$route.query.routeLongName}}</div>
            
          </div>
        </div>
      </md-card-header>
    </md-card>

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
              <!-- <span>{{accessibilita[n].wheelChairBoarding}}</span> -->
              <!-- <span>Orario previsto: {{accessibilita[n].wheelChairBoarding}}</span> -->
              <!-- <span>{{ritornaAccessibile(accessibilita[n])}}</span> -->
            </div>

            <md-icon class="md-primary" v-if="ritornaAccessibile(accessibilita,n) != 0">accessible</md-icon>
            <!-- <md-icon class="md-primary" v-if="ritornaAccessibile(accessibilita) != 0">accessible</md-icon> -->
            <!-- <md-icon class="md-primary">favorite_border</md-icon> -->
          </md-list-item>
        </template>

        <!--fermata non abilitata-->

        <template v-else>
          <md-list-item>
            <md-icon>directions_bus</md-icon>
            <div class="md-list-item-text">
              <span>{{nomeFermate[n]}}</span>
              <!-- <span>{{accessibilita[n].wheelChairBoarding}}</span> -->
            </div>
            <md-icon v-if="ritornaAccessibile(accessibilita,n) != 0">accessible</md-icon>
            <!-- <md-icon v-if="ritornaAccessibile(accessibilita[n]) != 0">accessible</md-icon> -->
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
    accessibile: [],
    idAgency: 12,
    idRoutes: null
  }),

  beforeCreate: function() {
    
    console.log(this.$route.params.id);
    console.log(this.$route.query.routeLongName);
  },
  created: function() {
    this.idRoutes = this.$route.params.id;
    //(idAgency,idRotes)
    Functions.getLineaSingolaConOrario(this.idAgency, this.$route.params.id)
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;
        console.log(
          "id fermate:" +
            this.idFermate.length +
            " nome fermate:" +
            this.nomeFermate.length
        );

        //la posizione di results.data.trips è la trip
        this.viaggi = results.data.trips[1].stopTimes;
      })
      .catch(error => {
        console.error(error);
      });

    Functions.getLineaSingolaAccessibilita(this.idAgency, this.idRoutes)
      .then(results2 => {
        this.accessibilita = results2.data;
        console.log("accessibilità" + " " + this.accessibilita.length);
        console.log(this.accessibilita);
        //console.log(this.accessibilita[23].wheelChairBoarding);
      })
      .catch(error => {
        console.log("accessibilità" + " " + this.accessibilita.length);
        console.error(error);
      });
  },
  methods: {
    
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },
    /* ritornaAccessibile(accessibile)
    {
      return accessibile.wheelChairBoarding;
    } */

    ritornaAccessibile(accessibilita, n) {
      for (let i = 0; i < accessibilita.length; i++) {
        if (this.idFermate[n] == accessibilita[i].id) {
          return accessibilita[i].wheelChairBoarding;
        } /* else {
          //dati per quella fermata non trovati
          //return 0;
          console.log("non va");
        } */
      }
    }
  }
};
</script>


<style>
</style>