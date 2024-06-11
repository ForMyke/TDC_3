document.getElementById("analyze").addEventListener("click", function () {

const fileContent = document.getElementById("file-content").textContent;

var lines = fileContent.split("\n");
const script = document.createElement("script");

script.src = "./js/AutomateStack.js";

script.onload = function () {

    document.getElementById("automate").textContent = "";

    var totalLines = 0;
    var invalidLines = 0;
    const pda = new PDA();

    for (let i = 0; i < lines.length; i++) {


        // var String = "var12 = ( var / 12.12E+12 ) + 5 % ( 12.2 * 0x12A ) ;";
        // var inputString = String.split(" ");
        // console.log(pda.accept(inputString));
        var line = lines[i].split(" ");

        if (line.length === 0) {
            i++
        }

        totalLines++;


        let results = pda.accept(line);


        if (results === false) {
            invalidLines++;
            document.getElementById("automate").textContent += `Linea ${i + 1}: ${lines[i]}\n`;
        }

};

};


document.head.appendChild(script); // Asegúrate de añadir esta línea


});
