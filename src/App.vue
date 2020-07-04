<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <img :src="require('./assets/NEXTBUS_LOGO.png')" width="150" />
          </div>
          <div class="md-toolbar-section-end">
            <span v-if="checkAutenticazione()">
              Ciao
              <b>{{getUsername()}}</b>!
            </span>
            <md-button class="md-icon-button" v-if="!checkAutenticazione()" @click="login()">
              <md-icon>account_circle</md-icon>
            </md-button>
            <md-button class="md-icon-button" v-if="checkAutenticazione()" @click="logout()">
              <md-icon>exit_to_app</md-icon>
            </md-button>
          </div>
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-alignment="centered" md-sync-route>
            <md-tab id="tab-pianifica" md-icon="explore" md-label="Pianifica" to="/pianifica"></md-tab>
            <md-tab id="tab-linee" md-icon="timeline" md-label="Linee" to="/linee"></md-tab>
            <md-tab id="tab-preferiti" md-icon="favorite" md-label="Preferiti" to="/preferiti"></md-tab>
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

.md-dialog-container {
  transform: scale(1) !important;
}

.margin {
  margin-top: 50px;
}
</style>

<script>
import Accesso from "./login/access-functions.js";

export default {
  data: () => ({}),
  methods: {
    checkAutenticazione() {
      return Accesso.isLoggedIn();
    },
    login() {
      this.$router.push("/accesso");
    },
    logout() {
      Accesso.logout();
      this.$router.go();
    },
    getUsername() {
      return Accesso.getUsername();
    }
  }
};
</script>
