const FUNCTIONS_TO_CONSTRUCTORS = new Set(['RegExp']);

export default function functionToConstructor({source}, {jscodeshift: j}, {printOptions = {quote: 'single'}}) {
  function isFunctionThatShouldBeConstructor(node) {
    return j.match(node, {
      type: j.Identifier.name,
      name: (name) => FUNCTIONS_TO_CONSTRUCTORS.has(name),
    });
  }

  return j(source)
    .find(j.CallExpression, {
      callee: isFunctionThatShouldBeConstructor,
    })
    .replaceWith(({node: {callee, arguments: args}}) => j.newExpression(callee, args))
    .toSource(printOptions);
}
