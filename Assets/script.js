//declare variables
var qs = questions;
//15 seconds per quesitons
var time = qs.length * 15;
var index= 0;
var setInt;

// Start quiz function, hide start button and start clock with interval 1s
function startQuiz() {
    document.getElementById("start").classList.add("hidden");
    document.getElementById("begin").classList.remove("hidden");
    document.getElementById("status").textContent = "";
    setInt = setInterval(clock, 1000)
}

function clock() {
    time = time--;
    if (time >= 0) {
        document.getElementById("timer").textContent = time;
    }
    if (qs[index] != undefined) {
        // Show question
        document.getElementById("questions").textContent = qs[index].title;
        var list = document.createElement("list");
        list.classList.add("list-group");
        document.getElementById("choices").textContent = "";
        //Creat list for answers to be shown below the question
        for (var i=0; i <qs[index].choices.length; i++ ) {
            var li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = qs[index].choices[i];
            //Add event listener to click response, parses wehther true or false
            li.addEventListener("click", function () {
                var userChoice = this.textContent;
                var answer = qs[index].answer;
                if (userChoice === answer) {
                    document.getElementById("status").textContent = "Correct";
                }
                else {
                    time = time - 15; //deduct 15 seconds for incorrect answer
                    document.getElementById("status").textContent = "Wrong!";
                }
                index++;
                clearInterval(setInt);
                if (index < qs.length && time > 0) {
                    setTimeout(startQuiz, 500);
                }
                // else statement to reset quiz
                else {
                    document.getElementById("begin").classList.add("hidden");
                    document.getElementById("highscore").classList.remove("hidden");
                    document.getElementById("name").classList.remove("hidden");
                }
            });
            list.appendChild(li);
        }
        document.getElementById("choices").appendChild(list);
    }
    if (time % 10 === 0) {
        index++;
    }
    // else statement to reset the quiz
    else if (time <= 0) {
        clearInterval(setInt);
        document.getElementById("begin").classList.add("hidden");
        document.getElementById("highscore").classList.remove("hidden");
        document.getElementById("name").classList.remove("hidden");  
    }
}

// add event listeners to store scores
document.getElementById("add-name").addEventListener("click", function(){
    document.getElementById("name").classList.add("hidden");
    document.getElementById("score").classList.remove("hidden");
    var name = document.getElementById("initial-name").nodeValue;
    var currentTime = document.getElementById("timer").textContent;
    localStorage.setItem("highscore", currentTime);
    localStorage.setItem("name", name);
});

// event listener to start quiz
document.getElementById("start-btn").addEventListener("click", function () {
    startQuiz();
});

// event listener to store highscore to local storage
document.getElementById("clear").addEventListener("click", function() {
    const highScore = localStorage.getItem("highScore");
    if (highScore != undefined) {
        localStorage.setItem("highScore", "0");
    }
});

// event listener to rest the quiz
document.getElementById("back").addEventListener("click", function() {
    time = qs.length * 10;
    index = 0;
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("score").classList.add("hidden");
});
