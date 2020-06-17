<template>
  <div class="md-layout">
    <form novalidate class="md-layout-item md-layout md-alignment-center-center">
      <md-card class="md-layout-item md-size-50 md-small-size-90">
        <md-card-header>
          <div class="md-title">Pianifica il tuo viaggio</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-80">
                <label class="md-subheading">Partenza</label>
                <md-autocomplete
                  v-model="selectedEmployee"
                  :md-options="employees"
                  :md-open-on-focus="false"
                >
                  <label>Inserisci un indirizzo</label>
                </md-autocomplete>
            </div>

            <div class="md-layout-item md-size-80">
              <label class="md-subheading">Arrivo</label>
                <md-autocomplete
                  v-model="selectedEmployee"
                  :md-options="employees"
                  :md-open-on-focus="false"
                >
                  <label>Inserisci un indirizzo</label>
                </md-autocomplete>
            </div>

            <div class="md-layout-item md-size-80 md-layout">
              <label class="md-subheading">Quando</label>
              
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button>Annulla</md-button>
          <md-button type="submit" class="md-primary">Cerca</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedEmployee: null,
    employees: [
      "Jim Halpert",
      "Dwight Schrute",
      "Michael Scott",
      "Pam Beesly",
      "Angela Martin",
      "Kelly Kapoor",
      "Ryan Howard",
      "Kevin Malone",
      "Creed Bratton",
      "Oscar Nunez",
      "Toby Flenderson",
      "Stanley Hudson",
      "Meredith Palmer",
      "Phyllis Lapin-Vance"
    ]
  })
};
</script>

<style>
</style>