const question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text')); /* creating the array for all the questions */
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const timerBar = document.querySelector('#timer');

let currentQuestion ={};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [
    {
        question: 'What actor played Pinhead in the Hellraiser movies?',
        choice1: 'Doug Bradley',
        choice2: 'Martin Short',
        choice3: 'Rik Mayall',
        choice4: 'Tommy Wiseu',
        answer: 1, 
    },
    {
        question: 'What horror film is 100 years old this year(2022)?',
        choice1: 'Frankenstein',
        choice2: 'Nosferatu',
        choice3: 'Creature from the black lagoon',
        choice4: 'Plan 9 from outer space',
        answer: 2
        , 
    },
    {
        question: 'What real life serial killer was the inspiration for the Texas Chainsaw Massacre?',
        choice1: 'Sarah Quigly',
        choice2: 'Ted Bundy',
        choice3: 'Jeffrey Dhamer',
        choice4: 'Ed Gein',
        answer: 4, 
    },
    {
        question: 'How many times has Betelgeuse seen the film The Exorcist?',
        choice1: '167',
        choice2: '200',
        choice3: '1',
        choice4: '23',
        answer: 1, 
    },
    {
        question: 'How many people did Jason Voorhees kill in the first Friday the 13th?',
        choice1: '10',
        choice2: '2',
        choice3: '0',
        choice4: '4',
        answer: 3, 
    },
    {
        question: 'Who was Dannys imaginary friend in the the Shining?',
        choice1: 'Bob',
        choice2: 'Mark',
        choice3: 'Stephanie',
        choice4: 'Tony',
        answer: 4, 
    },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 6;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
};

getNewQuestion =() => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('./end.html')  /** once the game is done it will move the user to the end page where they can save their score */
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length) /** this will randomize each question asked so the quiz will be different each time */
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        
        acceptingAnswers =false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        
        }, 1000)


    });
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
/* This timer starts ticking down from 60 seconds. If the user does not complete the quiz within 60 seconds it will move them to the end page to see there score */
var timeleft = 60;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    window.location.href = "./end.html";
  } else {
    document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);

startGame()