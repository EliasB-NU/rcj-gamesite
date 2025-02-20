<script setup>
const props = defineProps([
  'matches',
  'amountOfReferees',
])
</script>

<template>
  <div>
    <table v-if="!clockPosition">
      <thead>
      <tr>
        <th>Table</th>
        <th>Start</th>
        <th>Team 1</th>
        <th>Team 2</th>
        <th>League</th>
        <th v-for="number in props.amountOfReferees" :key="number">
          {{ 'Referee ' + number }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="match in props.matches" :key="match.start">
        <td>{{ match.pitch }}</td>
        <td>{{ match.formattedStart }}</td>
        <td>{{ match.team1.name }}</td>
        <td>{{ match.team2.name }}</td>
        <td>{{ match.league }}</td>
          <td v-for="referee in match.referees" :key="referee.first_name + referee.last_name">
            {{ referee.first_name + ' ' + referee.last_name }}
          </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}

td {
  cursor: pointer;
}

td:hover {
  background-color: #f0f0f0;
}
</style>
