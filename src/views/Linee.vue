<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <!-- Elemento switch per andata e ritorno -->
    <div class="md-layout-item md-size-80 md-layout md-alignment-center-center">
      <label>Andata</label>
      <md-switch v-model="valoreSwitch">Ritorno</md-switch>
    </div>

    <!-- Lista delle linee, che selezionando passa a linea singola l'id della linea e il long name -->
    <md-list class="md-double-line md-layout-item md-size-50">
      <div v-for="(linea, i) in linee" :key="linea.id.id" v-bind:class="sceltaAR(linea.id.id)">
        <md-list-item
          :to="'/lineaSingola/' + linea.id.id + '?routeLongName='  + linea.routeLongName"
        >
          <!-- Avatar che prende dalla cartella assets/iconeLinee chiamate come l'id delle linee a cui appartengono -->
          <md-avatar>
            <img :src="getImageFromId(linea.id.id)" />
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{linea.routeLongName}}</span>
            <span>{{linea.routeShortName}}</span>
          </div>

          <!-- Icona cuore che toglie la linea ai preferiti, prevent serve per non entrare nella linea singola -->
          <md-button
            class="md-icon-button"
            @click.stop.prevent="addFavoriteLine(linea.id.id, linea.preferiti,i)"
            v-if="!linea.preferiti"
          >
            <md-icon>favorite_border</md-icon>
          </md-button>
          <!-- Icona cuore che mette la linea nei preferiti -->
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
    linee: [],
    //di default mostra l'andata
    valoreSwitch: false
  }),
  created: function() {
    Functions.getLinee(12).then(results => {
      this.linee = results.data;
      this.addFavoriteField(this.linee);
      //si può aggiungere una linea nei preferiti solo se è stato fatto l'accesso
      if (Accesso.isLoggedIn()) this.setFavorite(this.linee);
      console.log(this.linee);
    });
    this.ordinaLinee();
  },

  methods: {
    getImageFromId(id) {
      return require("../assets/iconeLinee/" + id + ".png");
    },
    addFavoriteField(linee) {
      linee.forEach(item => {
        //mostra di default i cuori vuoti, anche se non è stato fatto l'accesso
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
    addFavoriteLine(id, preferiti, i) {
      //se si vuole aggiungere una linea ai preferiti, ma non si è loggati si indirizza alla pagina di accesso
      if (!Accesso.isLoggedIn()) this.$router.push("/accesso");

      if (preferiti == 0) {
        DBFunction.setLineaPreferita(id).then(() => {
          //imposta il parametro preferiti a 1, quindi mostra il cuore pieno e lo aggiunge al DB
          this.$set(this.linee[i], "preferiti", 1);
        });
      } else if (preferiti == 1) {
        DBFunction.rimuoviLineaPreferita(id).then(() => {
          //imposta il parametro preferiti a 0, quindi mostra il cuore pieno e lo toglie al DB
          this.$set(this.linee[i], "preferiti", 0);
        });
      }
    },
    sceltaAR(id) {
      let classi = [];
      if (this.valoreSwitch) {
        if (id.indexOf("A") != -1 || id == "02") {
          //nasconde le linee che nell'id contengono "A"
          classi.push("md-hide");
        }
      } else {
        if (id.indexOf("R") != -1) {
          //nasconde le linee che nell'id contengono "R"
          classi.push("md-hide");
        }
      }

      return classi;
    }
  },
  ordinaLinee() {
    console.log(this.linee);
    let confronta = (a, b) => {
      const nameRouteA = a.routeShortName.toUpperCase();
      const nameRouteB = b.routeShortName.toUpperCase();

      let comparison = 0;
      if (nameRouteA > nameRouteB) {
        comparison = 1;
      } else if (nameRouteA < nameRouteB) {
        comparison = -1;
      }
      return comparison;
    };
    this.linee.sort(confronta);
    console.log(this.linee);
  }
};
</script>

<style>
.md-switch {
  display: flex;
}
</style>