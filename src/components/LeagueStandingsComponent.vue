<script setup>
import {ref, watch} from 'vue'
import axios from 'axios'
import config from "@/config.js";

const props = defineProps([
  'league'
]);

// Get alle standings
const standings = ref([]);
const latestStageName = ref('');

async function fetchStandings(stage) {
  latestStageName.value = props.league.league_stages[stage] || 'Unknown';
  try {
    const unsorted = ref([]);
    const response = await axios.get(`${config.api}/standings?league=${props.league.abbrev}&league_stage=${stage}&format=json`);
    unsorted.value = response.data.standings;
    standings.value = unsorted.value.sort((a, b) => a.rank - b.rank);
  } catch (error) {
    console.error(error);
  }
}

watch(
  () => props.league,
  async () => {
    const latestStage = ref(0);
    for (let i = 0; i < props.league.league_stages.length; i++) {
      await axios
        .get(`${config.api}/standings?league=${props.league.abbrev}&league_stage=${i}&format=json`)
        .then(() => {
          latestStage.value = i;
        })
        .catch(() => {
        });
    }
    await fetchStandings(latestStage.value);
  }
);
</script>

<template>
  <div class="standings">
    <div class="stageName">
      <h1>{{ latestStageName }}</h1>
    </div>
    <div class="standingsTable">
      <table>
        <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Wins / Draw / Losses</th>
          <th>Goals</th>
          <th>Points</th>
          <th>Qualification</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="team in standings" :key="team.id">
          <td>{{ team.rank }}</td>
          <td>{{ team.team.name }}</td>
          <td>{{ team.wins +'/'+ team.draws +'/'+ team.losses}}</td>
          <td>{{ team.scored +':'+ team.conceded }}</td>
          <td>{{ team.points }}</td>
          <td>{{ team.qualification }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
.standings {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative; top: 120px;
  margin-right: 30px;
  margin-left: 30px;
}

.stageName {
  text-align: center;
  margin: 10px 10px 30px;
}

h1 {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  text-decoration: underline;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 10px;
}

th, tr, td {
  font-size: 24px;
  text-align: center;
}
</style>
