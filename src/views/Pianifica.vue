<template>
  <div class="md-layout md-alignment-top-center margin">
    <form
      novalidate
      class="md-layout-item md-layout md-alignment-center-center"
      :class="{'md-size-60': !sending, 'md-size-30': sending}"
      @submit.prevent="submit()"
    >
      <md-card class="md-layout-item md-size-100 md-small-size-100">
        <md-card-header>
          <div class="md-title">Pianifica il tuo viaggio</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout">
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
              <label class="md-subheading md-layout-item md-size-100">Data e ora della partenza 🚌</label>
              <div class="md-layout-item md-size-50 md-medium-size-100">
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
                class="md-layout-item md-size-30 md-layout md-alignment-center-center md-medium-size-100"
              >
                <md-field :class="getValidationClass('oraPartenza')">
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

        <md-card-actions>
          <md-button type="reset" @click="clearForm()">Annulla</md-button>
          <md-button type="submit" class="md-primary">Cerca</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <div
      class="md-layout-item"
      :class="{'md-size-70': sending, 'md-size-80': !sending, 'margin': !sending}"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";
var _ = require("lodash");

import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      indirizzoP: null,
      indirizzoA: null,
      dataPartenza: format(new Date(), "MM/dd/yyyy"),
      oraPartenza: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      indirizzoP: {
        required,
        minLength: minLength(5)
      },
      indirizzoA: {
        required,
        minLength: minLength(5)
      },
      dataPartenza: {
        required
      },
      oraPartenza: {
        required
      }
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.indirizzoP = null;
      this.form.indirizzoA = null;
      this.form.dataPartenza = format(new Date(), "MM/dd/yyyy");
      this.form.indirizzoP = null;

      this.sending = false;

      this.$router.push("/pianifica");
    },
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
    }
  },

  watch: {
    $route(from) {
      if (_.isEmpty(from.query)) {
        this.sending = false;
      }
    }
  }
};
</script>

<style scoped>
.margin {
  margin-top: 30px;
}
</style>