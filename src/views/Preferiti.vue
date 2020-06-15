<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <md-card class="md-layout-item md-xsmall-size-90 md-small-size-80 md-size-60" md-with-hover>
        <md-card-header class="md-layout">
          <div class="md-layout-item md-size-90"></div>
          <md-menu md-size="small" md-align-trigger>
            <md-button class="md-icon-button" md-menu-trigger>
              <md-icon>filter_list</md-icon>
            </md-button>

            <md-menu-content>
              <md-menu-item>Filtro 1</md-menu-item>
              <md-menu-item>Filtro 2</md-menu-item>
              <md-menu-item>Filtro 3</md-menu-item>
            </md-menu-content>
          </md-menu>
        </md-card-header>
        <md-card-content>
          <md-tabs class="tabs" md-alignment="centered">
            <md-tab id="tab-preferiti-fermate" md-label="Fermate">
              <p>
                Fermate Favorites tab <br><br>
                Maiores, dolorum. Beatae, optio tempore fuga odit aperiam velit, consequuntur magni inventore sapiente alias sequi odio qui harum dolorem sunt quasi corporis.
              </p>
            </md-tab>
            <md-tab id="tab-preferiti-linee" md-label="Linee">
              <p>
                Linee Favorites tab <br><br>
                Maiores, dolorum. Beatae, optio tempore fuga odit aperiam velit, consequuntur magni inventore sapiente alias sequi odio qui harum dolorem sunt quasi corporis.
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
</style>