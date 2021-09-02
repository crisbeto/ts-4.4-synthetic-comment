import * as ts from 'typescript';

const program = ts.createProgram(['./sample.ts'], {
  module: ts.ModuleKind.CommonJS,
  importHelpers: true,
  lib: ['dom', 'es2015'],
  target: ts.ScriptTarget.ES2017,
  declaration: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: false,
});

const transformer: ts.TransformerFactory<ts.SourceFile> = context => {
  return sourceFile => {
    const visitor = (node: ts.Node): ts.Node => {
      if (ts.isClassDeclaration(node)) {
        const initializer = ts.createLiteral('hello');
        const prop = ts.createProperty(
            undefined, [ts.createToken(ts.SyntaxKind.StaticKeyword)],
            'customStaticProp', undefined, undefined, initializer);

        ts.setSyntheticLeadingComments(prop, [
          {
            kind: ts.SyntaxKind.MultiLineCommentTrivia,
            text: ' This should only exist once ',
            pos: -1,
            end: -1,
            hasTrailingNewLine: true,
          },
        ]);

        return ts.updateClassDeclaration(
            node, node.decorators, node.modifiers, node.name,
            node.typeParameters, node.heritageClauses, [...node.members, prop]);
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
};

program.emit(
    undefined, ((fileName, outputText) => {
      console.log(outputText);
      console.log('---------------------', fileName);
    }),
    undefined, undefined, {before: [transformer]});
