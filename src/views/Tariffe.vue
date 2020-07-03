<template>
  <div class="md-layout md-gutter md-alignment-center-center">
    <md-table
      v-model="ticketsRates"
      class="md-layout-item md-size-60 md-small-size-80 md-xsmall-size-90"
    >
      <md-table-toolbar>
        <h3>Tariffe trasporto pubblico urbano Trento</h3>
      </md-table-toolbar>

      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        class="md-layout-item md-size-60 md-small-size-80 md-xsmall-size-90"
      >
        <md-table-cell md-label="Tipologia Titolo">{{ item.tipologiaTitolo }}</md-table-cell>
        <md-table-cell md-label="Biglietto Singolo">{{ item.singolo }}</md-table-cell>
        <md-table-cell md-label="Carta Scalare">{{ item.cartaScalare}}</md-table-cell>
        <md-table-cell md-label="Mobile Ticket su Smartphone">{{ item.mobileTicket }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "TableTemplate",
  data: () => ({
    ticketsRates: [
      {
        tipologiaTitolo: "Biglietto urbano valido 70 minuti",
        singolo: "  € 1.20",
        cartaScalare: " € 1.10 ",
        mobileTicket: "  € 1.10 "
      },
      {
        tipologiaTitolo: "Biglietto urbano valido 120 minuti",
        singolo: " € 1.50 ",
        cartaScalare: " € 1.40 ",
        mobileTicket: " € 1.35 "
      },
      {
        tipologiaTitolo: "Biglietto urbano giornaliero",
        singolo: " € 3.00",
        cartaScalare: " € 2.80",
        mobileTicket: " € 2.70"
      },
      {
        tipologiaTitolo: "Corsa semplice venduto a bordo",
        singolo: " € 2.00 ",
        cartaScalare: "",
        mobileTicket: ""
      },
      {
        tipologiaTitolo: "Biglietto Funivia solo andata",
        singolo: " € 3.00 ",
        cartaScalare: "",
        mobileTicket: ""
      },

      {
        tipologiaTitolo: "Biglietto Funivia andata e ritorno",
        singolo: " € 5.00 ",
        cartaScalare: "",
        mobileTicket: ""
      }
    ]
  })
};
</script>
