<script setup>
import { ref } from 'vue'
import axios from 'axios'
import config from '@/config.js'
import Header from '@/components/Header.vue'
import LeagueMatchesComponent from '@/components/LeagueMatchesComponent.vue'

// Fetch stages of each league
const leagues = ref([]);
const leagueNames = ref([]);
const stages = ref(new Map());

async function fetchData() {
  try {
    const response = await axios.get(`${config.api}/leagues?format=json`);
    for (const league of response.data) {
      if (league.abbrev !== config.EntryAbbrev && league.abbrev !== config.LwLEntryAbbrev) {
        if (!leagues.value.includes(league.abbrev)) {
          leagues.value.push(league.abbrev);
        }
        if (!leagueNames.value.includes(league.name)) {
          leagueNames.value.push(league.name);
        }
        for (let i = 0; i < league.league_stages.length; i++) {
          await checkStage(i, league.abbrev);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
fetchData();
// Update every 5 minutes
setInterval(fetchData, 300000);

async function checkStage(stage, leagueAbbrev) {
  const matches = ref([]);
  try {
    const response = await axios.get(`${config.api}/matches?league=${leagueAbbrev}&league_stage=${stage}&format=json`);
    matches.value = response.data.matches;
    if (matches.value.length > 0) {
      if (!stages.value.has(leagueAbbrev)) {
        stages.value.set(leagueAbbrev, []);
      }
      stages.value.get(leagueAbbrev).push(stage);
    }
  } catch (error) {
    console.error(error);
  }
}


// Cycle through stages of the each allowed league league
const stageId = ref(0);
const leagueAbbrev = ref('');
const leagueName = ref('');
let leagueIndex = 0;
let stageIndex = 0;

function cycleStage() {
  // Get the current league abbreviation
  leagueAbbrev.value = leagues.value[leagueIndex];
  leagueName.value = leagueNames.value[leagueIndex];

  // Get the corresponding stages array
  const stageArray = stages.value.get(leagueAbbrev.value);

  // Set the current stage ID
  stageId.value = stageArray[stageIndex];

  console.log(`League: ${leagueName.value} (${leagueAbbrev.value}), Stage: ${stageId.value}`);

  // Move to the next stage
  stageIndex++;

  // If we reach the end of stages, reset and move to the next league
  if (stageIndex >= stageArray.length) {
    stageIndex = 0;
    leagueIndex++;

    // If we reach the end of leagues, reset to the first league
    if (leagueIndex >= leagues.value.length) {
      leagueIndex = 0;
    }
  }
}
setInterval(cycleStage, 10000);
</script>

<template>
  <Header mode="Matches" :title="leagueName"/>
  <LeagueMatchesComponent :stage="stageId" :league-abbrev="leagueAbbrev"/>
</template>

<style scoped>

</style>
