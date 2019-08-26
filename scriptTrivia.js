let questionNumber = 0;
let scoreTracker = 0;

function startQuiz () {
  $('.start').on('click', function (event) {
  $('.quizStart').addClass('hide');
  displayQuestion();
  $('.questionNumber').text(questionNumber+1);
});
}

function displayQuestion() {
  $('.questionAnswerForm').html(generateQuestion());
}

function generateQuestion () {
  if (questionNumber < STORE.length) {
    return `<div class="question">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <div class="answerOption">
    <ul id="ans">
    <li>
    <input tabindex="0" type="radio" value="${STORE[questionNumber].answers[0]}" name="answer">
    <span>${STORE[questionNumber].answers[0]}</span>
    </li>
    <li>
    <input  type="radio" value="${STORE[questionNumber].answers[1]}" name="answer">
    <span>${STORE[questionNumber].answers[1]}</span>
    </li>
    <li>
    <input  type="radio" value="${STORE[questionNumber].answers[2]}" name="answer">
    <span>${STORE[questionNumber].answers[2]}</span>
    </li>
    <li>
    <input  type="radio" value="${STORE[questionNumber].answers[3]}" name="answer">
    <span>${STORE[questionNumber].answers[3]}</span>
    </li>
     </ul>
    </div>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    showResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}


function userSelectAnswer () {
  $(document).on('click', 'form button[type=submit]', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    if(selected.length === 0 ){
      alert("Please selected one option");
      return;
    }
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      $('.score').text(++scoreTracker);
      ifAnswerIsCorrect();
    } else {
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
}

function userAnswerFeedbackCorrect () {
  $('.questionAnswerForm').html(`<div class="container">
                                     <div class= "feedback">
                                        <p>Right!!!</p>
                                     </div>
                                      <div class="icon">
                                      <img src="${STORE[questionNumber].icon}" class="autoFit"/>
                                      </div>    
                                     <div class="btn-holder"> 
                                        <button type=button class="nextButton">Next</button>
                                     </div> 
                                  </div>`);
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackWrong () {
  $('.questionAnswerForm').html(`<div class="container">
                                     <div class= "feedback">
                                        <p>Wrong!!!</p>
                                     </div>
                                      <div class="icon">
                                      <img src="${STORE[questionNumber].icon}" class="autoFit"/>
                                      </div>    
                                     <div class="btn-holder"> 
                                        <button type=button class="nextButton">Next</button>
                                     </div> 
                                  </div>`);
}

function showResults() {
  if (scoreTracker === 10){
  $('.questionAnswerForm').html(`<div class="container">
                                     <div class= "feedback">
                                        <p>You got all right!!!</p>
                                     </div> 
                                     <div class="icon">
                                     <img src="data:image/jpeg;base64,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" alt="Happy" class="autoFit"/>
                                      </div>  
                                     <div class="btn-holder"> 
                                        <button type=button class="restartButton">Restart</button>
                                     </div> 
                                  </div>`);
                          }
   else if (scoreTracker > 6) {
    $('.questionAnswerForm').html(`<div class="container">
    <div class= "feedback">
       <p>You did great!!!</p>
    </div> 
    <div class="icon">
    <img src="https://cdn3.iconfinder.com/data/icons/smileys-people-smiley-essential/48/v-01-512.png" alt="smile" class="autoFit"/>
     </div>  
    <div class="btn-holder"> 
       <button type=button class="restartButton">Restart</button>
    </div> 
 </div>`);
   }
   else {
    $('.questionAnswerForm').html(`<div class="container">
    <div class= "feedback">
       <p>You should probablly restart!!!</p>
    </div> 
    <div class="icon">
    <img src="https://static.thenounproject.com/png/1292626-200.png" alt="cry" class="autoFit"/>
     </div>  
    <div class="btn-holder"> 
       <button type=button class="restartButton">Restart</button>
    </div> 
 </div>`);

   }

}

function displayNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    questionNumber++;
    $('.questionNumber').text(questionNumber+1);
    displayQuestion();
  });
}

function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

function createGame () {
  startQuiz();
  userSelectAnswer();
  displayNextQuestion();
}

$(createGame);