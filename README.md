# RCJ Gamesites

Fetches the all the games and standings from the Soccersys software by Marco Dankel and displays the game plan
on the gameplan site, the standings on a site and all the games for each referee on another site.

# How to deploy
First, fork the repo and setup github pages to deploy from a branch,
the default is `gh-pages`.  
In `src/config.js` set your tournament abbrev.
Then run following commands:

```bash
npm run build

git add dist
git commit -m 'new build'

git subtree push --prefix dist origin gh-pages
```

For questions, contect me:
<braunelias@tghd.email>
