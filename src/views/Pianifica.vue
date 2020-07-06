<template>
  <div class="md-layout md-alignment-top-center">
    <!-- FORM INSERIMENTO DATI DEL PIANIFICA -->
    <form
      novalidate
      class="md-layout md-alignment-center-center md-layout-item md-small-size-80 md-xsmall-size-90"
      :class="{'md-size-60': !sending, 'md-size-40': sending}"
      @submit.prevent="submit()"
    >
      <md-card class="md-layout-item md-size-90">
        <md-card-header>
          <div class="md-title">Pianifica il tuo viaggio</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-alignment-center-center">
            <div class="md-layout-item md-size-100">
              <label class="md-subheading">Partenza</label>
              <md-field :class="getValidationClass('indirizzoP')">
                <label>Luogo, indirizzo...</label>
                <md-input v-model="form.indirizzoP"></md-input>

                <span
                  class="md-error"
                  v-if="!$v.form.indirizzoP.required"
                >L'indirizzo di partenza è necessario</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.indirizzoP.minlength"
                >Devi inserire almeno 5 caratteri</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-alignment-center-right">
              <md-button
                class="md-icon-button md-raised md-accent"
                @click="swapText()"
                :disabled="form.indirizzoA == null || form.indirizzoA == '' || form.indirizzoP == null || form.indirizzoP == '' "
              >
                <md-icon>swap_vert</md-icon>
              </md-button>
            </div>

            <div class="md-layout-item md-size-100">
              <label class="md-subheading">Arrivo</label>
              <md-field :class="getValidationClass('indirizzoA')">
                <label>Luogo o indirizzo...</label>
                <md-input v-model="form.indirizzoA"></md-input>

                <span
                  class="md-error"
                  v-if="!$v.form.indirizzoA.required"
                >L'indirizzo di arrivo è necessario</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.indirizzoA.minlength"
                >Devi inserire almeno 5 caratteri</span>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-alignment-center-space-between">
              <label class="md-subheading md-layout-item md-size-100">Data e ora della partenza</label>
              <div class="md-layout-item md-size-50 md-xsmall-size-100">
                <md-datepicker
                  v-model="form.dataPartenza"
                  :md-open-on-focus="true"
                  md-immediately
                  :class="getValidationClass('dataPartenza')"
                >
                  <label>Seleziona la data</label>

                  <span
                    class="md-error"
                    v-if="!$v.form.dataPartenza.required"
                  >Devi selezionare una data</span>
                </md-datepicker>
              </div>

              <div
                class="md-layout-item md-size-40 md-layout md-alignment-center-center md-xsmall-size-100"
              >
                <md-field :class="getValidationClass('oraPartenza')">
                  <label>Seleziona l'ora (hh:mm)</label>
                  <md-input type="time" v-model="form.oraPartenza" />
                  <span
                    class="md-error"
                    v-if="!$v.form.oraPartenza.required"
                  >Devi selezionare un'ora</span>
                </md-field>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-card-actions class="md-layout md-alignment-center-right">
          <md-button
            class="md-layout-item md-size-20 md-xsmall-size-100"
            type="reset"
            @click="clearForm()"
          >Annulla</md-button>
          <md-button
            class="md-layout-item md-size-20 md-xsmall-size-100 md-primary"
            type="submit"
          >Cerca</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <!-- CARD PER LA VISUALIZZAZIONE DELLE ULTIME RICERCHE SE AUTENTICATI -->
    <md-card
      class="md-layout-item md-size-35 md-small-size-80 md-xsmall-size-90 margin-mobile"
      v-if="checkAutenticazione() && activeUltimeRicerche"
    >
      <md-card-header>
        <div class="md-title">Ultime ricerche</div>
      </md-card-header>
      <!-- Visualizzazione lista ultime ricerche con bottone per la ricerca -->
      <md-card-content class="md-layout md-alignment-center-center">
        <div class="md-layout-item md-size-5">
          <md-progress-spinner md-mode="indeterminate" v-show="activeSpinner"></md-progress-spinner>
        </div>

        <md-list class="md-triple-line md-layout-item md-size-100">
          <div v-for="(elemento, i) in arrayUltimeRicerche" :key="i">
            <md-list-item>
              <md-icon class="md-primary">history</md-icon>

              <div class="md-list-item-text">
                <span>Partenza: {{elemento.indirizzoPartenza}}</span>
                <span>Arrivo: {{elemento.indirizzoArrivo}}</span>
                <span>Data: {{elemento.dataPartenza}} | Ora: {{elemento.oraPartenza}}</span>
              </div>

              <md-button class="md-icon-button md-list-action" @click="ricerca(elemento)">
                <md-icon>search</md-icon>
              </md-button>
            </md-list-item>
            <md-divider></md-divider>
          </div>
        </md-list>
      </md-card-content>
    </md-card>

    <!-- ROUTER VIEW PER IL NESTED CHILD: VIAGGIO.VUE -->
    <div
      class="md-layout-item md-small-size-80 ms-xsmall-size-90 margin-mobile"
      :class="{'md-size-50': sending, 'md-size-100': !sending}"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
//LIBRERIA PER CONVERSIONE DI FORMATO
import format from "date-fns/format";

//FUNZIONI PER L'ACCESSO
import Accesso from "../login/access-functions.js";

//FUNZIONI PER L'ACCESSO AL DATABASE
import Dbfunction from "../database/db-functions.js";

//LIBRERIA PER CONTROLLO SUGLI ARRAY
var _ = require("lodash");

//LIBRERIA PER GESTIONE VALIDAZIONE PERSONALIZZATA
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      indirizzoP: null,
      indirizzoA: null,
      dataPartenza: format(new Date(), "dd/MM/yyyy"),
      oraPartenza: format(new Date(), "HH:mm")
    },
    sending: false,
    activeUltimeRicerche: true,
    arrayUltimeRicerche: [],
    activeSpinner: true
  }),
  validations: {
    form: {
      indirizzoP: {
        required,
        minLength: minLength(2)
      },
      indirizzoA: {
        required,
        minLength: minLength(2)
      },
      dataPartenza: {
        required
      },
      oraPartenza: {
        required
      }
    }
  },

  created: function() {
    this.caricaUltimeRicerche();
  },

  methods: {
    //OTTIENE DAL DB LE ULTIME RICERCHE DELL'UTENTE LOGGATO
    caricaUltimeRicerche() {
      if (this.checkAutenticazione()) {
        Dbfunction.getUltimeRicerche().then(results => {
          this.arrayUltimeRicerche = results;
          this.ordinaRicerche();

          if (this.arrayUltimeRicerche.length == 0)
            this.activeUltimeRicerche = false;

          this.activeSpinner = false;
        });
      }
    },

    //METODO CHE FORZA UNA RICERCA PARTENDO DALLE ULTIME RICERCHE
    ricerca(elemento) {
      this.form.indirizzoP = elemento.indirizzoPartenza;
      this.form.indirizzoA = elemento.indirizzoArrivo;
      this.form.dataPartenza = elemento.dataPartenza;
      this.form.oraPartenza = elemento.oraPartenza;

      let queryParams = {
        indirizzoP: elemento.indirizzoPartenza,
        indirizzoA: elemento.indirizzoArrivo,
        dataPartenza: elemento.dataPartenza,
        oraPartenza: elemento.oraPartenza
      };

      this.sending = true;

      this.$router.push({
        path: "/pianifica/viaggio",
        query: Object.assign({}, this.$route.query, queryParams)
      });
    },

    //ORDINA LE RICERCHE IN BASE ALL'ULTIMA EFFETTUATA
    ordinaRicerche() {
      let confronta = (a, b) => {
        const ricercaA = a.timestamp;
        const ricercaB = b.timestamp;

        let comparison = 0;

        if (ricercaA > ricercaB) {
          comparison = -1;
        } else if (ricercaA < ricercaB) {
          comparison = 1;
        }

        return comparison;
      };

      this.arrayUltimeRicerche.sort(confronta);
    },

    //METODO NECESSARIO ALLA VALIDAZIONE
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },

    //METODO INVOCATO QUANDO SI RESETTA IL FORM
    clearForm() {
      this.$v.$reset();

      this.form.indirizzoP = null;
      this.form.indirizzoA = null;
      this.form.dataPartenza = format(new Date(), "dd/MM/yyyy");
      this.form.oraPartenza = format(new Date(), "HH:mm");

      this.sending = false;
      this.activeUltimeRicerche = true;

      this.caricaUltimeRicerche();

      this.$router.push("/pianifica");
    },

    //QUANDO SI INVIANO I DATI SI PASSANO I DATI TRAMITE LA QUERY DEL PATH
    submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let queryParams = {
          indirizzoP: this.form.indirizzoP,
          indirizzoA: this.form.indirizzoA,
          dataPartenza: this.form.dataPartenza,
          oraPartenza: this.form.oraPartenza
        };

        this.sending = true;

        this.$router.push({
          path: "/pianifica/viaggio",
          query: Object.assign({}, this.$route.query, queryParams)
        });
      }
    },

    //FUNZIONE PER FARE LO SWITCH TRA ANDATA E RITORNO
    swapText() {
      if (this.form.indirizzoA != "" && this.form.indirizzoP != "") {
        let tmp = this.form.indirizzoP;
        this.form.indirizzoP = this.form.indirizzoA;
        this.form.indirizzoA = tmp;
      }
    },

    //CONTROLLO PER AUTENTICAZIONE
    checkAutenticazione() {
      return Accesso.isLoggedIn();
    }
  },

  watch: {
    //*********TENGO D'OCCHIO LE OPERAZIONI SUL ROUTER IN MODO TALE DA MOSTRARE E NASCONDERE I RISULTATI DELLA RICERCA O LE ULTIME RICERCHE
    $route(from) {
      this.sending = true;
      this.activeUltimeRicerche = false;
      
      if (_.isEmpty(from.query)) {
        this.sending = false;
        this.activeUltimeRicerche = true;
        this.caricaUltimeRicerche();
      }
    },

    sending: function() {
      if (this.sending) this.activeUltimeRicerche = false;
      else this.activeUltimeRicerche = true;
    },

    activeUltimeRicerche: function() {
      if (this.activeUltimeRicerche) this.sending = false;
      else this.sending = true;
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 960px) {
  .margin-mobile {
    margin-top: 30px;
  }
}
</style>