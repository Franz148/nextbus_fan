<template>
  <div>
    <md-list>
      <div>
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{}}</span>
          </div>
        </md-list-item>
        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
import Functions from "./functions.js";

export default {
  data: () => ({
    linea: []
    /*idFermate: [],
    nomeFermate: [],
    viaggi: []*/
  }),
  
  methods: {
    /*funzioneProva(s){
      if(s == ""){
        return false;
      }
      else{
        return true;
      }
    }*/
  },

  created: function() {
    /*Functions.getLinee(12)
      .then(results => {
        this.linee = results.data;
      })
      .catch(error => {
        console.error(error);
      });*/

      /*Functions.getLineaSingolaConOrario(12, "10R")
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;
        this.viaggi = results.data.trips[0].stopTimes;
      })
      .catch(error => {
        console.log(error);
      });*/

      Functions.getLineaSingolaAccessibilita(12, "10R")
      .then(results => {
        this.linea = results.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>