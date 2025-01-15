We envisioned a browser extension that prompts the user to press a button to mute distractions. The extension asks how long to mute distractions for and displays a timer on the browser extension's icon. It also initially asks for permission to close the user's distracting tabs.

To more accurately identify the users’ distractions, the extension asks what kind of work the user wants to do and what they find most distracting. The extension then queries chatgpt: "is [x website] distracting, especially for a user who does [y work] and finds [z distractions] distracting?" and closes websites that are distracting with a prompt to open them back up (do not override system dialogues warning of unsaved work to close the tab though) and keeps track of websites correctly closed and adds them to known distractions and keeps track of incorrect closures and adds them to known work


## Inspiration
As college students living in a world filled with distractions, we wanted to create a browser extension that helps to keep us accountable when it comes to staying focused on school, work, or whatever productive task we are accomplishing. Oftentimes, when we are “locking in”, we are tempted to open up distractions like Instagram and YouTube. This struggle inspired us to create the Distractionator that acts as a barrier that prevents us from opening distractions. 

## What it does
The Distractionator shuts down distracting tabs automatically based on user input about the number of hours they intend to spend working and the maximum number of tabs they intend to close.

## How we built it
Since an app that closes tabs would require a lot of security permissions, we decided to build Distractionator as a Chrome extension so that it would have access to browser tabs. The frontend of the extension is built with HTML/CSS, and we coded the backend with vanilla JavaScript. Since we didn’t have time to create an AI model from scratch, we decided to use Gemini API.

## Challenges we ran into
When we first came up with the idea to stop distractions, we struggled to decide whether or not we needed a database to store the URLs, and were in fact lost as to how to approach this idea through code. 
As we started building the Chrome Extension, we realized that Google required us to implement OAuth 2.0 authentication in order for us to gain access tokens to use the Gemini AI model. We troubleshot this for 3 hours, trying to set up Google Sign-In, to no avail. In the end, we found a way to bypass this (using REST API instead of Module API).
Once our extension was complete, we found out that Gemini AI is not as accurate as we had hoped, classifying even productive websites as distractions, thus requiring us to spend a long time workshopping prompts to target only distracting websites. (This is still a work in progress.)

## Accomplishments that we're proud of
We figured out how to implement AI into this Chrome Extension that successfully closed certain desired apps and functioned the way we coded it to.

## What we learned
Coding a Chrome browser extension, integrating AI via API, utilizing Google Gemini to generate responses

## What's next for Distractionator
Distractionator can be further developed in many ways because of the huge potential the Extension has to add different aspects. We plan to improve the AI model that determines which websites are distracting, as well as add more user inputs to better tailor what distractions are closed. Additionally, we also want to track how long each tab has been active as another data point to feed the AI model. We can also track the user’s search history (with permission, of course) and monitor the time spent on each website to determine which ones are considered distractions and which are considered productive, thereby generating a blacklist and whitelist. Finally, we can implement different AI models and allow the user to choose which model they prefer. 
