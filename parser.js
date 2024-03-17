// function parser(tokens)
// {
//     const tree = {
//         type: 'Program',
//         body: []
//     }

//     while(tokens.length > 0)
//     {
//         let token = tokens.shift();

//         if(token.type === 'keyword' && token.value === 'le')
//         {
//             let declare = {
//                 type: 'Declaration',
//                 name: tokens.shift().value,
//                 value: null
//             }

//             if(tokens[0].type === 'operator' && tokens[0].value === '=')
//             {
//                 tokens.shift();

//                 let expression = '';
//                 while(tokens.length > 0 && tokens[0].type !== 'keyword')
//                 {
//                     expression += tokens.shift().value;
//                 }
//                 declare.value = expression.trim();
//             }
//             tree.body.push(declare);
//         }

//         if(token.type === 'keyword' && token.value === 'dikha')
//         {
//             tree.body.push({
//                 type: 'Print',
//                 expression: tokens.shift().value
//             })
//         }
//     }
//     return tree;
// }

// // module.exports.parser = parser;

function parser(tokens)
{
    const tree = {
        type: 'Program',
        body: []
    }

    while(tokens.length > 0)
    {
        let token = tokens.shift();

        if(token.type === 'keyword' && token.value === 'le')
        {
            let declare = {
                type: 'Declaration',
                name: tokens.shift().value,
                value: null
            }

            if(tokens[0].type === 'operator' && tokens[0].value === '=')
            {
                tokens.shift();

                let expression = '';
                while(tokens.length > 0 && tokens[0].type !== 'keyword')
                {
                    expression += tokens.shift().value;
                }
                declare.value = expression.trim();
            }
            tree.body.push(declare);
        }

        if(token.type === 'keyword' && token.value === 'dikha')
        {
            tree.body.push({
                type: 'Print',
                expression: tokens.shift().value
            })
        }

        if (token.type === 'keyword' && token.value === 'agar') {
            let condition = parseCondition(tokens);
            let branch = parseBlock(tokens);
            console.log("branch", branch)
            tree.body.push({
                type: 'IfStatement',
                condition: condition,
                branch: branch
            });
        }

        if (token.type === 'keyword' && token.value === 'warna') {
            let branch = parseBlock(tokens);
            console.log("branch 2 - ",branch)
            tree.body.push({
                type: 'ElseStatement',
                branch: branch
            });
        }
    }
    return tree;
}

function parseCondition(tokens) {
    let condition = '';
    while (tokens.length > 0 && tokens[0].value !== '{') {
        condition += tokens.shift().value;
    }
    return condition.trim();
}

function parseBlock(tokens) {
    const block = [];

    while (tokens.length > 0 && tokens[0].value !== '}') {
        let token = tokens.shift();

            // Check if the token is a keyword ('le', 'dikha', 'agar', 'warna')
        if (token.type === 'keyword') {
            let keyword = token.value;
            if (keyword === 'le') {
                let declaration = {
                    type: 'Declaration',
                    name: tokens.shift().value,
                    value: null
                };

                if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                    tokens.shift();
                    declaration.value = parseExpression(tokens);
                }

                block.push(declaration);
            } else if (keyword === 'dikha') {
                let printStatement = {
                    type: 'Print',
                    expression: tokens.shift().value
                };
                block.push(printStatement);
            }
            else if (keyword === 'agar') {
                let condition = parseCondition(tokens);
                let branch = parseBlock(tokens);
                let ifStatement = {
                    type: 'IfStatement',
                    condition: condition,
                    branch: branch
                };
                block.push(ifStatement);
            } else if (keyword === 'warna') {
                let branch = parseBlock(tokens);
                let elseStatement = {
                    type: 'ElseStatement',
                    branch: branch
                };
                block.push(elseStatement);
            }
        }
    }

    // Remove the closing curly brace '}'
    tokens.shift();
    return block;
}

function parseExpression(tokens) {
    let expression = '';

    while (tokens.length > 0 && tokens[0].type !== 'keyword') {
        expression += tokens.shift().value;
    }

    return expression.trim();
}