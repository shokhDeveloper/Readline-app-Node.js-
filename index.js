const { quessions } = require("./quessions");
const rl = require("readline");
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function* handleQuession() {
  for (let i = 0; i < quessions?.length; i++) {
    yield quessions[i];
  }
}

let quession = handleQuession();
let currentQuession = quession.next().value;

readline.setPrompt(currentQuession.savol);
readline.prompt();

let answer = 0;
let errorAnswer = 0;

readline.on("line", (response) => {
  try {
    if (!currentQuession) {
      if (answer > quessions.length / 2) {
        console.log("Ajoyib natija");
      } else {
        console.log("Qoniqarsiz natija");
      }
      return readline.close();
    } else {
      if (response.toLowerCase() === currentQuession.javob.toLowerCase()) {
        answer++;
      } else {
        errorAnswer++;
      }
      currentQuession = quession.next().value;
      if (currentQuession) {
        readline.setPrompt(currentQuession.savol);
        readline.prompt();
      }
    }
  } catch (error) {
    console.log("Xatolik", error.message);
  }
});