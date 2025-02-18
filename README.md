# RCJ Gamesites

Fetches the all the games and standings from the Soccersys software by Marco Dankel and displays the game plan
on the gameplan site, the standings on a site and all the games for each referee on another site.

# How to deploy
First, fork the repo and setup github pages to deploy from a branch,
the default is `gh-pages`.  
In `src/config.js` set your tournament abbrev.
Then run following commands:

```bash
npm install

npm install gh-pages --save-dev

npm run deploy
```

For questions, contact me:
<braunelias@tghd.email>

# Future plans

 - [ ] Add an option to select which leagues to display
 - [ ] Make the selection of the tournament easier
 - [ ] More customisation (colors, logos, etc.)

If you want to contribute, feel free to open a pull request.
