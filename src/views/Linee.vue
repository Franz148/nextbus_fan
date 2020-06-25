<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- <md-button class="md-primary md-raised" @click="ordinaLinee">Ordina</md-button>  -->

    <md-list class="md-double-line md-layout-item md-size-50">
      <div v-for="linea in linee" :key="linea.id.id">
        <md-list-item :to="'/lineaSingola/' + linea.id.id + '?routeLongName='  + linea.routeLongName">
          <md-avatar>
            <img :src="getImageFromId(linea.id.id)" />
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{linea.routeLongName}}</span>
            <span>{{linea.routeShortName}}</span>
          </div>
         <md-button class="md-icon-button"> <md-icon >favorite_border</md-icon> </md-button> 
         <!-- <md-button class="md-icon-button"> <md-icon >favorite</md-icon> </md-button>  -->
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "../api/functions.js";

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
  },

  methods: {
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    }
  }

//   ordinaLinee() { let confronta = (a, b) => {
//   const nameRouteA = a.id.id.toUpperCase();
//  const nameRouteB = b.id.id.toUpperCase();

// let comparison = 0;
//   if (nameRouteA > nameRouteB) {
//    comparison = 1;
//      } else if (nameRouteA < nameRouteB) {
//         comparison = -1;
//      }
//       return comparison;
//  }
//       this.linee.sort(confronta);
//    console.log(this.linee);
//      }
  
 };
</script>

<style>
</style>