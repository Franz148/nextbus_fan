<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed-last">
      <md-app-toolbar class="md-large md-dense md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button">
              <md-icon>directions_bus</md-icon>
            </md-button>

            <span class="md-title">
              NextBus
              <!-- <span v-if="isLoggedIn">
                - Ciao
                <b>{{verifiedUsername}}</b>!
              </span> -->
            </span>
          </div>
          <!-- <div class="md-toolbar-section-end">
            <md-button class="md-icon-button" @click="logout">
              <md-icon>exit_to_app</md-icon>
            </md-button>
          </div> -->
        </div>

        <div class="md-toolbar-row">
          <md-tabs class="md-primary" md-alignment="centered">
            <md-tab id="tab-pianifica" md-label="Pianifica" to="/pianifica"></md-tab>
            <md-tab id="tab-linee" md-label="Linee" to="/linee"></md-tab>
            <md-tab id="tab-preferiti" md-label="Preferiti" to="/preferiti"></md-tab>
          </md-tabs>
        </div>
      </md-app-toolbar>

      <md-app-content>
        
        <!-- Gestione accesso -->
        <md-dialog-prompt
          :md-active.sync="activeDialog"
          v-model="inserimentoNomeUtente"
          md-title="Come ti chiami?"
          md-input-maxlength="15"
          md-input-placeholder="Inserisci il tuo nome..."
          md-confirm-text="Inserisci"
          md-cancel-text="Annulla"
          v-if="!isLoggedIn"
          @md-confirm="login()"
        />

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
  margin-top: 20px;
}
</style>

<script>
import DbFunctions from "./database/db-functions.js";

export default {
  data: () => ({
    activeDialog: false,
    inserimentoNomeUtente: null,
    isLoggedIn: DbFunctions.isLoggedIn(),
    verifiedUsername: DbFunctions.getUsername()
   })
};
</script>
