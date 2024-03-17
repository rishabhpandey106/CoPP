
function codeRunner(code)
{
    const outputElement = document.getElementById('output');
    outputElement.innerHTML = '';
    console.log = function(message) {
        outputElement.innerHTML += message + '<br>';
    };
    eval(code);
}

// module.exports.codeRunner = codeRunner;