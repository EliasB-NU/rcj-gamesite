<script setup>
const props = defineProps([
  'matches',
])
</script>

<template>
  <table v-if="!clockPosition">
    <thead>
    <tr>
      <th>Table</th>
      <th>Start</th>
      <th>Team 1</th>
      <th>Team 2</th>
      <th>League</th>
      <th>Partner</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="match in matches" :key="match.number">
      <td>{{ match.pitch }}</td>
      <td>{{ match.start }}</td>
      <td>{{ match.team1.name }}</td>
      <td>{{ match.team2.name }}</td>
      <td>{{ match.league }}</td>
      <td v-if="currentReferee !== match.referees[0].first_name + ' ' + match.referees[0].last_name">{{ match.referees[0].first_name + ' ' + match.referees[0].last_name }}</td>
      <td v-else>{{ match.referees[1].first_name + ' ' + match.referees[1].last_name }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
