function obtenirXChemin(xmlDoc,chemin) {
  return xmlDoc.evaluate(chemin, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function obtenirParametre(xmlDoc,code) {
  let node = xmlDoc.evaluate(chemin, xmlDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if(node == undefined) {
    return '';
  } else {
    return node.innerHTML;
  }
}

function etoile(qualite) {
  
}

// Ce bloc de code a pour but de récupérer le contenu de tous les inventaires et les coffres.
function extraireInfo(xmlDoc) {
  let printStr = '<table><thead><tr><th>Élément</th><th>Quantité</th><th>Commentaire</th></tr></thead><tbody>';
  let inventaireJoueur = obtenirXChemin('/SaveGame/player/items');
  for(let i = 0; i<inventaireJoueur.childElementCount; i++) {
    let item = inventaireJoueur.children[i];
    printStr += '<tr><td>'+obtenirParametre(item,'/name')+'</td><td>'+obtenirParametre(item,'/Stack')+'</td><td>'+obtenirParametre(item,'/type')+'</td></tr>';
  }
  printStr += '</tbody></table>';
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
