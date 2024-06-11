
    //var String = "var12 = ( var / 12.12E+12 ) + 5 % ( 12.2 * 0x12A ) ;";
    //var inputString = String.split(" ");
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
            totalLines++;

            var results = pda.accept(lines[i]);

            if (!results) {
                invalidLines++;
                var currentContent = document.getElementById("automate").innerHTML;
                document.getElementById("automate").innerHTML = currentContent + "Línea " + (i + 1) + ": ERROR en: " + line + "<br>";
            }
        }
    };

    script.onerror = function () {
        document.getElementById("automate").textContent = "Error al cargar el archivo automatestack.js";
    };

    // Agregar la etiqueta script al final del body para cargar el archivo
    document.body.appendChild(script);
});
