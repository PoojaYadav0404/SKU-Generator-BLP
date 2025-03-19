function SKUList() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var AllSheets = ss.getSheets()
  AllSheets.forEach(function(sheet){
    if(sheet.getName()!="SKU- Master"){
      ss.getSheetByName("SKU- Master").showSheet();

      ss.getSheetByName(sheet.getName()).hideSheet();
    }
  })
}

function CodeList() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var AllSheets = ss.getSheets()
  AllSheets.forEach(function(sheet){
    if(sheet.getName()!="Code"){
      ss.getSheetByName("Code").showSheet();
      
      ss.getSheetByName(sheet.getName()).hideSheet();
    }
  })
}

function SKUGen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var AllSheets = ss.getSheets()
  AllSheets.forEach(function(sheet){
    if(sheet.getName()!="SKU Generator"){
      ss.getSheetByName("SKU Generator").showSheet();
      
      ss.getSheetByName(sheet.getName()).hideSheet();
    }
  })
}


