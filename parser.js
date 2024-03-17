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
    }
    return tree;
}

// module.exports.parser = parser;