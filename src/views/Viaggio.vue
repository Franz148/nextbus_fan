<template>
  <div class="md-layout md-alignment-center-center">
    <md-card class="md-layout-item md-size-50 md-small-size-90">
      <md-card-header>
        <div class="md-title">Risultati ricerca</div>
      </md-card-header>

      <md-card-content>
        <md-list md-expand-single="true">
          <md-list-item md-expand>
            <md-icon>whatshot</md-icon>
            <span class="md-list-item-text">News</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">World</md-list-item>
              <md-list-item class="md-inset">Europe</md-list-item>
              <md-list-item class="md-inset">South America</md-list-item>
            </md-list>
          </md-list-item>

          <md-list-item md-expand>
            <md-icon>videogame_asset</md-icon>
            <span class="md-list-item-text">Games</span>

            <md-list slot="md-expand">
              <md-list-item class="md-inset">Console</md-list-item>
              <md-list-item class="md-inset">PC</md-list-item>
              <md-list-item class="md-inset">Phone</md-list-item>
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
    risultati: [
      {
        from: {
          name: "path",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.119157980772439",
          lat: "46.07229513956639"
        },
        to: {
          name: "sidewalk",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.117272860303137",
          lat: "46.06757696766586"
        },
        startime: 1592672400000,
        endtime: 1592673326000,
        duration: 926000,
        walkingDuration: 926,
        leg: [
          {
            legId: "null_null",
            startime: 1592672400000,
            endtime: 1592673326000,
            duration: 926,
            from: {
              name: "path",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.119157980772439",
              lat: "46.07229513956639"
            },
            to: {
              name: "sidewalk",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.117272860303137",
              lat: "46.06757696766586"
            },
            transport: {
              type: "WALK",
              agencyId: null,
              routeId: null,
              routeShortName: null,
              tripId: null
            },
            legGeometery: {
              length: 40,
              levels: null,
              points:
                "ynexGuuzbAjC~ABKNm@@QAcAFAD?hAGHB?X?f@PJtA~@DDD\\DXFd@Fl@d@ZTDRD@PBFLDRFTZ^p@fAn@ZPNFH@h@QvAg@JCP??GRKV?j@I"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: null,
            length: 683.01
          }
        ],
        promoted: true,
        customData: {}
      },
      {
        from: {
          name: "path",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.119157980772439",
          lat: "46.07229513956639"
        },
        to: {
          name: "sidewalk",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.117272860303137",
          lat: "46.06757696766586"
        },
        startime: 1592672400000,
        endtime: 1592673534000,
        duration: 1134000,
        walkingDuration: 1134,
        leg: [
          {
            legId: "null_null",
            startime: 1592672400000,
            endtime: 1592673534000,
            duration: 1134,
            from: {
              name: "path",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.119157980772439",
              lat: "46.07229513956639"
            },
            to: {
              name: "sidewalk",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.117272860303137",
              lat: "46.06757696766586"
            },
            transport: {
              type: "WALK",
              agencyId: null,
              routeId: null,
              routeShortName: null,
              tripId: null
            },
            legGeometery: {
              length: 58,
              levels: null,
              points:
                "ynexGuuzbAjC~ABKNm@@QAcAFAD?hAGHBD?P@ZG^?DKBIHEB?JFJFRIN?DHLCHA@HDn@@A@?hA?B?BKZJNJd@HVBH@XAHAR?DnA?Lb@CD?DATAP?H?J?B?TEBRBAvAS?BPtCJbCm@H"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: null,
            length: 811.2479999999999
          }
        ],
        promoted: true,
        customData: {}
      },
      {
        from: {
          name: "path",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.119157980772439",
          lat: "46.07229513956639"
        },
        to: {
          name: "sidewalk",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.117272860303137",
          lat: "46.06757696766586"
        },
        startime: 1592672507000,
        endtime: 1592673157000,
        duration: 650000,
        walkingDuration: 529,
        leg: [
          {
            legId: "null_null",
            startime: 1592672507000,
            endtime: 1592672759000,
            duration: 252,
            from: {
              name: "path",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.119157980772439",
              lat: "46.07229513956639"
            },
            to: {
              name: 'Piazza Dante "Stazione Fs"',
              stopId: { agencyId: "12", id: "247_12", extra: null },
              stopCode: "20125p",
              lon: "11.119568",
              lat: "46.071917"
            },
            transport: {
              type: "WALK",
              agencyId: null,
              routeId: null,
              routeShortName: null,
              tripId: null
            },
            legGeometery: {
              length: 12,
              levels: null,
              points: "ynexGuuzbAjC~ABKNm@@Q]IOOAS?M]SMIAA"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: null,
            length: 188.961
          },
          {
            legId: "12_0003374502020053120200913",
            startime: 1592672760000,
            endtime: 1592672880000,
            duration: 120,
            from: {
              name: 'Piazza Dante "Stazione Fs"',
              stopId: { agencyId: "12", id: "247_12", extra: null },
              stopCode: "20125p",
              lon: "11.119568",
              lat: "46.071917"
            },
            to: {
              name: "Rosmini S.Maria Maggiore",
              stopId: { agencyId: "12", id: "407_12", extra: null },
              stopCode: "21590z",
              lon: "11.118642",
              lat: "46.0681"
            },
            transport: {
              type: "BUS",
              agencyId: "12",
              routeId: "13A",
              routeShortName: "13",
              tripId: "0003374502020053120200913"
            },
            legGeometery: {
              length: 9,
              levels: null,
              points: "klexGoxzbA^Tj@DfFm@h@Bd@zGpFwA`AC|@I"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: {
              fareIndex: 0,
              fare: {
                currency: {
                  currency: "EUR",
                  currencyCode: "EUR",
                  defaultFractionDigits: 2,
                  symbol: "EUR"
                },
                cents: 120
              }
            },
            length: 430.4014233857334
          },
          {
            legId: "null_null",
            startime: 1592672880000,
            endtime: 1592673157000,
            duration: 277,
            from: {
              name: "Rosmini S.Maria Maggiore",
              stopId: { agencyId: "12", id: "407_12", extra: null },
              stopCode: "21590z",
              lon: "11.118642",
              lat: "46.0681"
            },
            to: {
              name: "sidewalk",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.117272860303137",
              lat: "46.06757696766586"
            },
            transport: {
              type: "WALK",
              agencyId: null,
              routeId: null,
              routeShortName: null,
              tripId: null
            },
            legGeometery: {
              length: 17,
              levels: null,
              points: "stdxG}rzbAK?I?Q??NDrB@\\BRHjABPDZBCBFP@RKV?j@I"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: null,
            length: 199.013
          }
        ],
        promoted: false,
        customData: {}
      },
      {
        from: {
          name: "path",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.119157980772439",
          lat: "46.07229513956639"
        },
        to: {
          name: "sidewalk",
          stopId: { agencyId: "", id: "", extra: null },
          stopCode: null,
          lon: "11.117272860303137",
          lat: "46.06757696766586"
        },
        startime: 1592672507000,
        endtime: 1592673180000,
        duration: 673000,
        walkingDuration: 552,
        leg: [
          {
            legId: "null_null",
            startime: 1592672507000,
            endtime: 1592672759000,
            duration: 252,
            from: {
              name: "path",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.119157980772439",
              lat: "46.07229513956639"
            },
            to: {
              name: 'Piazza Dante "Stazione Fs"',
              stopId: { agencyId: "12", id: "247_12", extra: null },
              stopCode: "20125p",
              lon: "11.119568",
              lat: "46.071917"
            },
            transport: {
              type: "WALK",
              agencyId: null,
              routeId: null,
              routeShortName: null,
              tripId: null
            },
            legGeometery: {
              length: 12,
              levels: null,
              points: "ynexGuuzbAjC~ABKNm@@Q]IOOAS?M]SMIAA"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: null,
            length: 188.961
          },
          {
            legId: "12_0003374502020053120200913",
            startime: 1592672760000,
            endtime: 1592672880000,
            duration: 120,
            from: {
              name: 'Piazza Dante "Stazione Fs"',
              stopId: { agencyId: "12", id: "247_12", extra: null },
              stopCode: "20125p",
              lon: "11.119568",
              lat: "46.071917"
            },
            to: {
              name: "Rosmini S.Maria Maggiore",
              stopId: { agencyId: "12", id: "407_12", extra: null },
              stopCode: "21590z",
              lon: "11.118642",
              lat: "46.0681"
            },
            transport: {
              type: "BUS",
              agencyId: "12",
              routeId: "13A",
              routeShortName: "13",
              tripId: "0003374502020053120200913"
            },
            legGeometery: {
              length: 9,
              levels: null,
              points: "klexGoxzbA^Tj@DfFm@h@Bd@zGpFwA`AC|@I"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: {
              fareIndex: 0,
              fare: {
                currency: {
                  currency: "EUR",
                  currencyCode: "EUR",
                  defaultFractionDigits: 2,
                  symbol: "EUR"
                },
                cents: 120
              }
            },
            length: 430.4014233857334
          },
          {
            legId: "null_null",
            startime: 1592672880000,
            endtime: 1592673180000,
            duration: 300,
            from: {
              name: "Rosmini S.Maria Maggiore",
              stopId: { agencyId: "12", id: "407_12", extra: null },
              stopCode: "21590z",
              lon: "11.118642",
              lat: "46.0681"
            },
            to: {
              name: "sidewalk",
              stopId: { agencyId: "", id: "", extra: null },
              stopCode: null,
              lon: "11.117272860303137",
              lat: "46.06757696766586"
            },
            transport: {
              type: "WALK",
              agencyId: null,
              routeId: null,
              routeShortName: null,
              tripId: null
            },
            legGeometery: {
              length: 10,
              levels: null,
              points: "stdxG}rzbAB?TEBRBAvAS?BPtCJbCm@H"
            },
            alertStrikeList: [],
            alertDelayList: [],
            alertParkingList: [],
            alertRoadList: [],
            alertAccidentList: [],
            extra: null,
            length: 221.544
          }
        ],
        promoted: false,
        customData: {}
      }
    ]
  }),
  created: function() {
    if (this.risultati.length == 0) {
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