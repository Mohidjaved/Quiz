import inquirer from "inquirer";
const quiz = [];
async function addQuestion() {
    const question = await inquirer.prompt([{
            name: "quest",
            type: "input",
            message: "Add Question"
        }]);
    const options = await inquirer.prompt([
        {
            name: "opt1",
            type: "input",
            message: "Add Option1"
        },
        {
            name: "opt2",
            type: "input",
            message: "Add Option2"
        },
        {
            name: "opt3",
            type: "input",
            message: "Add Option3"
        },
        {
            name: "opt4",
            type: "input",
            message: "Add Option4"
        }
    ]);
    const correctAnswer = await inquirer.prompt([{
            name: "ans",
            type: "list",
            message: "confirm the right answer",
            choices: [options.opt1, options.opt2, options.opt3, options.opt4]
        }]);
    quiz.push({
        question: question.quest,
        options: [options.opt1, options.opt2, options.opt3, options.opt4],
        correctAnswer: correctAnswer.ans
    });
}
async function runQuiz() {
    let score = 0;
    for (let i = 0; i < quiz.length; i++) {
        const userAnswer = await inquirer.prompt([{
                name: "userAns",
                type: "list",
                message: quiz[i].question,
                choices: quiz[i].options
            }]);
        if (userAnswer.userAns === quiz[i].correctAnswer) {
            score++;
            console.log("You guessed it correct");
        }
        else {
            console.log("You guessed it wrong!!!");
        }
        console.log(`Your score is ${score}/${quiz.length}`);
    }
}
async function main() {
    while (true) {
        const userChoice = await inquirer.prompt([{
                name: "choice",
                type: "list",
                message: "Select your choice",
                choices: ["Add Question", "Start Quiz", "Exit"]
            }]);
        if (userChoice.choice === "Add Question") {
            await addQuestion();
        }
        else if (userChoice.choice === "Start Quiz") {
            await runQuiz();
        }
        else if (userChoice.choice === "Exit") {
            break;
        }
    }
}
main();
