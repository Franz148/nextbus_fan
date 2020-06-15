<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <md-card class="md-layout-item md-xsmall-size-90 md-small-size-80 md-size-60" md-with-hover>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">Lista dei preferiti</div>
            <div class="md-subhead">
              Fermate e linee preferite
              <md-icon>favorite</md-icon>verranno visualizzate qui
            </div>
          </md-card-header-text>

          <md-menu md-size="medium" md-align-trigger>
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>more_vert</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>Filtro 1</md-menu-item>
              <md-menu-item>Filtro 2</md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>

        <md-card-content class="content">
          <md-tabs class="tabs" md-alignment="centered">
            <md-tab id="tab-preferiti-fermate" md-label="Fermate">
              <p>
                Fermate Favorites tab
                
              </p>
            </md-tab>
            <md-tab id="tab-preferiti-linee" md-label="Linee">
              <p>
                Linee Favorites tab
              </p>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content {
  padding: 0;
}
</style>