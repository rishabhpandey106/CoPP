function codegen(node)
{
    switch(node.type)
    {
        case 'Program': return node.body.map(codegen).join("\n");
        case 'Declaration': return `const ${node.name} = ${node.value};`;
        case 'Print': return `console.log(${node.expression});`;
        default: return '';
    }
}

// module.exports.codeGen = codegen;