<script setup>
import {ref, watch} from 'vue'
import axios from 'axios'
import config from "@/config.js";

const props = defineProps([
  'league'
]);

// Get alle standings
const groupedStandings = ref([]);
const latestStageName = ref('');

async function fetchStandings(stage) {
  latestStageName.value = props.league.league_stages[stage] || 'Unknown';
  try {
    const response = await axios.get(`${config.api}/standings?league=${props.league.abbrev}&league_stage=${stage}&format=json`);
    const standings = replaceUndefinedWith0(response.data.standings);
    groupedStandings.value = [];
    splitStandings(standings);
  } catch (error) {
    console.error(error);
  }
}

function replaceUndefinedWith0(standings) {
    return standings.map(standing => {
      standing.wins = standing.wins || 0;
      standing.draws = standing.draws || 0;
      standing.losses = standing.losses || 0;
      standing.scored = standing.scored || 0;
      standing.conceded = standing.conceded || 0;
      standing.points = standing.points || 0;
      return standing;
    });
}

function splitStandings(unsortedUnfiltered) {
    const unsortedGroupedStandings = unsortedUnfiltered.reduce((groups, team) => {
      const groupKey = team.group;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(team);
      return groups;
    }, {});
    const sortedGroupedStandings = ref([]);
    for (const group in unsortedGroupedStandings) {
      sortedGroupedStandings.value.push(unsortedGroupedStandings[group].sort((a, b) => a.rank - b.rank));
    }
    groupedStandings.value = sortedGroupedStandings.value;
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
  },
  {
    immediate: true
  }
);
</script>

<template>
  <div v-for="(standings, index) in groupedStandings" :key="index">
    <div class="standings">
      <div class="stageName">
        <h1 v-if="groupedStandings.length>1">{{ latestStageName +' '+ standings[0].group }}</h1>
        <h1 v-else>{{ latestStageName }}</h1>
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
            <td>{{ team.wins +'/'+ team.draws +'/'+ team.losses }}</td>
            <td>{{ team.scored +':'+ team.conceded }}</td>
            <td>{{ team.points }}</td>
            <td>{{ team.qualification }}</td>
          </tr>
          </tbody>
        </table>
      </div>
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
