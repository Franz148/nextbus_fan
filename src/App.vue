<template>
  <div id="app">
    <!-- NEXTBUS -->
    <md-app md-waterfall md-mode="fixed-last">
      <!-- TOOLBAR A DOPPIA RIGA -->
      <md-app-toolbar class="md-large md-dense md-primary">
        <!-- PRIMA RIGA = LOGO NEXTBUS + ICONE LOGIN / LOGOUT -->
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <img :src="require('./assets/NEXTBUS_LOGO.png')" width="150" />
          </div>
          <div class="md-toolbar-section-end">

            <!-- Gestione visualizzazione nome e icona se si è fatto l'accesso -->
            <span v-show="checkAutenticazione()">
              Ciao
              <b>{{getUsername()}}</b>!
            </span>
            <md-button class="md-icon-button" v-if="checkAutenticazione()" @click="logout()">
              <md-icon>exit_to_app</md-icon>
            </md-button>
            <md-button class="md-icon-button" v-else @click="login()">
              <md-icon>account_circle</md-icon>
            </md-button>
          </div>
        </div>

        <!-- SECONDA RIGA = TABS SINCRONIZZATE CON IL ROUTER -->
        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-alignment="centered" md-sync-route>
            <md-tab id="tab-pianifica" md-icon="explore" md-label="Pianifica" to="/pianifica"></md-tab>
            <md-tab id="tab-linee" md-icon="timeline" md-label="Linee" to="/linee"></md-tab>
            <md-tab id="tab-preferiti" md-icon="favorite" md-label="Preferiti" to="/preferiti"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <!-- CONTENUTO DELL'APP E ROUTER VIEW -->
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

/* APP a pieno schermo */
.md-app {
  width: 100%;
  height: 100vh;
}

/* Estensione delle tabs in modo che ci sia una corretta visualizzazione */
.md-tabs {
  width: 100%;
}

/* Risoluzione problema dovuto al dialog non centrato */
.md-dialog-container {
  transform: scale(1) !important;
}

/* Margine superiore ad ogni router view */
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
