
let questionsQuiz = [
    {
      question: "What does the abbreviation HTML stand for?",
      options: ["A- Hyper Text Markup Language", "B- Home Tool Markup Language", "C- Hyperlinks and Text Markup Language", "D- Hyperlink Text Markup Language"],
      Answer: "A- Hyper Text Markup Language"
    },
    {
      question: "What is the largest continent in the world?",
      options: ["A- Antarctica", "B- Africa", "C- America", "D- Asia"],
      Answer: "D- Asia"
    },
    {
      question: "Why We Use <br> Element?",
      options: ["A- To make text Bold", "B- To add breakline", "C- To make text Italic", "D- To create Horizontal line"],
      Answer: "B- To add breakline"
    },
    {
      question: "What is the largest continent in the world?",
      options: ["A- Antarctica", "B- Africa", "C- Asia", "D- America"],
      Answer: "C- Asia"
    },
    {
      question:"What is the programming language used to develop web applications?",
      options: ["A- HTML", "B- CSS", "C- JavaScript", "D- Python"],
      Answer: "C- JavaScript"
    },
  ];
  
  
  let currentQuestion = 0;
  let userScore = 0;
  
  let home = document.querySelector(".home");
  const quizTitle = document.getElementById("quizTitle");
  const userName = document.getElementById("userName");
  const questionContainer = document.getElementById("questionContainer");
  const submitButton = document.getElementById("submitButton");
  const nextButton = document.getElementById("nextButton");
  const startButton = document.getElementById("startButton");
  const error = document.getElementById("error");
  const choices = document.getElementById("choices");
  const resultContainer = document.getElementById("resultContainer");
  const startAgain = document.getElementById("startAgain");
  const leaderboardBtn = document.getElementById("leaderboard-Btn");
  const leaderPop = document.getElementById("leader-pop");
  const closeIcon = document.getElementById("closeIcon");
  
  
  //random
  const randomQuestion = []; 
  while (randomQuestion.length < 5) {
    const randomIndex = questionsQuiz[Math.floor(Math.random() * questionsQuiz.length)];
    if (!randomQuestion.includes(randomIndex)) {
      randomQuestion.push(randomIndex);
    }
  }

  document.forms[0].onsubmit = (e) => {
    e.preventDefault(); 
    
    error.textContent = "";
    if (userName.value === "") {
      error.textContent = "username required";
    } else{
     home.style.display = "none";
     questionContainer.style.display = "block";
  
     showQuestions(0);
     headerScore();
    }
  }
  
  nextButton.onclick = ()=>{
    if (currentQuestion < randomQuestion.length - 1) {
        currentQuestion++;
        showQuestions(currentQuestion);
        nextButton.classList.remove('active');
    }else {
        nextButton.style.display = "none";
        submitButton.style.display = "inline-block";
    }
  }
  
  submitButton.onclick = ()=>{
    showResult();
    storeValue();
  }
  
  closeIcon.onclick = ()=>{
    leaderPop.style.display = "none"; 
  }
  
  
  
  function showQuestions(index) {
    const questionNum = document.getElementById("questionNum");
    questionNum.textContent = "Question: " + (currentQuestion + 1) + " / " + randomQuestion.length;
  
    const question = document.getElementById("question");
    question.textContent = `${currentQuestion + 1}. ${randomQuestion[index].question}`;

  let optionTag = `<div class="option"><span>${randomQuestion[index].options[0]}</span></div>
  <div class="option"><span>${randomQuestion[index].options[1]}</span></div>
  <div class="option"><span>${randomQuestion[index].options[2]}</span></div>
  <div class="option"><span>${randomQuestion[index].options[3]}</span></div>`;
  
    choices.innerHTML = optionTag;
  
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
      option[i].setAttribute('onclick', 'optionSelected(this)'); 
    }
  }
  
  
  function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = randomQuestion[currentQuestion].Answer;
    let alloption = choices.children.length;
    if (userAnswer == correctAnswer) {
      answer.classList.add("correct");
      userScore += 1 ;
      headerScore();
    }else{
      answer.classList.add('incorrect');
      //if answer incorrect, auto selected correct answer
      for (let i = 0; i < alloption; i++) {
        if (choices.children[i].textContent == correctAnswer) {
          choices.children[i].setAttribute('class', 'option correct');
        }
      } 
    }
    //if user has selected, disabled all options
    for (let i = 0; i < alloption; i++) {
      choices.children[i].classList.add('disabled');
    }
    nextButton.classList.add('active');
  }
  
  
  
  function headerScore() {
    const scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.textContent = `Score: ${userScore} / ${questionsQuiz.length}`;
  }
  
  
  function showResult() {
      resultContainer.style.display = "block";
      questionContainer.style.display = "none";
      let result = document.getElementById('result');
      result.textContent = `${"The final result: " + userScore + " / " + questionsQuiz.length}`;
      result.style.margin = "20px";
      result.style.fontSize = "18px";
      leaderboardBtn.style.marginTop = "10px";
  }
  
  
  //localStorage
  function storeValue() {
    let user = userName.value;
    let score = userScore ;
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({user, score});
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));  
  }
  
  
  //Leaderboard
  let buttonClicked = false ;
  leaderboardBtn.addEventListener('click',(event)=>{
  event.preventDefault();
  leaderPop.style.display = "flex";
  const resultStorge = document.getElementById("resultStorge");
  let leaderBoard = JSON.parse(localStorage.getItem('leaderboard'));
  if (leaderBoard && leaderBoard.length > 0) {
    if (!buttonClicked) {
          leaderBoard.sort((a, b) => b.score - a.score);
    leaderBoard.forEach(player => {
      let listItem = document.createElement('li');
      listItem.textContent = `${player.user}: ${player.score}`;
      resultStorge.appendChild(listItem);
      buttonClicked = true;
    });
    }
  }
  });
  
  
  
  
  
  
  
  