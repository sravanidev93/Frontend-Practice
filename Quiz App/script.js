const QUESTIONS = [
    {
      id: 1,
      question: "Which planet in the solar system is known as the “Red Planet”?",
      options: {
        a: "Venus",
        b: "Earth",
        c: "Mars",
        d: "Jupiter"
      },
      correctAnswer: "c"
    },
    {
      id: 2,
      question: "What is the capital of Japan?",
      options: {
        a: "Beijing",
        b: "Tokyo",
        c: "Seoul",
        d: "Bangkok"
      },
      correctAnswer: "b"
    },
    {
      id: 3,
      question: "What is the name of the process by which plants convert sunlight into energy?",
      options: {
        a: "Respiration",
        b: "Photosynthesis",
        c: "Oxidation",
        d: "Evolution"
      },
      correctAnswer: "b"
    },
    {
      id: 4,
      question: "What chemical element is designated as “Hg”?",
      options: {
        a: "Silver",
        b: "Tin",
        c: "Copper",
        d: "Mercury"
      },
      correctAnswer: "d"
    },
    {
      id: 5,
      question: "Entomology is the science that studies:",
      options: {
        a: "Behavior of human beings",
        b: "Insects",
        c: "The origin and history of technical and scientific terms",
        d: "The formation of rocks"
      },
      correctAnswer: "b"
    },
    {
      id: 6,
      question: "Which animal is the national symbol of Australia?",
      options: {
        a: "Kangaroo",
        b: "Koala",
        c: "Emu",
        d: "Crocodile"
      },
      correctAnswer: "a"
    },
    {
      id: 7,
      question: "What is the phobia of thunder and rain?",
      options: {
        a: "Agoraphobia",
        b: "Ombrophobia",
        c: "Acrophobia",
        d: "Claustrophobia"
      },
      correctAnswer: "b"
    },
    {
      id: 8,
      question: "What does Carpe Diem mean in Latin?",
      options: {
        a: "Enjoy the moment",
        b: "Have no fear",
        c: "Sorry I blew it",
        d: "Hello"
      },
      correctAnswer: "a"
    },
    {
      id: 9,
      question: "Which one of the following countries is not in Africa?",
      options: {
        a: "Morocco",
        b: "Yemen",
        c: "Sudan",
        d: "Algeria"
      },
      correctAnswer: "b"
    },
    {
      id: 10,
      question: "Which element is the main constituent of diamonds?",
      options: {
        a: "Carbon",
        b: "Oxygen",
        c: "Silver",
        d: "Gold"
      },
      correctAnswer: "a"
    }
  ];
  
document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelector(".slides");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const submit = document.getElementById("submit");
    const resultText=document.getElementById("result");
    const scoreText=document.getElementById("score");
    const resetBtn=document.getElementById("reset");

    resetBtn.style.visibility="hidden";
    resultText.style.visibility="hidden";
    scoreText.style.visibility="hidden";
    let CURRENT_SLIDE = 0;
    let answeredQuestions = []

    function createQuizSlide(num) {
        CURRENT_SLIDE = num;
        let data = QUESTIONS[num];
        const slide = document.createElement("div");
        // slide.setAttribute("class", "slide")
        const question = document.createElement("div");
        question.setAttribute("class", "question");
        question.innerText = data.question;
        slide.appendChild(question);
        const options = document.createElement("div");
        options.setAttribute("class", "options");
        Object.entries(data.options).forEach((keys) => {
            // console.log(keys);

            //keys [option number,option text] array form
            const option = document.createElement("div");
            const inputOption = document.createElement("input");
            inputOption.setAttribute("class", "input-option");
            inputOption.setAttribute("type", "radio");
            inputOption.setAttribute("name", num);
            inputOption.setAttribute("value", keys[0]);
            inputOption.setAttribute("questionId", data.id);

            inputOption.setAttribute("id", `${data.id} ${keys[0]}`);
            inputOption.addEventListener("click", (event) => addAnsweredQuestions(event));

            const answered=answeredQuestions.find(item=>item.questionId===data.id);
            if(answered && answered.answerChosen===keys[0]){
                inputOption.checked=true;
            }

            option.appendChild(inputOption);
            const optionText = document.createElement("span");
            optionText.innerText = keys[1];
            optionText.setAttribute("class", "option");
            option.appendChild(optionText);
            options.appendChild(option);
        });
        slide.appendChild(options);
        slides.appendChild(slide);
        prevNextEnability();
    }


    function addAnsweredQuestions(event) {
        const currId=event.target.id;
        const questionId=parseInt(currId.split(" ")[0]);
        const answered = answeredQuestions.find(question => question.questionId == questionId);
        if (!answered) {
            let data = {
                id: answeredQuestions.length + 1,
                questionId: questionId,
                answerChosen: event.target.value
            }
            checkAnswer(data);
            answeredQuestions.push(data)
        }else{
            answered.answerChosen=event.target.value;
            checkAnswer(answered);

        }
        // console.log(answeredQuestions)
    }

    function checkAnswer(answeredObj){
        const question=QUESTIONS.find(item=>item.id===parseInt(answeredObj.questionId));
        const result=question.correctAnswer===answeredObj.answerChosen;
        answeredObj.isCorrect=result;
    }

    function prevNextEnability() {
        if (CURRENT_SLIDE === 0) {
            // prev.setAttribute("disabled","disabled");
            // prev.innerText="None";
            // prev.style.display="none";
            // next.removeAttribute("disabled");
            // next.innerText="Next";
            // next.style.display="block";
            prev.style.visibility = "hidden";
        } else if (CURRENT_SLIDE === QUESTIONS.length - 1) {
            // next.setAttribute("disabled","disabled");
            // next.innerText="None";
            // prev.removeAttribute("disabled");
            // prev.innerText="Prev";
            // prev.style.display="block";
            // next.style.display="none";
            next.style.visibility = "hidden";
        } else {
            // next.removeAttribute("disabled");
            // prev.removeAttribute("disabled");
            // prev.innerText="Prev";
            // next.innerText="Next";
            // prev.style.display="block";
            // next.style.display="block";
            prev.style.visibility = "visible";
            next.style.visibility = "visible";
        }
    }


    createQuizSlide(0);


    function generateScore(total,correct){
        const rightAnswers=correct;
        const wrongAnswers=total-correct;
        const score=(rightAnswers*10)-(wrongAnswers*2);
        return score;

    }


    function submitClick(){
        if(answeredQuestions.length!==QUESTIONS.length){
            alert("Please answer all the questions before you submit");
        }else{
            submit.style.visibility="hidden";
            prev.style.visibility = "hidden";
            next.style.visibility = "hidden";
            resetBtn.style.visibility="visible";
            resultText.style.visibility="visible";
            scoreText.style.visibility="visible";
            const correctlyAnswered=answeredQuestions.filter(item=>item.isCorrect===true);
            const score=generateScore(QUESTIONS.length,correctlyAnswered.length);
            const totalScore=QUESTIONS.length*10;
            const displayResult=`${correctlyAnswered.length} of ${QUESTIONS.length} are correct`;
            const displayScore=`Your Score:${score} out of Total Score ${totalScore}`;
            resultText.innerText=displayResult;
            scoreText.innerText=displayScore;
        }
    }

    resetBtn.addEventListener("click",function (){
        slides.innerHTML="";
        answeredQuestions=[];
        CURRENT_SLIDE=0;
        resetBtn.style.visibility="hidden";
        resultText.style.visibility="hidden";
        scoreText.style.visibility="hidden";
        createQuizSlide(CURRENT_SLIDE);
        submit.style.visibility = "visible";
        next.style.visibility = "visible";
        })



    function prevClick() {
        if (CURRENT_SLIDE !== 0) {
            slides.innerText = "";
            createQuizSlide(CURRENT_SLIDE - 1);
        }
    }


    function nextClick() {
        if (CURRENT_SLIDE !== QUESTIONS.length - 1) {
            slides.innerText = "";
            createQuizSlide(CURRENT_SLIDE + 1);
        }
    }


    prev.addEventListener("click", prevClick);
    next.addEventListener("click", nextClick);
    submit.addEventListener("click",submitClick);

})