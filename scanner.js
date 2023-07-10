function obtenirChemin(xmlDoc,chemin) {
  let sections = chemin.split('/');
  let NODE = xmlDoc;
  for(let s = 0; s<sections.length; s++) {
    let sect = sections[s]; let nom = sect; let num = 0;
    if(sect.indexOf('[') != -1) {
        nom = sect.slice(0,sect.indexOf('['));
        num = Number(sect.slice(sect.indexOf('[')+1, sect.indexOf(']')))-1;
    }
    let possibilites = NODE.getElementsByTagName(nom);
    if(num >= possibilites.length) { return null; }
    NODE = NODE.getElementsByTagName(nom)[num];
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
  if(qualite == '') { return ''; }
  let qte = Number(qualite);
  if(qte == 1) { return 'argent'; }
  if(qte == 2) { return 'or'; }
  if(qte == 4) { return 'iridium'; }
  if(qte == 0) { return ''; }
}

function tableau(entete,items) {
  let returnStr = '';
  returnStr += '<table><thead><tr><th colspan=3>'+entete+'</th></tr>';
  returnStr += '<tr><th>Élément</th><th>Quantité</th><th>Commentaire</th></tr></thead><tbody>';
  for(let i = 0; i<items.length; i++) {
    let item = items[i]; let nomitem = obtenirParametre(item,'name');
    if(nomitem == '') {
      returnStr += '<tr><td>'+obtenirParametre(item,'name')+'</td><td>'+obtenirParametre(item,'Stack')+'</td><td>'+etoile(obtenirParametre(item,'quality'))+'</td></tr>';
    }
  }
  returnStr += '</tbody></table>';
  return returnStr;
}

// Ce bloc de code a pour but de récupérer le contenu de tous les inventaires et les coffres.
function extraireInfo(xmlDoc) {
  let printStr;
  
  // Inventaire du joueur principal.
  printStr += tableau('Inventaire de '+obtenirParametre(xmlDoc,'SaveGame/player/name'), obtenirChemin(xmlDoc,'SaveGame/player/items'));
  
  // Inventaire des farmhands.
  let farmhands = xmlDoc.getElementsByTagName('farmhand');
  if(farmhands.length > 0) {
    for(let j = 0; j<farmhands.length; j++) {
      printStr += tableau('Inventaire de '+obtenirParametre(farmhands[j],'name'), obtenirChemin(farmhands[j],'items'));
    }
  }

  // Parcours des coffres.
  let locations = obtenirChemin(xmlDoc,'SaveGame/locations').getElementsByTagName('GameLocation');
  for(let L = 0; L<locations.length; L++) {
    let GameLoc = locations[L]; let type = GameLoc.getAttribute('xsi:type');
    // Là où vivent les colocataires.
    if(type == "Farm") {
      let Batiments = obtenirChemin(GameLoc,'buildings').getElementsByTagName('Building');
      for(let B = 0; B<Batiments.length; B++) {
        let Bat = Batiments[B];
        if(obtenirParametre(Bat,'indoors/farmhand/name') == '') { continue; }
        let Objets = Bat.getElementsByTagName('Object');
        for(let O = 0; O<Objets.length; O++) {
          if(Objets[O].getAttribute('xsi:type') == 'Chest') {
            printStr += tableau('Coffre ('+obtenirParametre(Bat,'indoors/farmhand/name')+')', obtenirChemin(Objets[O],'items'));
          }
        }
      }
    } // La maison de base.
    else if(type == "FarmHouse") {
      let items = obtenirChemin(GameLoc,'objects').getElementsByTagName('item');
      for(let I = 0; I<items.length; I++) {
        if(obtenirChemin(items[I],'value/Object').getAttribute('xsi:type') == 'Chest') {
          let Chest = obtenirChemin(items[I],'value/Object');
          printStr += tableau('Coffre ('+obtenirParametre(xmlDoc,'SaveGame/player/name')+')', obtenirChemin(Chest,'items'));
        }
      }
    } // Tout le reste.
    else {
      let AllObjects = GameLoc.getElementsByTagName('Object');
      for(let a = 0; a<AllObjects.length; a++) {
        if(AllObjects[a].getAttribute('xsi:type') == 'Chest') {
          printStr += tableau('Coffre', obtenirChemin(AllObjects[a],'items'));
        }
      }
    }
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
