<script setup>
import {ref, watch} from 'vue'
import axios from 'axios'
import config from "@/config.js";

const props = defineProps([
  'league'
]);

// Get alle standings
const standings = ref([]);

async function fetchStandings(latestStage) {
  try {
    const response = await axios.get(`${config.api}/standings?league=${props.league.abbrev}&league_stage=${latestStage}&format=json`);
    standings.value = response.data;
  } catch (error) {
    console.error(error);
  }
  console.log(standings.value);
}

watch(
  () => props.league,
  () => {
    const latestStage = ref(0);
    const l = props.league.league_stages.length;
    const l1 = props.league.league_stages[l - 1];
    latestStage.value = (l1.match(/\d+/)[0]) - 1;
    fetchStandings(latestStage.value);
  }
);
</script>

<template>
  <div class="standings">
    <table>
      <thead>
      <tr>
        <th>Rank</th>
        <th>Team</th>
        <th>Wins / Draw / Losses</th>
        <th>Goals</th>
        <th>Points</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="team in standings.standings" :key="standings.standings.rank">
        <td>{{ team.rank }}</td>
        <td>{{ team.team.name }}</td>
        <td>{{ team.wins +'/'+ team.draws +'/'+ team.losses}}</td>
        <td>{{ team.scored +':'+ team.conceded }}</td>
        <td>{{ team.points }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.standings {
  display: flex;
  margin-top: 120px;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
}

table {
  border-collapse: collapse;
  width: 100%;
}
</style>
