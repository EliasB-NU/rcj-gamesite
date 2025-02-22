<script setup>
import { ref } from 'vue'
import Header from '@/components/Header.vue'
import LeagueMatchesComponent from '@/components/LeagueMatchesComponent.vue'

// Fetch stages of each league
const leagues = ref(['lwli', 'open', 'lo'])
const leagueNames = ref(['Lightweight int.', 'Open int.', 'LwL vs Open'])
const stages = ref(new Map())
stages.value.set('lwli', { stage1: 0, stage2: 1})
stages.value.set('open', { stage1: 0, stage2: 1})
stages.value.set('lo', { stage1: 0})

console.log(stages.value)

// Cycle through stages of the each allowed league league
const allStages = ref([])
const leagueAbbrev = ref('')
const leagueName = ref('')
const leagueIndex = ref(0)

function cycleStage() {
  leagueAbbrev.value = leagues.value[leagueIndex.value]
  leagueName.value = leagueNames.value[leagueIndex.value]
  allStages.value = stages.value.get(leagueAbbrev.value)

  console.log(allStages.value)

  leagueIndex.value = (leagueIndex.value + 1) % leagues.value.length
}

setInterval(cycleStage, 10000)
</script>

<template>
  <Header mode="Matches" :title="leagueName" />
  <div v-for="stage in allStages" :key="leagueAbbrev + stageId">
    <LeagueMatchesComponent :stage="stage" :league-abbrev="leagueAbbrev" />
  </div>
</template>

<style scoped>

</style>
