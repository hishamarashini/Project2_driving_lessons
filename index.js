
// Multiple quizes.
// Each quis has a set of questions.
// Each question, has a set of answers.

class Answer
{
    constructor(_answer_text, _isCorrect)
    {
        this.answer_text = _answer_text;
        this.isCorrect = _isCorrect;

        this.user_answer = false;
    }

    get_html()
    {
        return (`
        <div class="flex flex-row">
            <p>${this.answer_text}</p>
        </div>
        `)
    }
}

class Question
{
    constructor(_question_text, _answers)
    {
        this.question_text = _question_text
        this.Answers = _answers
    }

    check_answer(index)
    {
        return this.Answers[index].isCorrect
    }

    get_html()
    {
        let answers_html = ""
        
        for (let index = 0; index < this.Answers.length; index++) {
            answers_html += this.Answers[index].get_html()
        }

        return (`
            <div class="flex flex-col gap-4">
                <p>${this.question_text}</p>
                ${answers_html}
            </div>
        `)
    }
}

class Quiz
{
    constructor(_name, _description, _id, _questions)
    {
        this.name = _name;
        this.description = _description;
        this.id = _id;
        this.questions = _questions;
    }

    get_html()
    {
        let questions_html = ""
        
        for (let index = 0; index < this.questions.length; index++) {
            questions_html += this.questions[index].get_html()
        }
        return(`
            ${questions_html}
        `)
    }
}

let Answer_A = new Answer("2022-04-12", false)
let Answer_B = new Answer("2018-03-10", false)
let Answer_C = new Answer("2010-05-12", true )
let Answer_D = new Answer("2023-12-10", false)
let Q1 = new Question("What is micheal jacksons birthday", [Answer_A, Answer_B, Answer_C, Answer_D])

let Answer_A2 = new Answer("2022-04-12", true )
let Answer_B2 = new Answer("2018-03-10", false)
let Answer_C2 = new Answer("2010-05-12", false)
let Answer_D2 = new Answer("2023-12-10", false)
let Q2 = new Question("What is obamas birthday", [Answer_A2, Answer_B2, Answer_C2, Answer_D2])

let Answer_A3 = new Answer("2022-04-12", false)
let Answer_B3 = new Answer("2018-03-10", false)
let Answer_C3 = new Answer("2010-05-12", false)
let Answer_D3 = new Answer("2023-12-10", true )
let Q3 = new Question("What is Clintons birthday", [Answer_A3, Answer_B3, Answer_C3, Answer_D3])

let Quiz_Driving = new Quiz("Driving test", "A test about driving", 0, [Q1, Q2, Q3])
let current_question = 0

function loadQuiz(_quiz)
{
    return _quiz.questions[current_question].get_html()
}

function next()
{
    current_question++
    if(current_question == Quiz_Driving.questions.length)
    {
        document.getElementById("Questions_container").innerHTML = `<p>quiz is complete</p>`
    }
    else{
        document.getElementById("Questions_container").innerHTML = loadQuiz(Quiz_Driving)
    }
}

window.onload = () =>
{
    document.getElementById("Quiz_Title").innerText=Quiz_Driving.name
    document.getElementById("Quiz_Desc").innerText=Quiz_Driving.description

    document.getElementById("Questions_container").innerHTML += loadQuiz(Quiz_Driving)
}
