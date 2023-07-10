function extraireInfo(xmlDoc) {
  let farmhands = xmlDoc.getElementsByTagName('farmhand');
  console.log(xmlDoc, xmlDoc.getElementsByTagName('farmhand'));
  //let jsobj = {farmhands:[]};
  let printStr = '<b>Farmhands</b> : ';
  if(farmhands.length == 0) { printStr += '<i>none</i>'; }
  for(let i = 0; i<farmhands.length; i++) {
    printStr += ' '+farmhands[i].getElementsByTagName('name')[0].innerText+(i+1 == farmhands.length ? '' : ',');
  }
  printStr += '<br>';
  return {printversion:printStr};
}
