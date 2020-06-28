<template>
  <div class="md-layout md-gutter md-alignment-center-center">
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
      <md-card-expand>
        <md-card-actions md-alignment="space-between">
          <div>
            <md-button
              v-bind:disabled="isButtonPrecedenteDisabled"
              v-on:click="precedente"
            >Precedente</md-button>
          </div>
          <!--  SELECT -->
          <div class="md-layout-item">
            <md-field>
              <md-select v-model="selezionato" :key="componentKey">
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
      <span>Orari non disponibili</span>
    </div>

    <md-list class="md-layout-item md-size-50">
      <div v-for="(id,n) in idFermate" :key="idFermate[n]">
        <!--FERMATA DOVE PASSA IL BUS-->
        <!--passa se orari[n] != '' -->
        <template v-if="orari[n] !=''">
          <md-list-item>
            <md-icon class="md-primary">directions_bus</md-icon>
            <div class="md-list-item-text">
              <span>{{nomeFermate[n]}}</span>
              <span>Orario previsto: {{orari[n]}}</span>
            </div>
            <!-- 0=non accessibile, 1 accessibile,2 non si hanno informazioni-->
            <md-icon class="md-primary" v-if="ritornaAccessibile(accessibilita,n) ==1">accessible</md-icon>
          </md-list-item>
        </template>

        <!--FERMATA DOVE NON PASSA IL BUS-->
        <template v-else>
          <md-list-item>
            <md-icon>directions_bus</md-icon>
            <div class="md-list-item-text">
              <span>{{nomeFermate[n]}}</span>
              <!-- <span>{{ritornaAccessibile(accessibilita,n)}}</span> -->
            </div>
            <md-icon v-if="ritornaAccessibile(accessibilita,n) ==1">accessible</md-icon>
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
    selezionato: 0, //valore che deve mostrare all'inizio
    componentKey: 0
  }),

  beforeCreate: function() {
    console.log(this.$route.params.id);
    //console.log(this.$route.query.routeLongName);
    //this.orari=this.viaggi[0].stopTimes;
  },
  created: function() {
    //this.idRoutes = this.$route.params.id;
    //SOSTITUISCO GLI ID INESISTENTI PASSATI DA LINEE
    switch (this.$route.params.id) {
      case "1A":
        this.idRoutes = "01A";
        break;
      case "1R":
        this.idRoutes = "01R"; //{"stopIds":null,"stopNames":null,"trips":[]}
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

    Functions.getLineaSingolaConOrario(this.idAgency, this.idRoutes)
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;

        //la posizione di results.data.trips è l'array di trips
        console.log(results.data.trips.length);
        this.viaggi = results.data.trips;
        console.log(this.viaggi);
        //all'avvio carico di default gli orari del primo viaggio
        this.orari = this.viaggi[0].stopTimes;
        //console.log(this.orari);
        this.caricoArraySelect(this.viaggi);
      })
      .catch(error => {
        console.error(error);
        // orari non disponibili perchè l'array è vuoto
        this.orariNonDisponibili = true;
        this.isButtonSuccessivoDisabled=true;
        this.isButtonPrecedenteDisabled=true;
      });

    Functions.getLineaSingolaAccessibilita(this.idAgency, this.idRoutes)
      .then(results2 => {
        this.accessibilita = results2.data;
        /* console.log("accessibilità" + " " + this.accessibilita.length);
        console.log(this.accessibilita); */
      })
      .catch(error => {
        console.log("accessibilità" + " " + this.accessibilita.length);
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
      //carico array orari primi nella lista di ogni trip
      let j = 0;
      for (let i = 0; i < viaggi.length; i++) {
        while (viaggi[i].stopTimes[j] == "") {
          j++;
        }
        this.orariPartenzaLinea.push(viaggi[i].stopTimes[j]);
        j = 0;
      }
      console.log(this.orariPartenzaLinea);
      /* this.selezionato=this.orariPartenzaLinea[0]; */
    },

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
    },
    precedente() {
      this.current -= 1;
      if (this.current <= 0) {
        this.current = 0;
        this.isButtonPrecedenteDisabled = true;
      } else {
        this.isButtonSuccessivoDisabled = false;
      }
      this.orari = this.viaggi[this.current].stopTimes;
      this.selezionato = this.current;
      console.log("precedente");
      console.log(this.current);
    },
    successivo() {
      this.current += 1;
      if (this.current >= this.viaggi.length - 1) {
        this.current = this.viaggi.length - 1;
        this.isButtonSuccessivoDisabled = true;
      } else {
        this.isButtonPrecedenteDisabled = false;
      }
      this.orari = this.viaggi[this.current].stopTimes;
      this.selezionato = this.current;
      console.log("successivo");
      console.log(this.current);
    }
  },
  watch: {
    selezionato: function() {
      console.log("selezionato " + this.selezionato);
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

<style>
</style>