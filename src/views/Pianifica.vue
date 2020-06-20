<template>
  <div class="md-layout">
    <form novalidate class="md-layout-item md-layout md-alignment-center-center">
      <md-card class="md-layout-item md-size-50 md-small-size-90">
        <md-card-header>
          <div class="md-title">Pianifica il tuo viaggio</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-90">
              <label class="md-subheading">Partenza</label>
              <md-field>
                <label>Indirizzo di partenza</label>
                <md-input v-model="indirizzoP"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-90">
              <label class="md-subheading">Arrivo</label>
              <md-field>
                <label>Indirizzo di arrivo</label>
                <md-input v-model="indirizzoA"></md-input>
              </md-field>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-alignment-center-space-between">
              <label class="md-subheading md-layout-item md-size-100">Data e ora della partenza 🚌</label>
              <div class="md-layout-item md-size-50">
                <md-datepicker v-model="dataPartenza" :md-open-on-focus="true" md-immediately>
                  <label>Seleziona la data</label>
                </md-datepicker>
              </div>
              <div class="md-layout-item md-size-50 md-layout md-alignment-center-center">
                <input type="time" class="inputTime" v-model="oraPartenza"/>
              </div>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="reset" @click="reset()">Annulla</md-button>
          <md-button type="submit" class="md-primary" @click.stop.prevent="submit()">Cerca</md-button>
        </md-card-actions>
      </md-card>
    </form>

    <div class="md-layout-item md-size-100">
      <br />
      <br />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";

export default {
  data: () => ({
    indirizzoP: null,
    indirizzoA: null,
    dataPartenza: format(new Date(), "MM/dd/yyyy"),
    oraPartenza: null
  }),

  methods: {
    submit() {
      let queryParams = {
        indirizzoP : this.indirizzoP,
        indirizzoA : this.indirizzoA,
        dataPartenza: this.dataPartenza,
        oraPartenza: this.oraPartenza
      };

      this.$router.push({path: "/pianifica/viaggio", query: queryParams});
    },

    reset() {
      this.$router.push("/pianifica");
    }
  }
};
</script>

<style scoped>
</style>