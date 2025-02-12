// Constants
const endpoint = 'http://localhost:3000/';
let referees = [];

// Clock
async function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Get Data
async function getData() {
    try {
        const response = await fetch(endpoint+'get');
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();
        displayReferees(data);
    } catch (error) {
        console.log(error.message);
    }
}
setInterval(getData, 5000);
getData();

// Display Referees
function displayReferees(data) {
    const container = document.getElementById('mainTable');
    container.innerHTML = '';

    // Gather all the referees
    const duplicates = []
    data.forEach(element => {
        duplicates.push(element.schiri1);
        duplicates.push(element.schiri2);
    });
    referees = uniq(duplicates);
    referees.sort();

    // Display referees
    referees.forEach(element => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <button class="submit-btn">${element}</button>
        `;
        container.appendChild(tr);
        

        // Check for time till next game
        const now = new Date();
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
        const refereeGames = data.filter(d => d.schiri1 === element || d.schiri2 === element );

        const upcomingGame = refereeGames.find(game => {
            const gameTime = parseTimeString(game.time);
            return gameTime - now <= fiveMinutes && gameTime - now > 0;
        });

        if (upcomingGame) {
            // Todo: Highlight the referees who have upcoming games
        }
    });
    
}

// Display Games for specific referee


// Helpers
function uniq(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}

function parseTimeString(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set hours and minutes, reset seconds & ms
    return date;
}