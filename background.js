chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "check_tabs") {
    console.log("Received 'check_tabs' action");
    console.log("Max Tabs Type:", typeof message.maxTabs, "Value:", message.maxTabs);
    console.log("Slider Value Type:", typeof message.sliderValue, "Value:", message.sliderValue);

    // Query all open tabs
    chrome.tabs.query({}, async (tabs) => {
      const distractingTabs = [];
      //const tabNum = message.maxTabs.value;
      const tabNum = message.maxTabs;

      // Analyze each tab using the Gemini-based function
      for (const tab of tabs) {
        const isDistracting = await checkTabWithGemini(tab, message.sliderValue);
        if (isDistracting) {
          distractingTabs.push(tab);
          if (distractingTabs.length == tabNum) {
            break;
          }
        }
      }

      // Close all distracting tabs
      for (let i = 0; i < distractingTabs.length && i < tabNum; i++) {
        chrome.tabs.remove(distractingTabs[i].id);
      }

      console.log("Distracting tabs closed:", distractingTabs);

      // Send a response back to the popup script
      sendResponse({ status: "Processed tabs and closed distracting ones." });
    });

    // Return true to indicate asynchronous response
    return true;
  }
});

async function checkTabWithGemini(tab, slid) {
    //const prompt = `Is the website I'm using, ${tab.title}, distracting if I want to spend a total of ${slid} hours working? Answer no for basic productivity tools like Gmail and Google Drive. Provide a "yes" or "no" answer.`;
    const prompt = `Is the website I am using, ${tab.title}, distracting if I want to spend a total of ${slid} hours working? Answer "no" for basic productivity tools like Gmail and Google Drive, as well as common research sites. Provide ONLY a "yes" or "no" answer.`;
    const GEMINI_API_KEY = "[YOUR_KEY_HERE]";
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [{
                parts:[{
                    text: prompt
                }]
            }]
        }),
    });
  
    if (!response.ok) {
      console.error("Error contacting Gemini API");
      return false;
    }
  
    const data = await response.json();
    if ("candidates" in data && data.candidates.length > 0 && "content" in data.candidates[0] && "parts" in data.candidates[0].content && data.candidates[0].content.parts.length > 0 && "text" in data.candidates[0].content.parts[0]) {
        console.log("API Response:", data.candidates[0].content.parts[0].text);
        return data.candidates[0].content.parts[0].text.toLowerCase() == "yes";
    } else {
        console.log("something missing");
        return false;
    }
}
