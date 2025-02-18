<script setup>
import { watch , ref } from "vue";
import axios from "axios";
import config from "@/config.js";

const props = defineProps([
  'leagueAbbrev',
  'stage',
]);

// Fetch games
const groupedMatches = ref([]);
const stageName = ref('');

async function fetchGames() {
  try {
    const response = await axios.get(`${config.api}/matches?league=${props.leagueAbbrev}&league_stage=${props.stage}&format=json`);
    stageName.value = response.data.matches[0].league_stage;
    splitAndSortMatches(response.data.matches);
  } catch (error) {
    console.error(error);
  }
}

// Group and sort matches
function splitAndSortMatches(matches) {
  const grouped = {};

  matches.forEach((match) => {
    // Extract group key (e.g., "1v1_1_g1" from "1v1_1_g1_r1_1")
    const groupKey = match.group_name.split('_r')[0];

    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }

    // Convert start date to "MO 12:00" format
    match.start = formatDate(match.start);

    grouped[groupKey].push(match);
  });

  // Sort each group by match number
  for (const group in grouped) {
    grouped[group] = grouped[group].sort((a, b) => a.number - b.number);
  }

  groupedMatches.value = grouped;
}

// Date formatting
const dayMap = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

// Format start date as "MO 12:00"
function formatDate(isoString) {
  if (!isoString) return "TBD"; // Handle missing dates

  const date = new Date(isoString);
  const day = dayMap[date.getDay()];
  const time = date.toTimeString().slice(0, 5); // Get HH:MM format

  return `${day} ${time}`;
}

// Watch update
watch(
  () => props.stage || props.leagueAbbrev,
  async () => {
    console.log('Fetching games');
    console.log(props.stage, props.leagueAbbrev);
    await fetchGames();
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <div class="stageName standings">
    <h1>{{ stageName }}</h1>
  </div>
  <div v-for="(matches, index) in groupedMatches" :key="index">
    <div class="standings">
      <div class="stageName">
        <h1 v-if="groupedMatches.length>1">{{ matches.league_stage_name +' '+ index}}</h1>
        <h1 v-else>{{ matches.league_stage_name }}</h1>
      </div>
      <div class="standingsTable">
        <table v-if="matches[0].team1 !== null && matches[0].team2 !== null">
          <thead>
          <tr>
            <th>Nr.</th>
            <th>Team 1</th>
            <th>Team 2</th>
            <th>Start</th>
            <th>Field</th>
            <th>Result</th>
            <th>Points</th>
          </tr>
          </thead>
          <tbody v-for="(match, id) in matches" :key="id">
          <tr v-if="match.team1 !== null && match.team2 !== null">
            <td>{{ id+1 }}</td>
            <td>{{ match.team1.name || ''}}</td>
            <td>{{ match.team2.name || ''}}</td>
            <td>{{ match.start }}</td>
            <td v-if="match.pitch !== null">{{ match.pitch }}</td>
            <td v-else>TBD</td>
            <td v-if="match.goals1 !== null && match.goals2 !== null">{{ match.goals1 +' : '+ match.goals2 }}</td>
            <td v-else>TBD</td>
            <td v-if="match.points1 !== null && match.points2 !== null">{{ match.points1 +' : '+ match.points2 }}</td>
            <td v-else>TBD</td>
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
