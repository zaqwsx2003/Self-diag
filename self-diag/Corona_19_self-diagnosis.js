// 질문 객체(생성자 함수)
function Question(text) {
    this.text = text; // 질문 텍스트
    this.choice = ['없음', '2~6일', '7~12일', '거의 매일']; // 선택할 답들(배열)
 }
 
 
 // 퀴즈 정보 객체
 function Quiz(questions) {
    this.score = 0; // 점수
    this.questions = questions; // 질문
    this.questionIndex = 0; // 질문 번호
 }
 
 var questions = [
    new Question('기분이 가라앉거나 우울하고, </br>희망이 없다고 느꼈다.'),
    new Question('평소에 하던일에 대한 </br> 흥미가 없어지거나 즐거움을 느끼지 못했다.'),
    new Question('잠들기가 너무 어렵거나, </br>잠을 너무 많이 잔다.'),
    new Question('잠들기가 어렵거나 자주 깼다.</br><font size=-0.1>(혹은 너무 많이 잤다.)'),
    new Question('       평소보다 식욕이 줄었다.</br><font size=-0.1>(혹은 평소보다 많이 먹는다.)'),
    new Question('내가 잘못했거나, 실패했다는 생각이 들었다. </br><font size=-0.1>(혹은 자신과 가족을 실망시켰다고 생각했다.)'),
    new Question('신문을 읽거나 TV를 보는 것과 </br>같은 일상적인 일에 집중할 수 없었다.'),
    new Question('차라리 죽는 것이 더 낫겠다고 생각했다.</br><font size=-0.1>(혹은 자해할 생각을 했다.)'),
 ];
 
 // 퀴즈 객체 생성
 var quiz = new Quiz(questions);
 
 // 질문 출력 함수
 function updateQuiz() {
    var question = document.getElementById('question');
    var idx = quiz.questionIndex + 1;
    var choice = document.querySelectorAll('.btn');
 
    // 질문 출력
    question.innerHTML = quiz.questions[quiz.questionIndex].text;
 
    // 선택 출력
    for (var i = 0; i < 4; i++) {
       choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }
 
    progress();
 }
 
 function progress() {
    var progress = document.getElementById('progress');
    progress.innerHTML = '질문 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
 }
 
 var btn = document.querySelectorAll('.btn');


 // 입력 및 정답 확인 함수
 function checkAnswer(i) {
    btn[i].addEventListener('click', function() {
       quiz.score += i;
       
       if (quiz.questionIndex < quiz.questions.length - 1) {
          quiz.questionIndex++;
          updateQuiz();
       } else {
          result();
       }
    });
 }
 
 function result() {
    var quizDiv = document.getElementById('quiz');
    var score = parseInt(quiz.score);
    var txt = '<h1>결과</h1>' + '<h2 id="score">당신의 점수: ' + score + '/' + (quiz.questions.length * 3) + '<br></h2>';
 
    quizDiv.innerHTML = txt;
 
    // 점수별 결과 텍스트
    if (score <= 4) {
       txt += '<h2>우울증이 아닙니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 5 && score <= 9) {
       txt += '<h2>가벼운 우울감이 있습니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 10 && score <= 14) {
       txt += '<h2>중간 정도의 우울감 입니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 15 && score <= 19) {
       txt += '<h2>우울증이 의심되는 단계 입니다.</br>병원 방문을 고려하는 게 좋습니다.</h2>';
       quizDiv.innerHTML = txt;
    } else if (score >= 20) {
       txt += '<h2>심각한 우울증을 겪고 있습니다.</br>즉시 정신과 의사를 찾아가야 합니다.</h2>';
       quizDiv.innerHTML =  txt;
    }
 }
 
 for (var i = 0; i < btn.length; i++) {
    checkAnswer(i);
 }
 
 updateQuiz();