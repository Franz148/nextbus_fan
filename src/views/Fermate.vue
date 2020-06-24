<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <md-list class="md-layout-item md-size-50">
      <md-list class="md-layout-item md-size-80">
       <div v-for="fermata in linea" :key="fermata.id">
       <md-divider></md-divider>
        <md-list-item>
       <md-icon>directions_bus</md-icon>

       <span class="md-list-item-text">{{fermata.name}}</span>

        <md-icon class="md-primary" v-if="fermata.wheelChairBoarding == 1">accessible</md-icon>
       <md-icon class="md-primary">favorite_border</md-icon>
          </md-list-item>
         </div>
        </md-list>
      <md-divider></md-divider>
      <md-list-item>
     

     
    </md-list>
  </div>
</template>

<script>
export default {
  
};
</script>

<style>
</style>