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
          <md-tabs class="md-primary" md-alignment="centered" md-sync-route> 
            <md-tab id="tab-pianifica" md-label="Pianifica" to="/pianifica"></md-tab>
            <md-tab id="tab-linee" md-label="Linee" to="/linee"></md-tab>
            <md-tab id="tab-preferiti" md-label="Preferiti" to="/preferiti"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view class="margin"></router-view>        
      </md-app-content>
    </md-app>
  </div>
</template>

<style>

.md-app-toolbar {
  z-index: 900 !important;
}

.md-app {
  width: 100%;
  height: 100vh;
}

.md-tabs {
  width: 100%;
}

.margin {
  margin-top: 20px;
}

</style>

<script>
export default {
  data: () => ({
  })
};
</script>
