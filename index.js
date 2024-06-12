
// Multiple questions.
// Each quiz has a set of questions.
// Each question, has a set of answers.

class Answer
{
    constructor(_id, _q_id, _answer_text, _isCorrect)
    {
        this.id = _id
        this.q_id = _q_id
        this.answer_text = _answer_text;
        this.isCorrect = _isCorrect;

        this.user_answer = false;
    }

    get_html()
    {
        let temp_id = `${this.q_id}_${this.id}`
        return (`
        <div class="flex flex-row justify-center gap-4">
            <div class="w-[20px] h-[20px] border-1 border-black rounded-full" style="background-color: white;" 
                id="${temp_id}" onclick="set_user_answer(${this.q_id}, ${this.id}, '${temp_id}');"></div>
            <p>${this.answer_text}</p>
        </div>
        `)
    }
}

class Question
{
    constructor(_id, _question_text)
    {
        this.id = _id
        this.question_text = _question_text
        this.Answers = []
    }

    check_answer(index)
    {
        return this.Answers[index].isCorrect
    }

    add_option(text, isCorrect)
    {
        this.Answers.push(new Answer(this.Answers.length, this.id, text, isCorrect));
    }

    get_html()
    {
        let answers_html = ""
        
        for (let index = 0; index < this.Answers.length; index++) {
            answers_html += this.Answers[index].get_html()
        }

        return (`
            <div class="flex flex-col gap-8 mb-8">
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

let Q1 = new Question(0, "What is micheal jacksons birthday")
Q1.add_option("2022-04-12", false)
Q1.add_option("2018-03-10", false)
Q1.add_option("2010-05-12", true )
Q1.add_option("2023-12-10", false)

let Q2 = new Question(1, "What is obamas birthday")
Q2.add_option("2022-04-12", false)
Q2.add_option("2018-03-10", true)
Q2.add_option("2010-05-12", false)
Q2.add_option("2023-12-10", false)

let Q3 = new Question(2, "What is Clintons birthday")
Q3.add_option("2022-04-12", false)
Q3.add_option("2018-03-10", false)
Q3.add_option("2010-05-12", false)
Q3.add_option("2023-12-10", true )

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
        for (let index = 0; index < Quiz_Driving.questions.length; index++) {
            const _question = Quiz_Driving.questions[index];
            let mistake = false;
            for (let _answer = 0; _answer < _question.Answers.length; _answer++) {
                const current_answer = _question.Answers[_answer];
                if(current_answer.user_answer !== current_answer.isCorrect)
                {
                    document.getElementById("Questions_container").innerHTML += `<p>Question ${index} is incorrect</p>`;
                    mistake = true;
                    break;
                }
            }
            if(!mistake)
            {
                document.getElementById("Questions_container").innerHTML += `<p>Question ${index} is correct</p>`
            }
        }
    }
    else{
        document.getElementById("Questions_container").innerHTML = loadQuiz(Quiz_Driving)
    }
}

function set_user_answer(question, option, id)
{
    Quiz_Driving.questions[question].Answers[option].user_answer = !Quiz_Driving.questions[question].Answers[option].user_answer;
    if(Quiz_Driving.questions[question].Answers[option].user_answer)
    {
        document.getElementById(id).style.backgroundColor = "blue";
    }
    else
    {
        document.getElementById(id).style.backgroundColor = "white";
    }
}

window.onload = () =>
{
    document.getElementById("Quiz_Title").innerText=Quiz_Driving.name
    document.getElementById("Quiz_Desc").innerText=Quiz_Driving.description

    document.getElementById("Questions_container").innerHTML += loadQuiz(Quiz_Driving)
}
