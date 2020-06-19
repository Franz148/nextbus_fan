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
              <md-autocomplete
                v-model="selectedEmployee1"
                :md-options="employees1"
                :md-open-on-focus="false"
              >
                <label>Indirizzo di partenza</label>
              </md-autocomplete>
            </div>

            <div class="md-layout-item md-size-90">
              <label class="md-subheading">Arrivo</label>
              <md-autocomplete
                v-model="selectedEmployee2"
                :md-options="employees2"
                :md-open-on-focus="false"
              >
                <label>Indirizzo di arrivo</label>
              </md-autocomplete>
            </div>

            <div class="md-layout-item md-size-100 md-layout md-alignment-center-space-between">
              <label class="md-subheading md-layout-item md-size-100">Data e ora della partenza 🚌</label>
              <div class="md-layout-item md-size-50">
                <md-datepicker v-model="selectedDate" :md-open-on-focus="true" md-immediately>
                  <label>Seleziona la data</label>
                </md-datepicker>
              </div>
              <div class="md-layout-item md-size-50 md-layout md-alignment-center-center">
                <input type="time" class="inputTime" />
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
      <br><br>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import format from "date-fns/format";

export default {
  data: () => ({
    selectedEmployee1: null,

    selectedEmployee2: null,

    employees1: [
      "Jim Halpert",
      "Dwight Schrute",
      "Michael Scott",
      "Pam Beesly",
      "Angela Martin"
    ],

    employees2: [
      "Kelly Kapoor",
      "Ryan Howard",
      "Kevin Malone",
      "Creed Bratton",
      "Oscar Nunez",
      "Toby Flenderson",
      "Stanley Hudson",
      "Meredith Palmer",
      "Phyllis Lapin-Vance"
    ],

    selectedDate: format(new Date(), "MM/dd/yyyy")
  }),

  methods: {
    submit() {
      this.$router.push("/pianifica/viaggio?");
    },

    reset() {
      this.$router.push("/pianifica");
    }
  }
};
</script>

<style scoped>
</style>