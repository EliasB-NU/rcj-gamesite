<script setup>
import { ref } from 'vue'
import axios from 'axios'
import config from '@/config.js'
import ClockComponent from '@/components/ClockComponent.vue'
import MatchComponent from '@/components/MatchComponent.vue'

// Define a reactive variable to store the list of matches
const refereesMatches = ref(new Map())
const referees = ref([])
const upcomingReferees = ref([])


async function fetchMatches() {
  refereesMatches.value = new Map()
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
  const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000) // Now + 10 minutes

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
      refereesMatches.value.delete(referee)
    }

    // Check if the referee has an upcoming match in the next 10 minutes
    const upcomingMatches = filteredSortedMatches.filter(match => new Date(match.start).getTime() < tenMinutesLater.getTime())
    upcomingReferees.value = []
    if (upcomingMatches.length > 0) {
      if (upcomingReferees.value.indexOf(referee) === -1) {
        upcomingReferees.value.push(referee)
      }
    } else {
      const index = upcomingReferees.value.indexOf(referee)
      if (index !== -1) {
        upcomingReferees.value.splice(index, 1)
      }
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
const currentReferee = ref('')
const currentMatches = ref([])
const amountOfReferees = ref(0)
const deselectTimeout = ref(null)


const showMatches = async (referee) => {
  if (deselectTimeout.value) {
    clearTimeout(deselectTimeout.value)
    deselectTimeout.value = null
  }
  currentReferee.value = ''
  currentMatches.value = []
  amountOfReferees.value = 0
  await fetchMatches()
  clockPosition.value = false
  currentReferee.value = referee
  amountOfReferees.value = Math.max(...refereesMatches.value.get(referee).map(match => match.referees.length))
  currentMatches.value = refereesMatches.value.get(referee)


  deselectTimeout.value = setTimeout(deselectReferee, 10000)
}


const deselectReferee = async () => {
  clockPosition.value = true
  currentReferee.value = ''
  currentMatches.value = []
  amountOfReferees.value = 0

  if (deselectTimeout.value) {
    clearTimeout(deselectTimeout.value)
    deselectTimeout.value = null
  }
}
</script>

<template>
  <div>
    <!-- Main Table, 20% Left for Referees, 80% Right for clock or Games of a Referee -->
    <table>
      <tbody>
      <tr>
        <!-- Referees -->
        <td class="referees-list">
          <ClockComponent class="clock-btn" v-if="!clockPosition" />
          <div v-for="referee in referees" :key="referee">
            <button
              :class="{ 'submit-btn': true, 'priority': upcomingReferees.includes(referee),  'checked': currentReferee === referee }"
              @click="showMatches(referee)"
            >
              {{ referee }}
            </button>
          </div>
        </td>

        <!-- Clock or Games of a Referee -->
        <td class="matches">
          <ClockComponent class="clock" v-if="clockPosition" />
          <MatchComponent
            v-if="!clockPosition"
            :matches="currentMatches"
            :amount-of-referees="amountOfReferees"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.referees-list {
  width: 20%;
  padding: 10px;
}

.matches {
  width: 80%;
  padding: 10px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  margin: 5px;
  background-color: #007bff;
  border: 3px solid #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.submit-btn.checked {
  background-color: white;
  color: #007bff;
}

.submit-btn.priority {
  background-color: #f44336;
  border-color: #f44336;
}

.submit-btn.priority:hover {
  background-color: #d32f2f;
}

.submit-btn.priority.checked {
  background-color: white;
  color: #f44336;
}

.clock {
  width: 100%;
  text-align: center;
  font-size: 14em;
  color: #333333;
  position: fixed;
  top: 30px;
}


.clock-btn {
  text-decoration: none;
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
</style>
