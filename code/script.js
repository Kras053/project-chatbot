// Page 1 - Login Page
// Get Hours & Minutes
let findTime = new Date().toTimeString().substr(0,5);
let time = findTime.replace(":", ".");

//Get Weekday (Define array, pull date, subtract 1 for array)
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const weekday = new Date();
let today = weekdays[weekday.getDay() - 1];

//Get Date (Fixed to remove 0 from 01-09 in date)
let date = new Date().toDateString().substr(8,2);
if (date < 10) {
  date = date.replace("0", "");
}

// Get Month (Define Array, Choose Array item)
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonth = new Date();
const month = months[currentMonth.getMonth()];

//Insert Time into Unlock Scren
const insertTime = document.getElementById("time");
insertTime.innerText = time

//Insert Date into Unlock Screen
const insertDate = document.getElementById("date");
insertDate.innerText = `${today}, ${date} ${month}`;

// Add event listener to keep input container PINK when clicked on
const usernameInput = document.querySelector('.login-container');
usernameInput.addEventListener('click', function() {
  this.classList.toggle("login-container--active")
})

// Page 2 - Chat Page
// DOM selectors & Global Variables
const chat = document.getElementById('chat')
const loginButton = document.querySelector('.login__button');
let userName = "";
const exNameTrigger = document.querySelector('.ex-send-btn');
const inputForm = document.querySelector('.input-form');


//Event Listener for Login Button Push   ////////////////////////////////////////// ADDED EVENT here within brackets
loginButton.addEventListener('click', function(event) {
  // prevent.Default stops page from reloading when clicking icon
  event.preventDefault();

  // Store nameString
  const nameString = document.getElementById('userName').value;
  console.log(nameString);

  // Correct nameString to userName (cut string after first name, correct Case)
  const nameString2 = nameString.split(" ")[0];
  console.log(nameString2);

  userName = nameString2.charAt(0).toUpperCase() + nameString2.substr(1).toLowerCase();

  // Hide Login Screen
  document.querySelector(".unlock-screen").style.visibility = "hidden";

  //Show Chat Screen
  document.querySelector(".chat-screen").style.visibility = "visible";

  greeting(userName);
  console.log(userName);
})

// This function will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/profile.png" alt="User Icon" class="chat-icon user-icon" />  
      </section>
    `
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/sassy.png" alt="Bestie Icon" class="chat-icon bestie-icon" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  // This little thing makes the chat scroll to the last message when there are too many to be shown in the chat box
  chat.scrollTop = chat.scrollHeight
}

// Starts here
const greeting = (userName) => {
  showMessage(`Heyyy ${userName}, I heard you just got dumped by that asshole... what was their name again?`, 'bot')
  // setTimeout(() => exNameInput(), 1000); tried timeDelay for users answer here
}

let exName = "";
let yearsTogether = "";

// Ex's Name

exNameTrigger.addEventListener('click', () => {
  event.preventDefault();
  exName = document.querySelector('.ex-name-input').value;
  console.log(exName);
  showMessage(`Their name was ${exName}...`, 'user');
  showMessage(`${exName}?? Eww such a gross name! Can't believe you dated someone called that! How many years were you together?`, 'bot');
  document.querySelector('.ex-name-input').style.display = "none";
  document.querySelector('.ex-send-btn').style.display = "none";
  inputForm.innerHTML += `
  <input class="years-input" type="number" autocomplete="off" name="relationshipYears" />
  <input class="years-send-btn send-btn" type="image" src="assets/send_arrow2.png" />
  `
  document.querySelector('.years-send-btn').addEventListener('click', () => {
    event.preventDefault();
    yearsTogether = document.querySelector('.years-input').value;
    console.log(yearsTogether);
    showMessage(`We were together for ${yearsTogether} years...`, 'user')
    setTimeout(showYears,1000)
  })

})

// Years Together

const showYears = () => {
if (yearsTogether === 0) {
  showMessage(`Not even a year? Thank god you got rid of him so fast! How are you feeling now?`, 'bot')
} else if (yearsTogether > 0 && yearsTogether < 3) {
  showMessage(`${yearsTogether} years huh.. Not too long luckily. How are you feeling?`, 'bot');
} else if (yearsTogether >= 3 && yearsTogether < 10) {
  showMessage(`${yearsTogether} years!! Wow what a waste of time. Thank god you're free. How are you feeling?`, 'bot')
} else if (yearsTogether > 9) {
  showMessage(`${yearsTogether} years!!! That's a whole lifetime. Should we plan their murder? How are you feeling?`, 'bot')
}
  document.querySelector('.years-input').style.display = "none";
  document.querySelector('.years-send-btn').style.display = "none";
    inputForm.innerHTML += `
  <input type="button" class="cry-emoji emoji-option" value="😭">
  <input type="button" class="puke-emoji emoji-option" value="🤮">
  <input type="button" class="angry-emoji emoji-option" value="🤬">
  `

  document.querySelector('.cry-emoji').addEventListener('click', () => {
    showMessage(`I'm so sad I can't stop crying... 😭 😭 😭`, 'user');
    setTimeout(crying, 1000);
  })

  document.querySelector('.puke-emoji').addEventListener('click', () => {
    showMessage(`I feel sick... Like I want to puke 🤮`, 'user');
    setTimeout(sick, 1000);
  })

  document.querySelector('.angry-emoji').addEventListener('click', () => {
    showMessage(`I'm so f*cking pissed!! 🤬 🤬 🤬`, 'user');
    setTimeout(angry, 1000);
  })
}


// Emoji Choices

const crying = () => {
  showMessage(`I get that you're sad but I can't believe you're crying over a trashbag called ${exName}!`, 'bot');
  showMessage(`What would make you feel better?`, 'bot');
  document.querySelector('.cry-emoji').style.display = "none";
  document.querySelector('.puke-emoji').style.display = "none";
  document.querySelector('.angry-emoji').style.display = "none";
  inputForm.innerHTML += `
  <select class="feel-better-options" name="options">
    <option value="uplift">Uplift me 🥺</option>
    <option value="trash">Trash ${exName}!</option>
    <option value="revenge">Revenge 😈</option>
  </select>
  <input class="options-send-btn send-btn" type="image" src="assets/send_arrow2.png" />
  `
  document.querySelector('.options-send-btn').addEventListener('click', () => {
  event.preventDefault();
  setTimeout(options, 1000);
  })
}

const sick = () => {
  showMessage(`I totally get it... You know, ${exName} always did have disgusting breath. Probably wipes back to front, too.`, 'bot');
  showMessage(`What can I do to make you feel better?`, 'bot');
  document.querySelector('.cry-emoji').style.display = "none";
  document.querySelector('.puke-emoji').style.display = "none";
  document.querySelector('.angry-emoji').style.display = "none";
  inputForm.innerHTML += `
  <select class="feel-better-options" name="options">
    <option value="uplift">Uplift me</option>
    <option value="trash">Be mean</option>
    <option value="revenge">Revenge 😈</option>
  </select>
  <input class="options-send-btn send-btn" type="image" src="assets/send_arrow2.png" />
  `

  document.querySelector('.options-send-btn').addEventListener('click', () => {
  event.preventDefault();
  setTimeout(options, 1000);
  })
}

const angry = () => {
  showMessage(`Me too! What should we do? Go to ${exName}'s house and set their car on fire?`, 'bot')
  showMessage(`I'm just kidding! But is there anything that would make you feel better?`, 'bot');
  document.querySelector('.cry-emoji').style.display = "none";
  document.querySelector('.puke-emoji').style.display = "none";
  document.querySelector('.angry-emoji').style.display = "none";
  inputForm.innerHTML += `
  <select class="feel-better-options" name="options">
    <option value="uplift">Uplift me</option>
    <option value="trash">Be mean</option>
    <option value="revenge">Revenge 😈</option>
  </select>
  <input class="options-send-btn send-btn" type="image" src="assets/send_arrow2.png" />
  `

  document.querySelector('.options-send-btn').addEventListener('click', () => {
  event.preventDefault();
  setTimeout(options, 1000);
  })
}


// Dropdown Choices

// const options = () => {
//   if 
// }

// const options {
//   if (options.value =
//   showMessage(`My confidence needs a boost 🥺`, 'user');
//   showMessage(`Say some mean things about ${exName}`, 'user');
//   showMessage(`I want revenge 😈`, 'user');
// }



// Reply to 3 worst things
/*send meme??*/
/*or a reply with buttons or a drop-down menue*/

// setTimeout(() => showMessage(message, sender), 1000);
