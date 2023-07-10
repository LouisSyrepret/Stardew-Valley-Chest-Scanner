// Afficher info.
function info(text) {
  document.getElementById('output_info').innerHTML += text+'<br>;
}

// Gets the save file.
function handleFileSelect(evt) {
  let file = evt.target.files[0];
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    info(xhr.responseXML.documentElement.nodeName);
  };
  xhr.open("GET", file);
  xhr.responseType = "document";
  xhr.send();
}
document.getElementById('savefileinput').addEventListener('change', handleFileSelect, false);
