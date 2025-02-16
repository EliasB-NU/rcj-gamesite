<script setup>
import { ref } from 'vue'
import axios from "axios";
import config from "@/config.js";
import ClockComponent from "@/components/ClockComponent.vue";

// Define a reactive variable to store the list of matches
const matches = ref([]);

async function fetchMatches() {
  try {
    const response = await axios.get(`${config.api}/matches?format=json`);
    matches.value = response.data;
    extractReferees();
  } catch (error) {
    console.error(error);
  }
}

fetchMatches();
setInterval(fetchMatches, 10000);

// Extract all the referees for displaying them on the site
const referees = ref([]);

function extractReferees() {
  matches.value.matches.forEach(match => {
    const referee = JSON.parse(match.referees);
    const refName = `${referee.fist_name} ${referee.last_name}`;
    if (!referees.value.includes(refName)) {
      referees.value.push(refName);
    }
  });
}

// Logic for selecting a referee
const clockPosition = ref(false);
const refereeMatches = ref([]);
const theReferee = ref('');
const deselectTimeout = ref(null); // Timeout reference
const AUTO_DESELECT_TIME = 10000; // Time in milliseconds (10 seconds)

const selectReferee = (referee) => {
  theReferee.value = referee;
  clockPosition.value = !clockPosition.value;

  if (clockPosition.value) {
    refereeMatches.value = matches.value.matches.filter(match => {
      const ref = JSON.parse(match.referees);
      return `${ref.fist_name} ${ref.last_name}` === referee;
    });
  }

  deselectTimeout.value = setTimeout(deselectReferee, AUTO_DESELECT_TIME);
}


const deselectReferee = () => {
  theReferee.value = null;
  clockPosition.value = false;
  refereeMatches.value = [];
  if (deselectTimeout.value) {
    clearTimeout(deselectTimeout.value);
    deselectTimeout.value = null;
  }
}
</script>

<template>
  <body>
  <table class="site" style="width: 100%;">
    <tbody>
    <tr>
      <td>
        <table id="mainTable">
          <tbody>
          <tr>
            <ClockComponent v-if="clockPosition" class="clock-btn"/>
            <td v-for="referee in referees">
              <button
                @click="selectReferee(referee)"
                class="submit-btn"
                :class="{checked: theReferee === referee}"
              >
                {{ referee }}
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </td>
      <td>
        <ClockComponent v-if="!clockPosition" class="clock"/>
        <table id="plan" class="plan" v-if="clockPosition">
          <tbody>
          <tr>
            <th>Table</th>
            <th>Day</th>
            <th>Time</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>League</th>
          </tr>
          <tr v-for="match in refereeMatches">
            <td>{{ match.pitch }}</td>
            <td>{{ match.start }}</td>
            <td>{{ match.league }}</td>
            <td>{{ match.team1.name }}</td>
            <td>{{ match.team2.name }}</td>
            <td>{{ match.league }}</td>
          </tr>
          </tbody>
        </table>
      </td>
    </tr>
    </tbody>
  </table>
  </body>
</template>

<style scoped>
body, html {
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
}

body {
  margin: 0;
}

div {
  height: 100%;
}

table {
  height: 100%;
  width: 100%;
  font-size: 1.3em;
}

td {
  padding: 0;
}

th {
  text-align: left;
}

.submit-btn {
  text-decoration: none;
  border: 3px solid #263562;
  background-color: #263562;
  color: white;
  height: 100%;
  width: 100%;
  padding-left: 0.8em;
  padding-right: 0.8em;
  display: inline-block;
  font-weight: 700;
  font-size: 1em;
  text-align: center;
  white-space: nowrap;
}

.submit-btn.checked {
  background-color: white;
  color: #263562;
}

.submit-btn.priority {
  border: 3px solid rgb(277, 0, 15);
  background-color: rgb(277, 0, 15);
}

.submit-btn.priority.checked {
  background-color: white;
  color: rgb(277, 0, 15);
}

.clock-btn {
  text-decoration: none;
  border: 0;
  height: 100%;
  width: 100%;
  padding-left: 0.2em;
  padding-right: 0.2em;
  display: inline-table;
  background: white;
  color: #333333;
  font-weight: 700;
  font-size: 2.5em;
  text-align: center;
  white-space: nowrap;
}

.plan {
  margin: 0.5em 0.3em;
  height: auto;
  border-collapse: collapse;
  color: #333333;
}

.plan tr td, .plan tr th {
  padding: 0.4em;
  border: 2px solid #c8c8c8;
}

.plan tr:nth-child(odd) {
  background-color: #ffffff;
}

.plan tr:nth-child(even) {
  background-color: #f9f9f9;
}

.plan tr:first-child {
  background-color: #f4f4f4;
}

.site tr td:first-child {
  width:1%;
  white-space:nowrap;
}

.clock {
  width: 100%;
  text-align: center;
  font-size: 14em;
  color: #333333;
  display: inline-table;
}
</style>
