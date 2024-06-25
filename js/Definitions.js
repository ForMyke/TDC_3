export const regexDefinitions = {
  // Expresión regular para números
  numbers:
    /^(\+|-)?((\d+(\.\d*)?)|(\.\d+))([eE](\+|-)?\d+)?|(0[xX][0-9a-fA-F]+)|(0[0-7]+)$/,

  // Expresión regular para identificadores
  identifiers: /^[_a-zA-Z][_a-zA-Z0-9]*$/,
};

export const validateNumber = (input) => {
  return regexDefinitions.numbers.test(input) ? 1 : "No es un número en C";
};

export const validateIdentifier = (input) => {
  return regexDefinitions.identifiers.test(input)
    ? 1
    : "No es un identificador en C";
};

export const typesOfOperators = new Set(["+", "-", "*", "/", "%"]);

export const tiposDeDatos = new Set([
  "short",
  "int",
  "long",
  "unsigned short",
  "unsigned int",
  "unsigned long",
  "float",
  "double",
  "char",
]);

export const palabrasReservadas = new Set([
  "printf",
  "scanf",
  "return",
  "auto",
  "break",
  "case",
  "char",
  "const",
  "continue",
  "default",
  "do",
  "double",
  "else",
  "enum",
  "extern",
  "float",
  "for",
  "goto",
  "if",
  "inline",
  "int",
  "long",
  "register",
  "restrict",
  "return",
  "short",
  "signed",
  "sizeof",
  "static",
  "struct",
  "switch",
  "typedef",
  "union",
  "unsigned",
  "void",
  "volatile",
  "while",
  "_Alignas",
  "_Alignof",
  "_Atomic",
  "_Bool",
  "_Complex",
  "_Generic",
  "_Imaginary",
  "_Noreturn",
  "_Static_assert",
  "_Thread_local",
]);

export const extras = new Set([
  "printf",
  "scanf",
  "return",
  "#include",
  "{",
  "}",
]);
