// Array of messages to be displayed
const messages = [
    "I'm lost :'( give me the directions to your heart!",
	"Are you Google? 'Cause you've got everything I'm looking for.",
	"Hydrate!!",
	"Your eyes are like Ikea because I get lost in them.",
	"Are you a banana? 'Cause you're so a-peel-ing.",
	"You overheat my laptop with your file size and hotness",
	"Don't sleep too late!!",
	"I'm not an organ donor but you can take my heart",
	"for int i = 0; i <3 u; i++",
	"bleep bloop i love yoop",
	"if we were in a video game... my hearts would fill up every time I saw you",
	"wouldn't it be crazy if you called me right now?",
	"my hands are cold...",
	"are you a keyboard? 'Cause I want to SMASH you",
	"if you were an angle, you'd be acute. but you're just an angel.",
	"can I borrow a kiss? don't worry, I'll give it back with interest.",
	"GO CRUSH THE DAY!! (because I have a crush on you)",
	"Practice piano... don't let those fingers get too out of shape without me :)",
	"I'm a Trackmaniac for you.",
	"Watch out! Your brain is so big it might get stuck on your way out today!"
];

var allGivenMessages = [];
var currentIndex = 0;
var lastDate = "";  // To store the last update date

function save() {
    var save = {
        allGivenMessages: allGivenMessages,
        currentIndex: currentIndex,
        lastDate: lastDate
    };

    localStorage.setItem("save", JSON.stringify(save));
    console.log("Game Saved!");
}

function load() {
    var savedata = JSON.parse(localStorage.getItem("save"));

    if (savedata) {
        if (typeof savedata.allGivenMessages !== "undefined" && savedata.allGivenMessages !== null) {
            allGivenMessages = savedata.allGivenMessages;
        }
        if (typeof savedata.currentIndex !== "undefined" && savedata.currentIndex !== null) {
            currentIndex = savedata.currentIndex;
        }
        if (typeof savedata.lastDate !== "undefined" && savedata.lastDate !== null) {
            lastDate = savedata.lastDate;
        }
    }

    checkAndUpdateMessage();  // Check if we need to update the message
    displayPastMessages();  // Display previous messages
    console.log("Game Loaded! Current index:" + currentIndex);
}

function reset() {
    allGivenMessages = [];
    currentIndex = 0;
    lastDate = new Date().toISOString().split('T')[0];;

    save();
    load();
}

function checkAndUpdateMessage() {
    var today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    if (today !== lastDate) {
        // Only update the message if today is different from the last update date
        updateMessage();
        lastDate = today;
    } else {
        document.getElementById("message").innerText = messages[currentIndex]; // Display current message without updating index
    }
}

function updateMessage() {
    if (currentIndex < messages.length) {
        document.getElementById("message").innerText = messages[currentIndex];
        allGivenMessages.push(messages[currentIndex]);
        currentIndex += 1;
        save();  // Save after updating the message and index
    }
}

function displayPastMessages() {
    const messagesList = document.getElementById('messages-list'); // Correctly reference the messages-list element
    messagesList.innerHTML = ''; // Clear the list before populating

    for (let i = 0; i < currentIndex - 1; i++) {
        if (allGivenMessages[i]) {
            const messageItem = document.createElement('div');
            messageItem.innerText = allGivenMessages[i];
            messagesList.appendChild(messageItem);
        }
    }
}

setInterval(function autoSave() {
    save();
}, 10000);

window.onload = load; // Ensure load is called when the page loads