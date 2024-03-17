function lexanalysis(input)
{
    const tokens = [];

    let cursor = 0;

    while(cursor < input.length)
    {
        let char = input[cursor];

        if(/\s/.test(char))
        {
            cursor++;
            continue;
        }

        if(/[a-zA-Z]/.test(char))
        {
            let word = '';
            while(cursor < input.length && /[a-zA-Z0-9]/.test(char))
            {
                word += char;
                char = input[++cursor];
            }

            if(word == 'le' || word == 'dikha')
            {
                tokens.push({type: 'keyword', value: word});
            }
            else
            {
                tokens.push({type: 'identifier', value: word});
            }

            continue;
        }

        if(/[0-9]/.test(char))
        {
            let num = '';
            while(cursor < input.length && /[0-9]/.test(char))
            {
                num += char;
                char = input[++cursor];
            }

            tokens.push({type: 'number', value: parseInt(num)});

            continue;
        }

        if(/[\+\-\*\/\=]/.test(char))
        {
            tokens.push({type: 'operator', value: char });
            cursor++;
            continue;
        }
    }
    return tokens;
}

// module.exports.lexanalysis = lexanalysis;

