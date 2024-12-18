# YT2SPChromeExt.
Chrome Extension to Add Youtube songs to a Spotify playlist with a button click 


What do I still need to do: 

- Have Javascript pull artist and track from page and pass it to popup.js
- Get users ID somehow 
- Clean up code a bit 



## popup.html
- Creates popup visual that displays Song and Artist Information if available
- Displays button that user clicks to start action 

## popup.js 
- Runs when the extension is clicked or the popup appears
- Has direct access to the DOM of the popup and can commuicate with the background.js script 

## mainfest.json
- Configuration for the chrome extension 
- Defines which scrips run and their permissions 
- Specifies entry points for content scripts, background scripts, and UI components like popups 

## content.js
- Injected into webpages that match the URLs set in the manifest.json file 
- Runs in the context of the webpage. Can access the webpage DOM, but cannont access browser APIs
- Does not share variables or functions with the extensions other scripts directly

## background.js
- Runs persistently in the background 
- Handles tasks like network requests, tab management, or event listeners
- Can communicate with both content scripts and popup scripts 

## Execution Order: 
1) Initilization: 
    - manifest.json loads on installation or when Chrome starts
    - background.js script runs immediately 
    - Nothing else runs until their conidtions are met 
    - background.js runs persistently or wakes up as needed. It listens for events and performs tasks accordingly 
    - background.js acts as bridge between content.js and popup.js
2) Content Scrip Execution:
    - When a user visits a page listed in manifest.json (any youtube.com page in this applications case), content.js is injected into webpage 
    - content.js runs in the pages DOM context and can interact with it
    - content.js can send messages to background.js or popup.js 
    - When a youtube.com page is visited, content.js sends a message to background.js if it detects a video in the web page
        - background.js makes an API call to the ACR Cloud API. Sends the video link and recieves the song info if possible
3) Popup Script Execution: 
    - When the background.js file finds the song information, it opens the popup.html window
    - When popup.html is loaded, popup.js executes 
    - popup.js only runs when popup.html is open 
    - popup.js can interact with the popup DOM and communicate with background.js script 
