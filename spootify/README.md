# Spootify Coding Challenge 🎧 &nbsp; ![hard](https://img.shields.io/badge/-Hard-red) ![time](https://img.shields.io/badge/%E2%8F%B0-60m-blue) 

&nbsp;
# Goals/Outcomes ✨
- To test knowledge of consuming APIs and handling responses
- Loading state and knowing where and how to make multiple API calls efficiently

&nbsp;
# Pre-requisites ✅
- Make sure you have npm installed https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- Do NOT push to github. If you do then let me (Vraj) know and I will remove your commit. My email is vraj.shah@vanderbilt.edu
- Before you run `npm install` make sure that you are in the correct directory. Change it with `cd spootify/`
- Before you start coding make sure to run `npm install`
- You should be able to run a local version of your project with `npm start`
- You can quit your build and return to the terminal by hitting `ctrl+c`. This is the command on Mac and it should be the same on windows 
- Add your Spotify client ID & secret to a `.env` file in root using the environment variables `REACT_APP_SPOTIFY_CLIENT_ID` and `REACT_APP_SPOTIFY_CLIENT_SECRET`
  - Note. **Never add this type of config to version control. This would usually come from your build server.**

&nbsp;
# Requirements 📖
- Fetch and display *Released This Week* songs
  - Use the API path `new-releases`
- Fetch and display *Featured Playlists*
  - Use the API path `featured-playlists`
- Fetch and display *Browse* genres
  - Use the API path `categories`
- Loading state/UI *(optional, current UX is already clean)*

&nbsp;
# Think about 💡
- Taking a look at the Spotify API documentation
- If you have no idea where to start try looking up APIs and how to process them with JavaScript. You can also use 
ChatGPT or other tools to teach you where to go 
- Do you resolve each API request one after the other or in parallel?
- Where do you make the API requests?
- How much logic do you offload out of the UI components?

&nbsp;
# What's Already Been Done 🏁
- UI/UX for all elements, including previews (mobile responsive)

&nbsp;
# Screenshots 🌄
&nbsp;
![screenshot-desktop](https://puu.sh/GwPLE/3be580156a.png)
<img alt="screenshot-mobile" width=400 src="https://puu.sh/GwPLS/0bcb566d23.png" />
