<script setup>
import { ref } from 'vue'
import axios from 'axios'
import config from '@/config.js'
import ClockComponent from '@/components/ClockComponent.vue'

// Define a reactive variable to store the list of matches
const refereesMatches = ref(new Map())
const referees = ref([])


async function fetchMatches() {
  try {
    const response = await axios.get(`${config.api}/matches?format=json`)
    for (const match of response.data.matches) {

      for (const referee of match.referees) {
        if (referees.value.indexOf(referee.first_name + ' ' + referee.last_name) === -1) {
          referees.value.push(referee.first_name + ' ' + referee.last_name)
        }
      }
    }
    referees.value = referees.value.sort()
    extractRefereesAndAssignMatches(response.data.matches)
  } catch (error) {
    console.error(error)
  }
}
fetchMatches()
setInterval(fetchMatches, 10000)

function extractRefereesAndAssignMatches(matches) {
  // Extract the list of referees from the list of matches
  for (const match of matches) {
    for (const referee of match.referees) {
      if (!refereesMatches.value.has(referee.first_name + ' ' + referee.last_name)) {
        refereesMatches.value.set(referee.first_name + ' ' + referee.last_name, [])
      }
    }
  }

  // Assign the matches to the referees
  for (const match of matches) {
    for (const referee of match.referees) {
      refereesMatches.value.get(referee.first_name + ' ' + referee.last_name).push(match)
    }
  }

  // Filter and sort
  const now = new Date() // Get the current time

  refereesMatches.value.forEach((matches, referee) => {
    const filteredSortedMatches = matches
      .filter(match => new Date(match.start).getTime() > now.getTime()) // Remove past matches
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()) // Sort by start time
      .map(match => ({
        ...match,
        formattedStart: formatDate(match.start) // Add formatted start time
      }))

    if (filteredSortedMatches.length > 0) {
      refereesMatches.value.set(referee, filteredSortedMatches)
    } else {
      refereesMatches.value.delete(referee) // Remove referee if they have no future matches
    }
  })
}

// Date formatting
const dayMap = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']

// Format start date as "MO 12:00"
function formatDate(isoString) {
  if (!isoString) return 'TBD' // Handle missing dates

  const date = new Date(isoString)
  const day = dayMap[date.getDay()]
  const time = date.toTimeString().slice(0, 5) // Get HH:MM format

  return `${day} ${time}`
}

// Actually logic for displaying matches and highlighting referees with upcoming matches
const clockPosition = ref(true)
const currentRefereeMatches = ref([])
const currentReferee = ref('')
const currentMatches = ref([])
const deselectTimeout = ref(null)
const AUTO_DESELECT_TIME = 10000 // Time in milliseconds (10 seconds)

const showMatches = (referee) => {
  console.log(currentReferee.value)
  clockPosition.value = !clockPosition.value
  currentReferee.value = referee
  currentMatches.value = refereesMatches.value.get(referee)

  deselectTimeout.value = setTimeout(deselectReferee, AUTO_DESELECT_TIME)
}


const deselectReferee = () => {
  currentReferee.value = null
  clockPosition.value = true
  currentMatches.value = []
  if (deselectTimeout.value) {
    clearTimeout(deselectTimeout.value)
    deselectTimeout.value = null
  }
}
</script>

<template>
  <div class="refereesPlan">
    <!-- Main Table, 20% Left for Referees, 80% Right for clock or Games of a Referee -->
    <table>
      <tbody>
      <tr>
        <!-- Referees -->
        <td class="referees">
          <ClockComponent class="clock-btn" v-if="!clockPosition" />
          <div v-for="referee in referees" :key="referee">
            <button @click="showMatches" class="submit-btn"
                    :style="{checked: referee === currentReferee}">{{ referee }}
            </button>
          </div>
        </td>
        <!-- Clock or Games of a Referee -->
        <td class="matches">
          <ClockComponent class="clock" v-if="clockPosition" />
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
            <tr v-for="match in currentRefereeMatches" :key="match.number">
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
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.refereesPlan {
  margin: 20px;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
}

.referees {
  width: 20%;
}

.submit-btn {
  text-decoration: none;
  border: 3px solid #263562;
  background-color: #263562;
  color: white;
  height: 100%;
  width: 100%;
  padding-left: 0.8em;
  padding-right: 0.8em;
  display: inline-block;
  font-weight: 700;
  font-size: 1em;
  text-align: center;
  white-space: nowrap;
  margin: 1%;
  border-radius: 5px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.submit-btn.checked {
  background-color: white;
  color: #263562;
}

.submit-btn.priority {
  border: 3px solid rgb(277, 0, 15);
  background-color: rgb(277, 0, 15);
}

.submit-btn.priority.checked {
  background-color: white;
  color: rgb(277, 0, 15);
}


.clock-btn {
  text-decoration: none;
  border: 0;
  height: 100%;
  width: 100%;
  padding-left: 0.2em;
  padding-right: 0.2em;
  display: inline-block;
  background: white;
  color: #333333;
  font-weight: 700;
  font-size: 2.5em;
  text-align: center;
  white-space: nowrap;
}

.clock {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  font-size: 14em;
  color: #333333;
}

.matches {
  width: 80%;
}
</style>
