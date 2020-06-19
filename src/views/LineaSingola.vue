<template>

  <div class="md-layout md-gutter md-alignment-center-center">
    <md-list class="md-layout-item md-size-50">
       <div v-for="n in idFermate.length" :key="idFermate[n]">
             
             <md-list-item>
        <md-icon class="md-primary">phone</md-icon>

        <div class="md-list-item-text">
          <span>{{nomeFermate[n]}}</span>
          <span>Orario previsto: {{viaggi[n]}}</span>
        </div>
 
        <md-button class="md-icon-button md-list-action">
          <md-icon>sms</md-icon>
        </md-button>
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
    idFermate:[],
    nomeFermate:[],
    viaggi:[]
  }),
  created: function() {
      //(idAgency,idRotes)
    Functions.getLineaSingolaConOrario(12,"10R")
      .then(results => {
        this.idFermate = results.data.stopIds;
        this.nomeFermate = results.data.stopNames;

        //la posizione di results.data.trips è la trip
        this.viaggi = results.data.trips[1].stopTimes;
      })
      .catch(error => {
        console.error(error);
      });
  }

}
</script>


<style>

</style>