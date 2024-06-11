const dfaNumbers = {
  // Estados del autómata
  states: ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"],

  // Estado inicial
  initialState: "q0",

  // Conjunto de estados de aceptación
  acceptingStates: ["q2", "q4", "q7", "q9", "q10"],

  // Función para verificar si una cadena es aceptada por el autómata
  accept: function (input) {
    let currentState = this.initialState;
    for (let i = 0; i < input.length; i++) {
      let symbol = input[i];

      switch (currentState) {
        case "q0":
          if (symbol === "+" || symbol === "-") {
            currentState = "q1";
          } else if (symbol === "0") {
            currentState = "q8";
          } else if (symbol >= "1" && symbol <= "9") {
            currentState = "q2";
          } else if (symbol === "(") {
            currentState = "q11";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q1":
          if (symbol === "0") {
            currentState = "q8";
          } else if (symbol >= "1" && symbol <= "9") {
            currentState = "q2";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q2":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q2";
          } else if (symbol === ".") {
            currentState = "q3";
          } else if (symbol === "E" || symbol === "e") {
            currentState = "q5";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q3":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q4";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q4":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q4";
          } else if (symbol === "E" || symbol === "e") {
            currentState = "q5";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q5":
          if (symbol === "+" || symbol === "-") {
            currentState = "q6";
          } else if (symbol >= "0" && symbol <= "9") {
            currentState = "q7";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q6":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q7";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q7":
          if (symbol >= "0" && symbol <= "9") {
            currentState = "q7";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q8":
          if (symbol >= "0" && symbol <= "7") {
            currentState = "q10";
          } else if (symbol === "x" || symbol === "X") {
            currentState = "q9";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q9":
          if (
            (symbol >= "0" && symbol <= "9") ||
            (symbol >= "a" && symbol <= "f") ||
            (symbol >= "A" && symbol <= "F")
          ) {
            currentState = "q9";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q10":
          if (symbol >= "0" && symbol <= "7") {
            currentState = "q10";
          } else {
            return "No es un número en Java";
          }
          break;

        case "q11":
          if (symbol !== ")") {
            currentState = "q11";
          } else if (symbol === ")") {
            currentState = "q1";
          } else {
            return "No es un número en Java";
          }
          break;

        default:
          break;
      }
    }

    if (this.acceptingStates.includes(currentState)) {
      return 1;
    } else {
      return 0;
    }
  },
};

const dfaIdentifiers = {
  states: ["q0", "q1", "q2"],

  initialState: "q0",

  acceptingStates: ["q0", "q1"],

  accept: function (input) {
    let currentState = this.initialState;

    for (let i = 0; i < input.length; i++) {
      let symbol = input[i];

      switch (currentState) {
        case "q0":
          if (
            (symbol >= "A" && symbol <= "Z") ||
            (symbol >= "a" && symbol <= "z") ||
            symbol === "_"
          ) {
            currentState = "q1";
          } else {
            return "No es un identificador en Java";
          }
          break;

        case "q1":
          if (
            (symbol >= "A" && symbol <= "Z") ||
            (symbol >= "a" && symbol <= "z") ||
            (symbol >= "0" && symbol <= "9") ||
            symbol === "_"
          ) {
            currentState = "q1";
          } else {
            return "No es un identificador en Java";
          }
          break;

        default:
          break;
      }
    }

    if (this.acceptingStates.includes(currentState)) {
      return 1;
    } else {
      return "No es un identificador en Java";
    }
  },
};

const typesOfOperators = new Set([
  "+", 
  "-", 
  "*", 
  "/", 
  "%"
]);
const tiposDeDatos = new Set([
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
const palabrasReservadas = new Set([
  "auto", "break", "case", "char", "const", "continue",
  "default", "do", "double", "else", "enum", "extern",
  "float", "for", "goto", "if", "inline", "int",
  "long", "register", "restrict", "return", "short", "signed",
  "sizeof", "static", "struct", "switch", "typedef", "union",
  "unsigned", "void", "volatile", "while", "_Alignas", "_Alignof",
  "_Atomic", "_Bool", "_Complex", "_Generic", "_Imaginary",
  "_Noreturn", "_Static_assert", "_Thread_local"
]);


class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length > 0) {
      return this.items.pop();
    }
    return null;
  }

  top() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

class PDA {
  constructor() {
    this.stack = new Stack();
    this.currentState = "q1";
    this.acceptStates = new Set(["qa"]);
  }

  transition(input) {
    let state = this.currentState;
    switch (state) {
      case "q1":
        if ((dfaIdentifiers.accept(input) === 1) && (!tiposDeDatos.has(input)) && (!palabrasReservadas.has(input))) {
          this.stack.push("Z");
          state = "q2";
        } else {
          state = "qX";
        }
        break;

      case "q2":
        if (input === "=") {
          state = "q3";
        } else {
          state = "qX";
        }
        break;

      case "q3":
        if (input === "(") {
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
          state = "q3";
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
          state = "q3";
        } else if (
          dfaNumbers.accept(input) === 1) {
          state = "q4";
        } else if ((dfaIdentifiers.accept(input) === 1) && (!tiposDeDatos.has(input))) {
          state = "q7";
        } else {
          state = "qX";
        }

        break;

      case "q4":
        if (input === "(") {
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
          state = "q4";
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
          state = "q4";
        } else if (typesOfOperators.has(input)) {
          state = "q5";
        } else if (input === ";") {
          state = "qa";
        } else {
          state = "qX";
        }

        break;

      case "q5":
        if (input === "(") {
          // Si hay un '(' se apila un símbolo
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
          state = "q5";
        } else if (input === ")") {
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
          state = "q5";
        } else if (
          (dfaIdentifiers.accept(input) === 1) && (!tiposDeDatos.has(input)) ||
          dfaNumbers.accept(input) === 1
        ) {
          state = "q6";
        } else {
          state = "qX";
        }

        break;

      case "q6":
        if (input === "(") {
          // Si hay un '(' se apila un símbolo
          if (this.stack.top() === "Z") {
            this.stack.push("A");
          } else if (this.stack.top() === "A") {
            this.stack.push("A");
          }
          state = "q6";
        } else if (input === ")") {
          // Si hay un ')' se desapila un símbolo
          if (this.stack.top() === "A") {
            this.stack.pop();
          } else if (this.stack.top() === "Z") {
            this.stack.pop();
          }
          state = "q6";
        } else if (input === ";") {
          state = "qa"; // Estado de aceptación
        } else if (typesOfOperators.has(input)) {
          state = "q5";
        } else {
          state = "qX";
        }

        break;


      case "q7":
        if (input === "=") {
          state = "q3";
        } else if (typesOfOperators.has(input)) {
          state = "q5";
        } else {
          state = "qX";
        }
        break;

      default:
        state = "qX";
        break;
    }
    this.currentState = state;
  }
  accept(inputArray) {
    for (const symbol of inputArray) {
      console.log(
        `State: ${
          this.currentState
        }, Symbol: ${symbol} \n Stack: ${this.stack.items.join(", ")} \n`
      );
      this.transition(symbol);
      if (this.currentState === "qX") {
        console.log(
          `\x1b[31mRefused. Current state: ${
            this.currentState
          }, Stack contents: ${this.stack.items.join(
            ", "
          )}, Symbol: ${symbol}\x1b[0m`
        );
        return false;
      }
    }

    // Verificar que el estado actual esté en el conjunto de estados de aceptación y que la pila esté vacía
    if (this.acceptStates.has(this.currentState) && this.stack.top() === "Z") {
      console.log(
        `\x1b[32mACCEPTED => Current state: ${
          this.currentState
        }, Stack contents: ${this.stack.items.join(", ")}\x1b[0m`
      );
      return true;
    } else {
      console.log(
        `\x1b[31mREFUSED => Current state: ${
          this.currentState
        }, Stack contents: ${this.stack.items.join(", ")}\x1b[0m`
      );
      return false;
    }
  }
}

// Ejemplo de uso
const pda = new PDA();


// ACEPTADOS
//var String = "var12 = ( var / 12.12E+12 ) + 5 % ( 12.2 * 0x12A ) ;";
//var String= "A2 = A1 + 12 + C5 ;";
//var String = "AB = A * B / 100 - 59 ;";
//var String = "ABC = ( 340 % 2 ) + ( 12 - C ) ;";
//var String = "AC = 0312 + ox12AB * ( 5.12E+12 + B ) ;";
//var String = "Var1 = Var2 = Var3 = 8 ;";
//var String = "VAR = ( CatA + ( ( CatA + CatB ) * CatC ) ) * ( CatD - CatF ) ;";


// RECHAZADOS
//var String = "3 = A2 = 1 + 12 + C5 ;";
//var String = "AB = A * * B / 100 - 59 ;";
//var String = "ABC ( 340 % 2 ) ;";
//var String = "5var = 5 * data ;";
//var String = "x = int * 2 + x ;";
//var String = "info = cateto1 + cateto2 + ( ) - ) * ( ;";                            // REVISAR
//var String = "VAR = ( CatA + ( CatA + CatB ) * CatC ) ) * ( CatD - CatF ) ;";
//var String = "VAR = ( CatA + ( ( CatA + CatB ) * CatC ) ) * ( CatD - CatF ;";
//var String = "temp = 0284 * 0x1X2 - 3.14EE1.3 ;";
//var String = "typedef = val1 % val2 ;";



var inputString = String.split(" ");
console.log(pda.accept(inputString));
