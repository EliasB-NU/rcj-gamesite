<script setup>
import {ref, onMounted, computed} from "vue";
import axios from "axios";
import ClockComponent from "@/components/ClockComponent.vue";

const referees = ref({});
const selectedReferee = ref(null);
const matches = ref([]);

const upcomingMatches = computed(() => {
  return matches.value.filter(match => new Date(match.start) > new Date());
});

const fetchMatches = async () => {
  try {
    const response = await axios.get('http://104.248.18.113/rest/v1/vo25/matches', {
      auth: {
        username: 'braun',
        password: 'rcjv1234'
      }
    });
    processMatches(response.data.matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
};

const processMatches = (matchesData) => {
  referees.value = {};
  matchesData.forEach(match => {
    const referee = JSON.parse(match.referees);
    const refName = `${referee.fist_name} ${referee.last_name}`;
    if (!referees.value[refName]) {
      referees.value[refName] = [];
    }
    referees.value[refName].push(match);
  });
  matches.value = matchesData;
};

const selectReferee = (refName) => {
  selectedReferee.value = refName;
  setTimeout(() => { selectedReferee.value = null; }, 15000);
};

const isPriority = (match) => {
  return (new Date(match.start) - new Date()) / 60000 <= 10;
};

onMounted(() => {
  fetchMatches();
  setInterval(fetchMatches, 30000);
});
</script>

<template>
  <div>
    <ClockComponent />
    <div v-if="!selectedReferee">
      <button v-for="(matches, ref) in referees" :key="ref" @click="selectReferee(ref)" class="submit-btn">{{ ref }}</button>
    </div>
    <div v-else>
      <table class="plan">
        <thead>
        <tr>
          <th>Time</th><th>Field</th><th>Team 1</th><th>Team 2</th><th>League</th><th>Referee</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="match in referees[selectedReferee]" :key="match.number" :class="{'submit-btn-prio': isPriority(match)}">
          <td>{{ match.start }}</td>
          <td>{{ match.pitch }}</td>
          <td>{{ match.team1.name }}</td>
          <td>{{ match.team2.name }}</td>
          <td>{{ match.league }}</td>
          <td>{{ selectedReferee }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>
