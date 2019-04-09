function gatherTheData(rang1Col, rang2Col, rangRow, obj){
  //Function to gather the data across mutliple cells
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  
  //Change the row to an int, other temp vars that might be removed later
  var smolRng1 = rang1Col;
  var smolRng2 = rang2Col;
  var daRang = parseInt(rangRow, 10);
  
  //Just a double check to make sure things are good, I suppose
  Logger.log("Int form of row " + daRang);
  Logger.log("Int form of 1st col " + smolRng1);
  Logger.log("Int form of 2nd col " + smolRng2);
  
  obj.name = sheet.getRange(daRang, smolRng1).getValue();
  obj.number = sheet.getRange(daRang, smolRng2).getValue();
}

function onEdit(evt){
  //Main function that runs everything, var decs and initializations
  var preRang = evt.range;
  var rangMid = preRang.getA1Notation().indexOf(":");
  
  //Variables containing the cell locations, cols should always be 4 and 7 unless something goes really wrong
  //Need to fetch the row though
  var rang1Cha = 4;
  var rang2Cha = 7;
  var rangNum = preRang.getA1Notation().slice(1, rangMid);
  
  Logger.log("Col of first cell: " + rang1Cha);
  Logger.log("Col of second cell: " + rang2Cha);
  Logger.log("Row: " + rangNum);
  
  //object so we can grab the name and number through the func gatherTheData
  var nameAndNum = { 
    name: "",
    number: ""  
  };
  
  //get name and number, store to object
  gatherTheData(rang1Cha, rang2Cha, rangNum, nameAndNum);
  
  //confirm the function worked
  Logger.log("Name after func call: " + nameAndNum.name);
  Logger.log("Num after func call: " + nameAndNum.number);
  
  //Reformat into desired order, then add new contact
  var date = Utilities.formatDate(new Date(), "UTC+9", "yyMMdd");
  Logger.log("Ze date: " + date);
  
  var newName = nameAndNum.name + date;
  Logger.log("Name to be input: " + newName);
  
  var contact = ContactsApp.createContact(newName);
  contact.addPhone(ContactsApp.Field.CELL_PHONE, nameAndNum.number);
}
