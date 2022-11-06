const userName = document.querySelector('#userName')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('h1') /* I changed the #final-score to h1 tag as it was giving errors in the console. This will just select the Div based on
the h1 tag versus the CSS #*/
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 6

finalScore.innerText = mostRecentScore;

userName.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !userName.value
});

saveHighScore = e => {
    console.log(localStorage.getItem('highScores'));
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: userName.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./highscores.html')
};