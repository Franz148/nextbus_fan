<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-50 md-small-size-90">
      <md-card-header>
        <div class="md-title">Risultati ricerca</div>
      </md-card-header>

      <md-card-content>
        {{indirizzoP}}
        {{indirizzoA}}
        {{dataPartenza}}
        {{oraPartenza}}
        <md-list md-expand-single="true">
          <md-list-item md-expand v-for="viaggio in risultati" :key="viaggio.duration">
            <md-icon v-if="viaggio.promoted">directions_walk</md-icon>
            <md-icon v-if="!viaggio.promoted">directions_bus</md-icon>

            <span class="md-list-item-text">
              Durata
              <b>{{msToHMS(viaggio.duration)}}</b>
            </span>

            <span class="md-list-item-text">
              Partenza
              <b>{{convertTimestampToTime(viaggio.startime)}}</b>
            </span>

            <span class="md-list-item-text">
              Arrivo
              <b>{{convertTimestampToTime(viaggio.endtime)}}</b>
            </span>

            <md-list slot="md-expand">
              <md-list-item
                class="md-inset"
                v-for="(item, index) in viaggio.leg"
                :key="item.endtime"
              >
                <md-icon v-if="item.transport.type == 'WALK'">directions_walk</md-icon>
                <md-icon v-if="item.transport.type == 'BUS'">directions_bus</md-icon>
                <span
                  class="md-list-item-text"
                >{{index + 1}}) P: {{item.from.name}} | A: {{item.to.name}}</span>
              </md-list-item>
            </md-list>
          </md-list-item>
        </md-list>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Functions from "../api/functions.js";

export default {
  data: () => ({
    risultati: [],
    indirizzoP: "",
    indirizzoA: "",
    dataPartenza: "",
    oraPartenza: ""
  }),

  methods: {
    convertTimestampToTime(unix_timestamp) {
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      var date = new Date(unix_timestamp);
      // Hours part from the timestamp
      var hours = date.getHours();
      // Minutes part from the timestamp
      var minutes = "0" + date.getMinutes();

      // Will display time in 10:30:23 format
      return hours + ":" + minutes.substr(-2);
    },

    msToHMS(ms) {
      // 1- Convert to seconds:
      var seconds = ms / 1000;
      // 2- Extract hours:
      var hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
      seconds = seconds % 3600; // seconds remaining after extracting hours
      // 3- Extract minutes:
      var minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
      // 4- Keep only seconds not extracted to minutes:
      seconds = seconds % 60;

      return hours + ":" + minutes + ":" + seconds;
    },

    tConvert(time) {
      // Check correct time format and split into components
      time = time
        .toString()
        .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

      if (time.length > 1) {
        // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
      }
      return time.join(""); // return adjusted time or original string
    }
  },
  created: function() {
    this.indirizzoP = this.$route.query.indirizzoP;
    this.indirizzoA = this.$route.query.indirizzoA;
    this.dataPartenza = this.$route.query.dataPartenza;
    this.oraPartenza = this.tConvert(this.$route.query.oraPartenza);

    if (this.risultati.length != 0) {
      Functions.pianificaViaggio(
        "piazza dante trento",
        "dipartimento di lettere trento",
        "06/20/2020",
        "07:00PM"
      ).then(results => {
        this.risultati = results.data;
        console.log(results);
      });
    }
  }
};
</script>

<style>
</style>