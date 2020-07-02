<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <div class="md-layout-item md-layout md-alignment-center-center md-size-100">
      <md-tabs v-model="valoreAR" md-alignment="fixed">
        <md-tab id="tab-andata" md-label="ANDATA" @click="valoreAR = false"></md-tab>
        <md-tab id="tab-ritorno" md-label="RITORNO" @click="valoreAR = true"></md-tab>
      </md-tabs>
      <div class="md-layout-item md-size-5">
        <br/>
        <md-progress-spinner md-mode="indeterminate" v-show="activeSpinner"></md-progress-spinner>
      </div>
    </div>

    <!-- Lista delle linee, che selezionando passa a linea singola l'id della linea e il long name -->
    <md-list class="md-double-line md-layout-item md-size-50 md-xsmall-size-100">
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

    <md-snackbar :md-active.sync="showSBadd" md-persistent>
      <span>
        La
        <b>linea {{testoSnackbar}}</b> è stata aggiunta ai preferiti.
      </span>
    </md-snackbar>

    <md-snackbar :md-active.sync="showSBremove" md-persistent>
      <span>
        La
        <b>linea {{testoSnackbar}}</b> è stata rimossa dai preferiti.
      </span>
    </md-snackbar>
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
    valoreAR: false,
    testoSnackbar: "",
    showSBadd: false,
    showSBremove: false,
    activeSpinner: true
  }),
  created: function() {
    Functions.getLinee(12).then(results => {
      this.linee = results.data;
      this.ordinaLinee();
      this.addFavoriteField(this.linee);
      //si può aggiungere una linea nei preferiti solo se è stato fatto l'accesso
      if (Accesso.isLoggedIn()) this.setFavorite(this.linee);
      this.activeSpinner= false;
    });
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
        for (let i2 = 0; i2 < lineePreferite.length; i2++) {
          let elementoPreferito = linee.find(
            linea => linea.id.id == lineePreferite[i2].idLinea
          );
            this.$set(elementoPreferito, "preferiti", 1);
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

          this.testoSnackbar = this.linee[i].routeShortName;
          this.showSBadd = true;
        });
      } else if (preferiti == 1) {
        DBFunction.rimuoviLineaPreferita(id).then(() => {
          //imposta il parametro preferiti a 0, quindi mostra il cuore pieno e lo toglie al DB
          this.$set(this.linee[i], "preferiti", 0);

          this.testoSnackbar = this.linee[i].routeShortName;
          this.showSBremove = true;
        });
      }
    },
    sceltaAR(id) {
      let classi = [];
      if (this.valoreAR) {
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
    },
    //funzione che ordina in ordine alfabetico dell'id le linee
    //creo variabile temporanea per cambio id di 1 con 01 così è il primo della lista
    ordinaLinee() {
      console.log(this.linee);
      let confronta = (a, b) => {
        let tmpB = b.id.id.toUpperCase();

        if (b.id.id == "1A") {
          tmpB = "01A";
        } else if (b.id.id == "1R") {
          tmpB = "01R";
        }

        const nameRouteA = a.id.id.toUpperCase();
        const nameRouteB = tmpB;

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
  }
};
</script>

<style>
</style>