// const codeGen = require("./codegen")
// const lexanalysis = require("./lexanalysis")
// const parser = require("./parser")
// const codeRunner = require("./code_runner")

const codeTextarea = document.getElementById('code');

function compile(input)
{
    const tokens = lexanalysis(input);
    console.log(tokens);
    const tree = parser(tokens);
    console.log(tree)
    const code = codegen(tree);
    console.log(code)
    return code;
}

const runButton = document.getElementById('btnRun');
runButton.addEventListener('click', () => {
    const code = codeTextarea.value;
    console.log(code);
    console.log(code.length)
    const executable_code = compile(code);
    codeRunner(executable_code);
});