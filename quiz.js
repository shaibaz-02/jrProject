const questions = [
    {
        question: "The average grain size of the single phase microstructure is determined by",
        optionA: "astm grain size measurement",
        optionB: "Hayn’s linear intercept method",
        optionC: "both",
        optionD: "none",
        correctOption: "optionC"
    },

    {
        question: "Stereology is concerned with the measurement of macrostructural features ",
        optionA: "True",
        optionB: "False",
        optionC: "Both",
        optionD: "None",
        correctOption: "optionB"
    },

    {
        question: "Formula for  astm  grain size number",
        optionA: "n = 2^(G)-1",
        optionB: "n = 2^(G-1)",
        optionC: "n = 2*G-2",
        optionD: "n = G-1",
        correctOption: "optionB"
    },

    {
        question: "The partially visible grains are considered to as",
        optionA: "1*full grains",
        optionB: "(1/2)*full grains",
        optionC: "(1/4)*full grains",
        optionD: "(3/4)*full grains",
        correctOption: "optionC"
    },

    {
        question: "The total number of grains is  equal to 128 then ASTM grain size number is",
        optionA: "7",
        optionB: "8",
        optionC: "5",
        optionD: "9",
        correctOption: "optionB"
    },

    {
        question: "Average grain size is measured in millimeters ?",
        optionA: "True",
        optionB: "False",
        optionC: "Both",
        optionD: "None",
        correctOption: "optionB"
    },

    {
        question: "ASTM grain size number is 512 ,then total number of grain is",
        optionA: "10",
        optionB: "9",
        optionC: "8",
        optionD: "7",
        correctOption: "optionA"
    },

    {
        question: "In the magnification of photomicrograph is other than 100x,then we need to calculate N100 by N100=(magnification of micrograph at hand/100)*N_at given magnification",
        optionA: "True",
        optionB: "False",
        optionC: "Both",
        optionD: "None",
        correctOption: "optionB"
    },

    {
        question: "The greater the grain size number ,the microstructure have",
        optionA: "more grains and larger grains",
        optionB: "less grains and smaller grains",
        optionC: "less grains and larger grains",
        optionD: "more grains andsmaller grains",
        correctOption: "optionD"
    },

    {
        question: "If G1=9,G2=10 ,then which one has more number of grains(G1,G2 are astm grain size number)",
        optionA: "G1",
        optionB: "G2",
        optionC: "G1=G2",
        optionD: "Cannot be determined",
        correctOption: "optionD"
    },

    
]


let shuffledQuestions = [] //empty array to hold shuffled selected questions out of all available questions

function handleQuestions() { 
    //function to shuffle and push 10 questions to shuffledQuestions array
//app would be dealing with 10questions per session
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 //holds the current question number
let playerScore = 0  //holds the player score
let wrongAttempt = 0 //amount of wrong answers picked by player
let indexNumber = 0 //will be used in displaying next question

// function for displaying next question in the array to dom
//also handles displaying players and quiz information to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ //adding to player's score
            indexNumber++ //adding 1 to index so has to display next question..
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++ //adds 1 to wrong attempts 
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}



//called when the next button is called
function handleNextQuestion() {
    checkForAnswer() //check if player picked right or wrong option
    unCheckRadioButtons()
    //delays next question displaying for a second just for some effects so questions don't rush in on player
    setTimeout(() => {
        if (indexNumber <= 9) {
//displays next question as long as index number isn't greater than 9, remember index number starts from 0, so index 9 is question 10
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()//ends game if index number greater than 9 meaning we're already at the 10th question
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}

//closes score modal, resets game and reshuffles questions
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}