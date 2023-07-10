// Gets the save file.
function handleFileSelect(evt) {
  let file = evt.target.files[0], reader = new FileReader();
  reader.onload = function (e) {
    let output = "", xmlDoc = $.parseXML(e.target.result);
    let farmhands = xmlDoc.getElementsByTagName("farmhand");
    for(let i = 0; i<farmhands.length; i++) {
      document.getElementById('output_info').innerHTML += "Farmhand : "+farmhands[i].getElementsByTagName("name")[0].innerText+'<br>';
    }
  };
  reader.readAsText(file);
}
document.getElementById('savefileinput').addEventListener('change', handleFileSelect, false);
