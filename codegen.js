// function codegen(node)
// {
//     switch(node.type)
//     {
//         case 'Program': return node.body.map(codegen).join("\n");
//         case 'Declaration': return `const ${node.name} = ${node.value};`;
//         case 'Print': return `console.log(${node.expression});`;
//         default: return '';
//     }
// }

// // module.exports.codeGen = codegen;

function codegen(node)
{
    switch(node.type)
    {
        case 'Program': return node.body.map(codegen).join("\n");
        case 'Declaration': return `const ${node.name} = ${node.value};`;
        case 'Print': return `console.log(${node.expression});`;
        case 'IfStatement':
            let ifCode = `if ${node.condition} {\n`;
            console.log("gen-",node.branch)
            ifCode += node.branch.map(codegen).join("\n");
            ifCode += "\n}";
            console.log("ifcode",ifCode)
            return ifCode;
        case 'ElseStatement':
            let elseCode = "else {\n";
            elseCode += node.branch.map(codegen).join("\n");
            elseCode += "\n}";
            return elseCode;
        default: return '';
    }
}