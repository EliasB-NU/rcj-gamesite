# RCJ Gamesites

Fetches the all the games and standings from the Soccersys software by Marco Dankel and displays the game plan
on the gameplan site, the standings on a site and all the games for each referee on another site.

# How to deploy
There are two ways to deploy the site.

## Github Pages
First, fork the repo and setup github pages to deploy from a branch,
the default is `gh-pages`.  
In `src/config.js` set your tournament abbrev.
Then run following commands:
```bash
npm install

npm install gh-pages --save-dev

npm run deploy
```
Simple as that, your site is now live.
If you don't use a custom domain, you need to change something in the 
vue.config.js file.
```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/rcj-gamesite/'
    : '/'
}
```
Replace the content of the `publicPath` with the name of your repository.
Currently it is set to `/`, because I tested it with a custom domain.

## Docker Stack
AS you see, there is a workflow.  
It comiles the code, then builds the docker image and then pushes it to the registry.
You need to set following variables
```bash
# Used for getting a ssl cert.
# If you don't want to use a ssl cert, you can remove the
# traefik labels with the cert provider in the docker-stack file.
# If you want to use another way of getting your ssl cert, I can assist you
# The domain is currently hardcoded in the docker-stack file.
CF_DNS_API_TOKEN='your cloudflare api token' 

# The ip to the remote host
REMOTE_HOST='your remote host ip'

# The user to ssh into the remote host
REMOTE_USER='your remote host user'

# The private key of that user
SSH_PRIVATE_KEY='your private key'
```
I used this [video](https://youtu.be/fuZoxuBiL9o) to setup my vps.  
I recommend [Hetzner](https://hetzner.cloud/?ref=5OX6l6qgshuX) (REF LINK, you get 20€, I get 10€) as a provider, because they have a good price-performance ratio.
My Instance is running on a cax11 instance with 2 vCPUs and 4GB of RAM.

For questions, [contact](mailto:braunelias@tghd.email) me

# Future plans

 - [ ] Add an option to select which leagues to display
 - [ ] Make the selection of the tournament easier
 - [ ] More customisation (colors, logos, etc.)

If you want to contribute, feel free to open a pull request.
