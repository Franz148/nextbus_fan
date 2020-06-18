<template>
  <div>
    <md-list>
      <div v-for="linea in linee" :key="linea.id.id">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{linea.routeLongName}}</span>
            <span>{{linea.routeShortName}}</span>
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
  }
};
</script>

<style>
</style>