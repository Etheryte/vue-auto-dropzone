module.exports = async function getComments(identifierNames: string[]) {
    const fs = require('fs').promises;
    const parser = require('@babel/parser');
    const traverse = require('@babel/traverse').default;

    const libPath = require.resolve('dropzone/dist/dropzone.js');

    try {
        const libString = await fs.readFile(libPath, 'utf8');
        const ast = parser.parse(libString);

        const comments: any = {};

        let prevNode, node;
        traverse(ast, {
            enter(path) {
                node = path.node;
                if (
                    // If we're in an object
                    prevNode && prevNode.type === 'ObjectProperty' &&
                    // The object has comments
                    prevNode.leadingComments &&
                    // And the identifier is one of the ones we're looking for
                    node.type === 'Identifier' && identifierNames.indexOf(node.name) !== -1
                ) {
                    const comments = prevNode.leadingComments.filter(x => x.type === 'CommentBlock');
                    if (comments.length) {
                        console.log('found', node.name);
                        console.log(comments);
                    }
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
