import nltk
from nltk import CFG
import json

# Crear un etiquetador de expresiones regulares
regexp_tagger = nltk.RegexpTagger(
    [
        (r"^[0-9]+$", 'Entero'),
        (r"^0x[0-9A-Fa-f]+$", 'Hex'),
        (r"^[a-zA-Z_][a-zA-Z0-9_]*$", 'Identificador'),
        (r"^[+-]?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?$", 'NotacionCientifica'),
        (r"^=$", 'Igual'),
        (r"^;$", 'PComa'),
        (r"^\+$", 'Suma'),
        (r"^\-$", 'Resta'),
        (r"^\*$", 'Mult'),
        (r"^%$", 'Porce'),
        (r"^/$", 'Div'),
        (r"^\($", 'pAbre'),
        (r"^\)$", 'pCierre'),
    ]
)

# Definir una gramática libre de contexto
grammar = CFG.fromstring("""
    S -> Asignacion
    Asignacion -> Identificador Igual Expresion PComa | Identificador Igual Asignacion
    Expresion -> Expresion Suma Termino | Expresion Resta Termino | Termino
    Termino -> Termino Mult Factor | Termino Div Factor | Termino Porce Factor | Factor
    Factor -> pAbre Expresion pCierre | Numero | Identificador
    Numero -> Entero | Hex | NotacionCientifica
    Identificador -> 'Identificador'
    Entero -> 'Entero'
    Hex -> 'Hex'
    NotacionCientifica -> 'NotacionCientifica'
    Igual -> 'Igual'
    PComa -> 'PComa'
    Suma -> 'Suma'
    Resta -> 'Resta'
    Div -> 'Div'
    pAbre -> 'pAbre'
    pCierre -> 'pCierre'
""")

# Crear el parser
parser = nltk.ChartParser(grammar)

# Función para convertir árbol a diccionario
def tree_to_dict(tree):
    return {
        "name": tree.label(),
        "children": [tree_to_dict(child) if isinstance(child, nltk.Tree) else {"name": child} for child in tree]
    }

# Leer expresiones del archivo
with open('./code/expressions.txt', 'r') as file:
    expressions = file.readlines()

trees_data = []
invalid_expressions = []

# Procesar cada expresión
for i, expression in enumerate(expressions):
    #tokenizamos la expresión
    tokens = expression.strip().split()
    #etiquetamos los tokens
    tagged_tokens = regexp_tagger.tag(tokens)
    tagged_sentence = [tag for token, tag in tagged_tokens]
    try:
        trees = [tree for tree in parser.parse(tagged_sentence)]
        print(trees)
        if trees:
            tree = trees[0]
            tree_data = tree_to_dict(tree)
            trees_data.append(tree_data)
        else:
            invalid_expressions.append(expression.strip())
    except ValueError:
        invalid_expressions.append(expression.strip())

# Guardar todos los árboles válidos en un archivo JSON
with open('./code/trees_data.json', 'w') as f:
    json.dump(trees_data, f, indent=2)

# Opcional: Guardar expresiones inválidas en un archivo de log
if invalid_expressions:
    with open('./code/invalid_expressions.log', 'w') as f:
        for expr in invalid_expressions:
            f.write(expr + '\n')