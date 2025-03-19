function addCode() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var CodeSheet = ss.getSheetByName("Code");
  var Row = SKUGenSheet.getActiveCell().getRow();
  var Col = SKUGenSheet.getActiveCell().getColumn();
  if (ss.getActiveSheet().getName() == "SKU Generator" && Col == 8 && Row == 5) {
    var NewQuaCodeNo = CodeSheet.getRange(CodeSheet.getRange("D1").getDataRegion().getLastRow(), 5).getRowIndex();
    var Codelen = "000".slice([NewQuaCodeNo].toString().length) + NewQuaCodeNo.toString();
    var FullCode = "Q" + Codelen
    SKUGenSheet.getRange("I5").setValue(FullCode);
    // Logger.log(FullCode)
  }
  else if (ss.getActiveSheet().getName() == "SKU Generator" && Col == 8 && Row == 6) {
    var NewColCodeNo = CodeSheet.getRange(CodeSheet.getRange("G1").getDataRegion().getLastRow(), 8).getRowIndex();
    var Codelen = "00".slice([NewColCodeNo].toString().length) + NewColCodeNo.toString();
    var FullCode = "C" + Codelen
    SKUGenSheet.getRange("I6").setValue(FullCode);
    // Logger.log(FullCode)
  }

  else if (ss.getActiveSheet().getName() == "SKU Generator" && Col == 8 && Row == 7) {
    var NewVenCodeNo = CodeSheet.getRange(CodeSheet.getRange("J1").getDataRegion().getLastRow(), 11).getRowIndex();
    var Codelen = "000".slice([NewVenCodeNo].toString().length) + NewVenCodeNo.toString();
    var FullCode = "V" + Codelen
    SKUGenSheet.getRange("I7").setValue(FullCode);
    // Logger.log(FullCode)
  }
}

function AddCat() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var CodeSheet = ss.getSheetByName("Code");
  var NewCatCodeRow = SKUGenSheet.getRange("H4:I4").getValues();
  var NewCatCode = [[NewCatCodeRow[0][0].toLocaleString().toUpperCase(), NewCatCodeRow[0][1].toLocaleString().toUpperCase()]]

  if (NewCatCodeRow[0].includes("") == false) {

    CodeSheet.getRange(CodeSheet.getRange("A1").getDataRegion().getLastRow() + 1, 1, 1, NewCatCode[0].length).setValues(NewCatCode)
    SKUGenSheet.getRange("H4:I4").clearContent();
    ss.toast("Category code added successfully", "Successfull!!!", 5);
  }
  else { ss.toast("Category cells are empty", "Warning!!", 7) }

}

function AddQua() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var CodeSheet = ss.getSheetByName("Code");
  var NewQuaCodeRow = SKUGenSheet.getRange("H5:I5").getValues();
  var NewQuaCode = [[NewQuaCodeRow[0][0].toLocaleString().toUpperCase(), NewQuaCodeRow[0][1].toLocaleString().toUpperCase()]]
  if (NewQuaCodeRow[0].includes("") == false) {

    CodeSheet.getRange(CodeSheet.getRange("D1").getDataRegion().getLastRow() + 1, 4, 1, NewQuaCode[0].length).setValues(NewQuaCode)
    SKUGenSheet.getRange("H5:I5").clearContent();
    ss.toast("Quality added successfully", "Successfull!!!", 5);
  }
  else { ss.toast("Quality code cells are empty", "Warning!!", 7) }
}

function AddCol() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var CodeSheet = ss.getSheetByName("Code");
  var NewColCodeRow = SKUGenSheet.getRange("H6:I6").getValues();
  var NewColCode = [[NewColCodeRow[0][0].toLocaleString().toUpperCase(), NewColCodeRow[0][1].toLocaleString().toUpperCase()]]

  if (NewColCodeRow[0].includes("") == false) {

    CodeSheet.getRange(CodeSheet.getRange("G1").getDataRegion().getLastRow() + 1, 7, 1, NewColCode[0].length).setValues(NewColCode)
    SKUGenSheet.getRange("H6:I6").clearContent();
    ss.toast("Color code added successfully", "Successfull!!!", 5);
  }
  else { ss.toast("Color cells are empty", "Warning!!", 7) }
}

function AddVen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var CodeSheet = ss.getSheetByName("Code");
  var NewVenCodeRow = SKUGenSheet.getRange("H7:I7").getValues();
  var NewVenCode = [[NewVenCodeRow[0][0].toLocaleString().toUpperCase(), NewVenCodeRow[0][1].toLocaleString().toUpperCase()]]
  if (NewVenCodeRow[0].includes("") == false) {

    CodeSheet.getRange(CodeSheet.getRange("J1").getDataRegion().getLastRow() + 1, 10, 1, NewVenCode[0].length).setValues(NewVenCode)
    SKUGenSheet.getRange("H7:I7").clearContent();
    ss.toast("Vendor added successfully", "Successfull!!!", 5);
  }
  else { ss.toast("Vendor code cells are empty", "Warning!!", 7) }
}







