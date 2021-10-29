# Spootify Coding Challenge 🎧 &nbsp; ![hard](https://img.shields.io/badge/-Hard-red) ![time](https://img.shields.io/badge/%E2%8F%B0-60m-blue) 

&nbsp;
# Goals/Outcomes ✨
- To test knowledge of consuming APIs and handling responses
- Loading state and knowing where and how to make multiple API calls efficiently

&nbsp;
# Pre-requisites ✅
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
