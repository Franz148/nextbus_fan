<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- <md-button class="md-primary md-raised" @click="ordinaLinee">Ordina</md-button>  -->

    <md-list class="md-double-line md-layout-item md-size-50">
      <div v-for="linea in linee" :key="linea.id.id">
        <md-list-item
          :to="'/lineaSingola/' + linea.id.id + '?routeLongName='  + linea.routeLongName">
          <md-avatar>
            <img :src="getImageFromId(linea.id.id)" />
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{linea.routeLongName}}</span>
            <span>{{linea.routeShortName}}</span>
          </div>
          <md-button class="md-icon-button" @click="addFavoriteLine(linea.id.id, linea.preferiti)">
            <md-icon v-if="linea.preferiti==0">favorite_border</md-icon>
            <md-icon v-if="linea.preferiti==1">favorite</md-icon>
          </md-button>
          
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "../api/functions.js";
import DBFunction from "../database/db-functions.js";
import Accesso from "../login/access-functions.js";

export default {
  data: () => ({
    linee: []
  }),
  created: function() {
    Functions.getLinee(12)
      .then(results => {
        this.linee = results.data;
        this.addFavoriteField(this.linee);
        if (Accesso.isLoggedIn()) this.setFavorite(this.linee);
      })
      .catch(error => {
        console.error(error);
      });

  },

  methods: {
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },
    addFavoriteField(linee) {
      linee.forEach(item => {
        item.preferiti = 0;

      });
    },
    setFavorite(linee) {
      let lineePreferite = [];
      DBFunction.getLineePreferite().then(results => {
        lineePreferite = results;
        console.log(linee);
        console.log(lineePreferite);
        for (let i = 0; i < linee.length; i++ ){
          for (let i2 = 0; i2 < lineePreferite.length; i++ ){
              if(linee[i].id.id == lineePreferite[i2].idLinea){
                linee[i].preferiti=1;
              }

          }
         
        }

      });
    },
    addFavoriteLine(id,preferiti){
      if (!Accesso.isLoggedIn()) 
        this.$router.push("/accesso");

      if (preferiti==0){
        DBFunction.setLineaPreferita(id);
        this.$router.go();
      };
    
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