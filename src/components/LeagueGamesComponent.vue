<script setup>
import {watch} from "vue";
import axios from "axios";

const props = defineProps([
  'league'
]);

// Fetch games
const games = ref([]);

async function fetchGames() {
  try {
    const response = await axios.get(`${config.api}/games?league=${props.league}&format=json`);
    games.value = response.data;
  } catch (error) {
    console.error(error);
  }
  console.log(games.value);
}

// Watch update
watch(
  () => props.league,
  () => {
    fetchGames();
  }
)
</script>

<template>

</template>

<style scoped>

</style>
