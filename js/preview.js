
// Función para obtener el valor del parámetro 'file' de la URL
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Obtener el nombre del archivo de la URL y mostrarlo en la página
const fileName = getParameterByName("file");
if (fileName) {
  document.getElementById("file-name").textContent = fileName;
} else {
  document.getElementById("file-name").textContent =
    "Archivo no especificado";
}

// Escuchar los mensajes enviados desde la página principal
window.addEventListener("message", function (event) {
  const fileContent = event.data;
  // Estableciendo contenido en ambos pre tags
  document.getElementById("file-content").textContent = fileContent;
  document.getElementById("file-content1").textContent = fileContent;
});