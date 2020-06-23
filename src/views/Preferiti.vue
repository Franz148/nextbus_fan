<template>
  <div>
    <div class="md-layout md-alignment-center-center">
      <md-empty-state
        md-icon="account_circle"
        md-label="Visualizza i tuoi preferiti"
        md-description="Per poter salvare fermate e linee preferite devi effettuare l'accesso"
        v-if="!checkAutenticazione()"
      >
        <md-button class="md-primary md-raised" to="/accesso">Accedi</md-button>
      </md-empty-state>

      <md-card class="md-layout-item md-xsmall-size-90 md-small-size-80 md-size-60" v-if="checkAutenticazione()" md-with-hover>
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
              <md-list>
                <div>
                  <!-- Inserire il :v-for qui per far in modo che sia incluso anche il <divider> -->
                  <md-list-item>
                    <md-avatar>
                      <img
                        src="https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      />
                    </md-avatar>
                    <span class="md-list-item-text"><!--Fermata {{n}}--></span>

                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-accent">favorite</md-icon>
                    </md-button>
                  </md-list-item>
                  <md-divider></md-divider>
                </div>
              </md-list>
            </md-tab>

            <md-tab id="tab-preferiti-linee" md-label="Linee">
              <md-list>
                <div>
                  <!-- Inserire il :v-for qui per far in modo che sia incluso anche il <divider> -->
                  <md-list-item>
                    <md-avatar>
                      <img
                        src="https://images.unsplash.com/photo-1528731708534-816fe59f90cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                      />
                    </md-avatar>
                    <span class="md-list-item-text"><!--Linea {{n}}--></span>

                    <md-button class="md-icon-button md-list-action">
                      <md-icon class="md-accent">favorite</md-icon>
                    </md-button>
                  </md-list-item>
                  <md-divider></md-divider>
                </div>
              </md-list>
            </md-tab>
          </md-tabs>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>

import Accesso from "../login/access-functions.js";

export default {
  data: () => ({
    
  }),
  methods: {
    checkAutenticazione(){
      return Accesso.isLoggedIn();
    }
  }
};
</script>

<style>
</style>