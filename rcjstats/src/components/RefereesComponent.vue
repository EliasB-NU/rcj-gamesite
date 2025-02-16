<script setup>
  const props = defineProps([
    'matches'
  ])
</script>

<template>
  <table id="plan" class="plan" style="width: unset; display: none;">
    <tbody>
    <tr>
      <th>Table</th>
      <th>Day</th>
      <th>Time</th>
      <th>Team 1</th>
      <th>Team 2</th>
      <th>League</th>
      <th>Partner</th>
      <th>Co</th>
    </tr>
    <tr v-for="match in matches">
      <td>{{ match.pitch }}</td>
      <td>{{ match.start }}</td>
      <td>{{ match.league }}</td>
      <td>{{ match.team1.name }}</td>
      <td>{{ match.team2.name }}</td>
      <td>{{ match.league }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>
