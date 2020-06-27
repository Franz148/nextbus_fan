<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- <md-button class="md-primary md-raised" @click="ordinaLinee">Ordina</md-button>  -->
    <md-list class="md-double-line md-layout-item md-size-50">
      <div v-for="(linea, i) in linee" :key="linea.id.id">
        <md-list-item
          :to="'/lineaSingola/' + linea.id.id + '?routeLongName='  + linea.routeLongName"
        >
          <md-avatar>
            <img :src="getImageFromId(linea.id.id)" />
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{linea.routeLongName}}</span>
            <span>{{linea.routeShortName}}</span>
          </div>
          <md-button
            class="md-icon-button"
            @click.stop.prevent="addFavoriteLine(linea.id.id, linea.preferiti,i)"
            v-if="!linea.preferiti"
          >
            <md-icon>favorite_border</md-icon>
          </md-button>

          <md-button
            class="md-icon-button md-primary"
            @click.stop.prevent="addFavoriteLine(linea.id.id, linea.preferiti,i)"
            v-if="linea.preferiti"
          >
            <md-icon>favorite</md-icon>
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
    Functions.getLinee(12).then(results => {
      this.linee = results.data;
      this.addFavoriteField(this.linee);
      if (Accesso.isLoggedIn()) this.setFavorite(this.linee);
      console.log(this.linee);
    });
  },

  methods: {
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },
    addFavoriteField(linee) {
      linee.forEach(item => {
        this.$set(item, "preferiti", 0);
      });
    },
    setFavorite(linee) {
      let lineePreferite = [];
      DBFunction.getLineePreferite().then(results => {
        lineePreferite = results;
        for (let i = 0; i < linee.length; i++) {
          for (let i2 = 0; i2 < lineePreferite.length; i2++) {
            if (linee[i].id.id == lineePreferite[i2].idLinea) {
              this.$set(linee[i], "preferiti", 1);
            }
          }
        }
      });
    },
    addFavoriteLine(id, preferiti, i ) {
      if (!Accesso.isLoggedIn()) this.$router.push("/accesso");

      if (preferiti == 0) {
        DBFunction.setLineaPreferita(id).then(() => {
          this.$set(this.linee[i], "preferiti", 1);
        });

      }
      else if (preferiti == 1) {
        DBFunction.rimuoviLineaPreferita(id).then(() => {
          this.$set(this.linee[i], "preferiti", 0);
        });
      }
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