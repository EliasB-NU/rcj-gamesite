/*
* Here you can configure some simple stuff for the app.
*
* Currently the homepage has an link to the current standings, the upcoming and completed matches
* and a link to the rescue stats
*
* There is also a referee plan, where all referees are listed with their matches.
*
* Because Entry and LightWeight 1v1 have a lot of matches, they have also a separate page.
* The other leagues are listed on their own page.
*
* If you hava any questions, please contact me via email: braunelias@tghd.email
 */

// Select your tournament
const TournamentAbbreviation = 'vo25';

// Export the config
export default {
  api: 'https://rcjsoccersys.dankel.info/rest/v1/'+TournamentAbbreviation,

  // If each league stage should have a own cycled through stage or if they all should be on one for each league
  // Maybe you want this, if you int leagues only have a few games
  // Currently broken
  ShowIntLeaguesStagesIndividual: false,

  EntryAbbrev: 'et',
  LwLEntryAbbrev: 'lwl1v',

  displayRescue: true,
  rescueURL: 'https://portal.robocup.de/rescue/scoring/uebersicht/Vöhringen?discipline=0&interval=10&active=true&modal=false&printView=false',
};
