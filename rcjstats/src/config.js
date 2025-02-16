import {ref} from "vue";
import axios from "axios";

// Select your tournament
const tournamentAbbreviation = 'vo25';

// Gets all leagues
let leagues = ref([]);

async function fetchLeagues() {
  try {
    await axios
      .get('http://rcjsoccersys.dankel.info/rest/v1/'+tournamentAbbreviation+'/leagues')
      .then(response => {
        leagues = response.data;
      })
  } catch (error) {
    console.log(error);
  }
}
fetchLeagues().then(r => {});
setInterval(fetchLeagues, 600000);

// Export the config
export default {
  api: 'http://rcjsoccersys.dankel.info/rest/v1/'+tournamentAbbreviation,
  leagues: leagues,
};
