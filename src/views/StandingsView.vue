<script setup>
import { ref } from "vue";
import config from "@/config.js";
import axios from "axios";
import Header from "@/components/Header.vue";
import LeagueStandingsComponent from "@/components/LeagueStandingsComponent.vue";

// Fetch leagues
const leagues = ref([]);

async function fetchLeagues() {
  try {
    const response = await axios.get(`${config.api}/leagues?format=json`);
    leagues.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

fetchLeagues();
setInterval(fetchLeagues, 300000);

// Cycle through standings of each league
const leagueTitle = ref('');
const league = ref();
let index = 0;


async function updateValue() {
  leagueTitle.value = leagues.value[index].name;
  league.value = leagues.value[index];


  index = (index + 1) % leagues.value.length;
}
setInterval(updateValue, 10000);

</script>

<template>
  <Header :title="leagueTitle" mode="Standings" />
  <LeagueStandingsComponent :league="league" />
</template>

<style scoped>

</style>
