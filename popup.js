document.addEventListener("DOMContentLoaded", () => {
    let sliderValue = 5; // Default value of the slider

    // Update slider value on input
    document.getElementById('slider-input').addEventListener('input', (event) => {
        sliderValue = event.target.value; // Update the variable
        console.log("Updated slider value:", sliderValue);
    });

    let maxTabs = 1;

    document.getElementById('max-tabs').addEventListener('input', (event) => {
        maxTabs = event.target.value; // Update the variable
        console.log("Updated tab value:", maxTabs);
    });

    document.getElementById('close-tabs').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: "check_tabs",
        sliderValue: sliderValue,
        maxTabs: maxTabs
        });
        document.getElementById('status').textContent = "Processing...";
    });
});