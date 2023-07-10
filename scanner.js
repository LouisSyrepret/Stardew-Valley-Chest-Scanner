function obtenirChemin(xmlDoc,chemin) {
  let sections = chemin.split('/');
  let NODE = xmlDoc;
  for(let s = 0; s<sections.length; s++) {
    let sect = sections[s]; let nom = sect; let num = 0;
    if(sect.indexOf('[') != -1) {
        nom = sect.slice(0,sect.indexOf('['));
        num = sect.slice(sect.indexOf('[')+1, sect.indexOf(']'));
    }
    let possibilites = NODE.getElementsByTagName(nom);
    if(num >= possibilites.length) { return null; }
    NODE = NODE.getElementsByTagName(nom)[num-1];
  }
  return NODE;
}

function obtenirParametre(xmlDoc,code) {
  let node = obtenirChemin(xmlDoc,code);
  if(node == null) {
    return '';
  } else {
    return node.innerHTML;
  }
}

function etoile(qualite) {
  if(qte == '') { return ''; }
  let qte = Number(qualite);
  if(qte == 1) { return 'argent'; }
  if(qte == 2) { return 'or'; }
  if(qte == 4) { return 'iridium'; }
  if(qte == 0) { return ''; }
}

// Ce bloc de code a pour but de récupérer le contenu de tous les inventaires et les coffres.
function extraireInfo(xmlDoc) {
  // Inventaire du joueur principal.
  let printStr = '<table><thead><tr><th colspan=3>Inventaire de '+obtenirChemin(xmlDoc,'SaveGame/player/name')+'</th></tr>';
  printStr += '<tr><th>Élément</th><th>Quantité</th><th>Commentaire</th></tr></thead><tbody>';
  let inventaireJoueur = obtenirChemin(xmlDoc,'SaveGame/player/items');
  for(let i = 0; i<inventaireJoueur.childElementCount; i++) {
    let item = inventaireJoueur.children[i];
    printStr += '<tr><td>'+obtenirParametre(item,'name')+'</td><td>'+obtenirParametre(item,'Stack')+'</td><td>'+etoile(obtenirParametre(item,'quality'))+'</td></tr>';
  }
  printStr += '</tbody></table>';
  // Inventaire des farmhands.
  let farmhands = xmlDoc.getElementsByTagName('farmhand');
  if(farmhands.length > 0) {
    printStr += '<table><thead><tr><th colspan=3>Inventaire de '+obtenirChemin(farmhands[i],'name')+'</th></tr>';
    printStr += '<tr><th>Élément</th><th>Quantité</th><th>Commentaire</th></tr></thead><tbody>';
    let inventaireJoueur = obtenirChemin(farmhands[i],'items');
    for(let i = 0; i<inventaireJoueur.childElementCount; i++) {
      let item = inventaireJoueur.children[i];
      printStr += '<tr><td>'+obtenirParametre(item,'name')+'</td><td>'+obtenirParametre(item,'Stack')+'</td><td>'+etoile(obtenirParametre(item,'quality'))+'</td></tr>';
    }
    printStr += '</tbody></table>';
  }
  return {printversion:printStr};
}

// Ancienne version, au cas où.
/* function extraireInfo(xmlDoc) {
  let farmhands = xmlDoc.getElementsByTagName('farmhand');
  console.log(xmlDoc, xmlDoc.getElementsByTagName('farmhand'));
  //let jsobj = {farmhands:[]};
  let printStr = '<b>Farmhands</b> : ';
  if(farmhands.length == 0) { printStr += '<i>aucun</i>'; }
  for(let i = 0; i<farmhands.length; i++) {
    printStr += ' '+farmhands[i].getElementsByTagName('name')[0].innerHTML+(i+1 == farmhands.length ? '' : ',');
  }
  printStr += '<br>';
  return {printversion:printStr};
} */
