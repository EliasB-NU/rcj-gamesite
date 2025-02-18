<script setup>
import { ref } from 'vue';
import axios from 'axios';
import config from '@/config.js';
import Header from '@/components/Header.vue'
import LeagueGamesComponent from '@/components/LeagueGamesComponent.vue'

// Fetch leagues
const stages = ref([]);

async function fetchLeagues() {
  try {
    const response = await axios.get(`${config.api}/leagues?format=json`);
    for (const league of response.data) {
      if (league.abbrev === config.EntryAbbrev) {
        for (let i = 0; i < league.league_stages.length; i++) {
          await checkStage(i);
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function checkStage(stage) {
  const matches = ref([]);
  try {
    const response = await axios.get(`${config.api}/matches?league=${config.EntryAbbrev}&league_stage=${stage}&format=json`);
    matches.value = response.data.matches;
    if (matches.length > 0) {
      stages.value.push(stage);
    }
  } catch (error) {
    console.error(error);
  }
}
fetchLeagues();
// Update every 5 minutes
setInterval(fetchLeagues, 300000);

// Cycle through stages of the Entry league
const stageId = ref(0);
let index = 0;

function updateStage() {
  stageId.value = stages.value[index];

  index = (index + 1) % stages.value.length;
}
setInterval(updateStage, 4000);
</script>

<template>
  <Header mode="Games" title="Entry"/>
  <LeagueGamesComponent :stageId="stageId" />
</template>

<style scoped>

</style>
