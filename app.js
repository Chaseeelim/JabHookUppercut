// Jab vs Hook: The jab, being quicker and aimed straight forward, can disrupt the slower, more powerful hook as it comes around, thus winning the encounter.
// Hook vs Uppercut: The hook, being a wide, sweeping punch, can catch an opponent throwing an uppercut off-guard because the uppercut is typically thrown from a lower guard and requires the fighter to be closer.
// Uppercut vs Jab: The uppercut can exploit the opening created by the jab’s linear path, especially if the jabber is within close range or has overcommitted to their jab, allowing the uppercut to connect powerfully.

//Jab(Rock), Uppercut(Paper), Hook(Scissors)

let userScore = 0;
let compScore = 0;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const jab_div = document.getElementById("jab")
const uppercut_div = document.getElementById("uppercut")
const hook_div = document.getElementById("hook")
const user_name = document.getElementById("userName")
const modal = document.getElementById("winnerModal");
const modalContent = document.getElementById("winnerMessage");
const span = document.getElementsByClassName("close")[0];

function getCompChoice() {
    options = ["Jab", "Hook", "Uppercut"]
    const randomNum = Math.floor(Math.random() * 3)
    return options[randomNum]
}

function win(user_choice, comp_choice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    result_div.innerHTML = user_choice + " Beats " + comp_choice + " you win! "
    changeTextColor(result_div, 'green');
    declareWinner(true); // Pass true for user win

}

function lose(user_choice, comp_choice) {
    compScore++;
    compScore_span.innerHTML = compScore;
    result_div.innerHTML = user_choice + " loses to " + comp_choice + " you lose! "
    changeTextColor(result_div, 'red');
    declareWinner(false); // Pass false for computer win

}

function draw(user_choice, comp_choice) {
    result_div.innerHTML = user_choice + " equals to " + comp_choice + " It's a draw!"
    changeTextColor(result_div, 'gray');
}

function changeTextColor(element, color) {
    if (element) {
        element.style.color = color;
    }
}

function game(user_choice) {
    const comp_choice = getCompChoice()
    console.log(user_choice + comp_choice)
    switch (user_choice + comp_choice) {
        case "JabHook":
        case "UppercutJab":
        case "HookUppercut":
            win(user_choice, comp_choice);
            declareWinner()
            break;
        case "JabUppercut":
        case "UppercutHook":
        case "HookJab":
            lose(user_choice, comp_choice);
            declareWinner()
            break;
        case "JabJab":
        case "HookHook":
        case "UppercutUppercut":
            draw(user_choice, comp_choice);
            declareWinner()
            break;
    }
}

function declareWinner(userWins) {
    if (userScore === 10 || compScore === 10) {
        modalContent.innerHTML = userWins ?  document.getElementById('user-name').value + " Wins!" : "Byte Tyson Wins!";
        modalContent.className = userWins ? "modal-content win" : "modal-content lose";
        modal.style.display = "block";
        resetScores();
    }
}

function resetScores() {
    userScore = 0;
    compScore = 0;
    userScore_span.innerHTML = "0";
    compScore_span.innerHTML = "0";
}

jab_div.addEventListener("click", function () {
    tipsDisplay();
    game("Jab");
})

uppercut_div.addEventListener("click", function () {
    tipsDisplay();
    game("Uppercut");
})

hook_div.addEventListener("click", function () {
    tipsDisplay();
    game("Hook");
})

document.addEventListener('DOMContentLoaded', function() {
    // Get the popup elements
    var popupOverlay = document.getElementById('popupOverlay');
    var closePopupButton = document.getElementById('closePopup');
    var userNameInput = document.getElementById('user-name');
    var proceedButton = document.getElementById('closePopup');
    var userLabel = document.getElementById('user-label');

    proceedButton.addEventListener('click', function() {
        var userName = userNameInput.value;
        userLabel.innerHTML = userName;
    });

    // Show the popup when the page loads
    popupOverlay.style.display = 'flex';

    // Hide the popup when the close button is clicked
    closePopupButton.addEventListener('click', function() {
        popupOverlay.style.display = 'none';
    });

    // Handle sound button click
    document.getElementById('closePopup').addEventListener('click', function() {
        var sound = document.getElementById('buttonSound');
        sound.play();
    });
});

// tips display
function tipsDisplay() {
    fetch('tips.txt')  // Adjust the path to where your file is hosted on your server
        .then(response => response.text())
        .then(data => {
            const lines = data.split('\n'); // Split the content into lines
            const randomIndex = Math.floor(Math.random() * 9); // Get a random index
            const randomTip = lines[randomIndex].trim(); // Trim the line to remove extra whitespace
            document.getElementById('tips').textContent = randomTip; // Display the random tip
        })
        .catch(error => console.error('Error fetching the tips:', error));
};

span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

document.getElementById('jab').addEventListener('click', function() {
    var sound = document.getElementById('buttonSound');
    sound.play();
});

document.getElementById('uppercut').addEventListener('click', function() {
    var sound = document.getElementById('buttonSound');
    sound.play();
});

document.getElementById('hook').addEventListener('click', function() {
    var sound = document.getElementById('buttonSound');
    sound.play();
});


