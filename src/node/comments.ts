module.exports = async function getComments(identifierNames: string[]) {
    const fs = require('fs').promises;
    const parser = require('@babel/parser');
    const traverse = require('@babel/traverse').default;

    const libPath = require.resolve('dropzone/dist/dropzone.js');

    try {
        const libString = await fs.readFile(libPath, 'utf8');
        const ast = parser.parse(libString);

        const comments: any = {};

        console.log(identifierNames);

        let prevNode, node;
        traverse(ast, {
            enter(path) {
                node = path.node;
                if (
                    node.type === 'Identifier' && identifierNames.indexOf(node.name) !== -1
                ) {
                    // console.log(node.name, prevNode.type);
                    // console.log(node);
                    // console.log('===');
                }
                prevNode = node;
            },
        });

        return comments;
    } catch (e) {
        console.error(e);
        (process as any).exit(1);
    }
};
