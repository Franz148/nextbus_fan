<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-50 md-small-size-80 md-xsmall-size-100">
      <md-card-header>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-15">
            <md-avatar>
              <img :src="getImageFromId(idRoutes)" />
            </md-avatar>
          </div>
          <div class="md-layout-item md-size-75">
            <div class="md-title">{{$route.query.routeLongName}}</div>
          </div>
          
          <div class="md-layout-item md-size-10">
            <md-button
              class="md-icon-button"
              @click.stop.prevent="addFavoriteLine(idRoutes, preferito)"
              v-if="!preferito"
            >
              <md-icon>favorite_border</md-icon>
            </md-button>

            <md-button
              class="md-icon-button md-primary"
              @click.stop.prevent="addFavoriteLine(idRoutes, preferito)"
              v-if="preferito"
            >
              <md-icon>favorite</md-icon>
            </md-button>
          </div>
        </div>
      </md-card-header>
      <!--  -->
      <md-card-expand v-show="mostra">
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button
              v-bind:disabled="isButtonPrecedenteDisabled"
              v-on:click="precedente"
            >Precedente</md-button>
          </div>
          <!--  SELECT -->
          <div class="md-layout-item md-size-50">
            <md-field>
              <!--  -->
              <label>Partenza alle</label>
              <!--  -->
              <md-select v-model="selezionato">
                <md-option
                  v-for="(item,index) in orariPartenzaLinea"
                  v-bind:key="index"
                  :value="index"
                >{{item}}</md-option>
              </md-select>
            </md-field>
          </div>
          <!--  -->
          <div>
            <md-button v-bind:disabled="isButtonSuccessivoDisabled" @click="successivo">Successivo</md-button>
          </div>
        </md-card-actions>
      </md-card-expand>
    </md-card>

    <!--AVVISO ORARI NON DISPONIBILI-->
    <div class="md-layout-item md-size-100" v-show="orariNonDisponibili">
      <md-empty-state
      class="md-accent"
      md-icon="search_off"
      md-label="Orari non disponibili"
      md-description="Oggi non passa nessun autobus su questa linea.">
    </md-empty-state>
    </div>

    <md-list class="md-layout-item md-size-50 md-small-size-80 md-xsmall-size-100">
      <div v-for="(id,n) in idFermate" :key="n">
        <!--FERMATA DOVE PASSA IL BUS-->
        <!--passa se orari[n] != '' -->
        <div v-if="orari[n] !=''">
          <md-list-item>
            <md-icon class="md-primary">directions_bus</md-icon>
            <div class="md-list-item-text">
              <span>{{nomeFermate[n]}}</span>
              <span>Orario previsto: {{orari[n]}}</span>
            </div>
            <!-- 0=non accessibile, 1 accessibile,2 non si hanno informazioni-->
            <md-icon class="md-primary" v-if="ritornaAccessibile(accessibilita,n) ==1">accessible</md-icon>
          </md-list-item>
        </div>

        <!--FERMATA DOVE NON PASSA IL BUS-->
        <div v-else>
          <md-list-item>
            <md-icon class="iconaDisattivata">directions_bus</md-icon>
            <div class="md-list-item-text">
              <span class="testoDisattivato">{{nomeFermate[n]}}</span>
            </div>
            <md-icon  class="iconaDisattivata" v-if="ritornaAccessibile(accessibilita,n) ==1">accessible</md-icon>
          </md-list-item>
        </div>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "../api/functions.js";
/*  */
import DBFunction from "../database/db-functions.js";
import Accesso from "../login/access-functions.js";
/*  */
export default {
  data: () => ({
    idFermate: [],
    nomeFermate: [],
    orari: [],
    accessibilita: [],
    accessibile: [],
    idAgency: 12,
    idRoutes: null,
    viaggi: [],
    current: 0,
    isButtonPrecedenteDisabled: true,
    isButtonSuccessivoDisabled: false,
    orariNonDisponibili: false,
    orariPartenzaLinea: [],
    selezionato: 0, //all'inizio mostro la prima trip
    preferito: false,
    mostra:true
  }),

  created: function() {
    //SOSTITUISCO GLI ID INESISTENTI PASSATI DA LINEE
    switch (this.$route.params.id) {
      case "1A":
        this.idRoutes = "01A";
        break;
      case "1R":
        this.idRoutes = "01R"; 
        break;
      case "02":
        this.idRoutes = "02C";
        break;
      case "_A":
        this.idRoutes = "%20AC"; //NON VA
        break;
      case "FUTSR":
        this.idRoutes = "FunR";
        break;
      case "FUTSA":
        this.idRoutes = "FunA";
        break;
      case "GR":
        this.idRoutes = "%20GR"; //NON VA
        break;
      case "GA":
        this.idRoutes = "%20GA"; //NON VA
        break;
      case "NPA":
        this.idRoutes = "NPC";
        break;

      default:
        this.idRoutes = this.$route.params.id;
    }

    if (Accesso.isLoggedIn()) {
      DBFunction.getLineaSingolaPreferita(this.idRoutes)
        .then(results3 => {
          if (results3.length != 0) this.preferito = true;
        })
        .catch(error => {
          console.error(error);
        });
    }

    Functions.getLineaSingolaConOrario(this.idAgency, this.idRoutes)
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;
        //la posizione di results.data.trips è l'array di trips
        this.viaggi = results.data.trips;
        //all'avvio carico di default gli orari del primo viaggio
        this.orari = this.viaggi[0].stopTimes;
        //console.log(this.orari);
        this.caricoArraySelect(this.viaggi);
      })
      .catch(error => {
        console.error(error);
        // orari non disponibili perchè l'array è vuoto
        this.orariNonDisponibili = true;
        this.mostra=false;
        //this.isButtonSuccessivoDisabled = true;
        //this.isButtonPrecedenteDisabled = true;
      });

    Functions.getLineaSingolaAccessibilita(this.idAgency, this.idRoutes)
      .then(results2 => {
        this.accessibilita = results2.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  methods: {
    getImageFromId(id) {
      switch (id) {
        case "01A":
          id = "1A";
          break;
        case "01R":
          id = "1R";
          break;
        case "02C":
          id = "02";
          break;
        case "%20AC":
          id = "_A";
          break;
        case "FunR":
          id = "FUTSR";
          break;
        case "FunA":
          id = "FUTSA";
          break;
        case "%20GR":
          id = "GR";
          break;
        case "%20GA":
          id = "GA";
          break;
        case "NPC":
          id = "NPA";
          break;
      }
      return require("../assets/iconeLinee/" + id + ".png");
    },

    caricoArraySelect(viaggi) {
      //carico array degli orari primi nella lista di ogni trip per metterli nel select
      let j = 0;
      for (let i = 0; i < viaggi.length; i++) {
        while (viaggi[i].stopTimes[j] == "") {
          j++;
        }
        this.orariPartenzaLinea.push(viaggi[i].stopTimes[j]);
        j = 0;
      }
    },

    ritornaAccessibile(accessibilita, n) {
      //ritorna il valore di .wheelChairBoarding dello stesso id della fermata
      for (let i = 0; i < accessibilita.length; i++) {
        if (this.idFermate[n] == accessibilita[i].id) {
          return accessibilita[i].wheelChairBoarding;
        }
      }
    },

    precedente() {
      //visualizza la trip precedente
      this.current -= 1;
      if (this.current <= 0) {
        this.current = 0;
        this.isButtonPrecedenteDisabled = true;
      } else {
        this.isButtonSuccessivoDisabled = false;
      }
      this.orari = this.viaggi[this.current].stopTimes;
      this.selezionato = this.current;
    },

    successivo() {
      //visualizza la trip successiva
      this.current += 1;
      if (this.current >= this.viaggi.length - 1) {
        this.current = this.viaggi.length - 1;
        this.isButtonSuccessivoDisabled = true;
      } else {
        this.isButtonPrecedenteDisabled = false;
      }
      this.orari = this.viaggi[this.current].stopTimes;
      this.selezionato = this.current;
    },

    addFavoriteLine(id, preferiti) {
      //aggiunge ai preferiti la linea visualizzata
      if (!Accesso.isLoggedIn()) this.$router.push("/accesso");
      if (preferiti == false) {
        DBFunction.setLineaPreferita(id).then(() => {
          this.preferito = true;
        });
      } else if (preferiti == true) {
        DBFunction.rimuoviLineaPreferita(id).then(() => {
          this.preferito = false;
        });
      }
    }
  },

  watch: {
    selezionato: function() {
      //controllo il cambiamento della trip selezionata
      this.current = this.selezionato;
      this.orari = this.viaggi[this.current].stopTimes;
      if (this.current == 0) {
        this.isButtonPrecedenteDisabled = true;
        this.isButtonSuccessivoDisabled = false;
      }
      if (this.current == this.viaggi.length - 1) {
        this.isButtonSuccessivoDisabled = true;
        this.isButtonPrecedenteDisabled = false;
      }
    }
  }
};
</script>

<style scoped>

.iconaDisattivata, .testoDisattivato {
  color: lightgray !important;
}

</style>