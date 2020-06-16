<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button">
              <md-icon>directions_bus</md-icon>
            </md-button>

            <span class="md-title">NextBus</span>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-alignment="centered">
            <md-tab id="tab-pianifica" md-label="Pianifica"></md-tab>
            <md-tab id="tab-fermate" md-label="Fermate"></md-tab>
            <md-tab id="tab-linee" md-label="Linee"></md-tab>
            <md-tab id="tab-preferiti" md-label="Preferiti"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view></router-view>        
      </md-app-content>
    </md-app>
  </div>
</template>

<style>

.md-app {
  width: 100%;
  height: 100vh;
}

.md-tabs {
  width: 100%;
}

</style>

<script>
export default {
  data: () => ({
  })
};
</script>
