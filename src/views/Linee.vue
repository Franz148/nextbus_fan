<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- <md-button class="md-primary md-raised" @click="ordinaLinee">Ordina</md-button> -->
    <md-button class="md-primary md-raised" @click="mostraIconeLinee">Mostra</md-button>
    <md-list class="md-double-line md-layout-item md-size-50">
      <div v-for="linea in linee" :key="linea.id.id">
        <md-list-item :to="'/fermata/' + linea.id.id">
          <md-avatar></md-avatar>
          <div class="md-list-item-text">
            <span>{{linea.id.id}}</span>
            <span>{{linea.routeLongName}}</span>
          </div>
          <md-icon>favorite_border</md-icon>
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "../api/functions.js";
import "../database/db-functions.js";
import dbFunctions from '../database/db-functions.js';



export default {

  data: () => ({
    linee: []
  }),
  created: function() {
    Functions.getLinee(12)
      .then(results => {
        this.linee = results.data;
      })
      .catch(error => {
        console.error(error);
      });

      dbFunctions.mostraIconeLinee("10R")
      .then  (data => {
        data.forEach(doc => {
          console.log(doc.data());
        });
      });
  }
  
  // methods: {
  //   ordinaLinee() { let confronta = (a, b) => {
  //     const nameRouteA = a.id.id.toUpperCase();
  //     const nameRouteB = b.id.id.toUpperCase();

  //     let comparison = 0;
  //     if (nameRouteA > nameRouteB) {
  //       comparison = 1;
  //     } else if (nameRouteA < nameRouteB) {
  //       comparison = -1;
  //     }
  //     return comparison;
  //   }
  //     this.linee.sort(confronta);
  //     console.log(this.linee);
  //   }
  // }
};
</script>

<style>
</style>