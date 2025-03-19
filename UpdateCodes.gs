function setDropdown() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var CodeSheet = ss.getSheetByName("Code");
  var Row = SKUGenSheet.getActiveCell().getRow();
  var Col = SKUGenSheet.getActiveCell().getColumn();

  if(ss.getActiveSheet().getName()=="SKU Generator" && Col==7 && Row == 9 && SKUGenSheet.getRange("G9").getValue()=="CATEGORY"){
    SKUGenSheet.getRange("H9").setDataValidation(SpreadsheetApp.newDataValidation().setAllowInvalid(false).setHelpText("Not a valid Selection").requireValueInRange(CodeSheet.getRange("A2:A"),true).build())
    ss.toast("","Dropdown Set",5)
  }

  else if(ss.getActiveSheet().getName()=="SKU Generator" && Col==7 && Row == 9 && SKUGenSheet.getRange("G9").getValue()=="QUALITY"){
    SKUGenSheet.getRange("H9").setDataValidation(SpreadsheetApp.newDataValidation().setAllowInvalid(false).setHelpText("Not a valid Selection").requireValueInRange(CodeSheet.getRange("E2:E"),true).build())
    ss.toast("","Dropdown Set",5)
  }

  else if(ss.getActiveSheet().getName()=="SKU Generator" && Col==7 && Row == 9 && SKUGenSheet.getRange("G9").getValue()=="COLOR"){
    SKUGenSheet.getRange("H9").setDataValidation(SpreadsheetApp.newDataValidation().setAllowInvalid(false).setHelpText("Not a valid Selection").requireValueInRange(CodeSheet.getRange("H2:H"),true).build())
    ss.toast("","Dropdown Set",5)
  }

  else if(ss.getActiveSheet().getName()=="SKU Generator" && Col==7 && Row == 9 && SKUGenSheet.getRange("G9").getValue()=="VENDOR NAME"){
    SKUGenSheet.getRange("H9").setDataValidation(SpreadsheetApp.newDataValidation().setAllowInvalid(false).setHelpText("Not a valid Selection").requireValueInRange(CodeSheet.getRange("K2:K"),true).build())
    ss.toast("","Dropdown Set",5)
  }

  else if(ss.getActiveSheet().getName()=="SKU Generator" && Col==8 && Row == 9 ){
    if(SKUGenSheet.getRange(9,7).getValue()=="CATEGORY"){
      var CatCodeArr = CodeSheet.getRange(2,1,CodeSheet.getRange("A1").getDataRegion().getLastRow(),2).getValues();
      CatCodeArr.forEach(function(el){
        if(el[0]==SKUGenSheet.getRange(9,8).getValue()){
          SKUGenSheet.getRange(9,9,2,1).setValue(el[1]);
        }
      })
    }

    else if(SKUGenSheet.getRange(9,7).getValue()=="QUALITY"){
      var QualCodeArr = CodeSheet.getRange(2,5,CodeSheet.getRange("E1").getDataRegion().getLastRow(),2).getValues();
      QualCodeArr.forEach(function(el){
        if(el[0]==SKUGenSheet.getRange(9,8).getValue()){
          SKUGenSheet.getRange(9,9,2,1).setValue(el[1]);
        }
      })
    }

    else if(SKUGenSheet.getRange(9,7).getValue()=="COLOR"){
      var ColCodeArr = CodeSheet.getRange(2,8,CodeSheet.getRange("H1").getDataRegion().getLastRow(),2).getValues();
      ColCodeArr.forEach(function(el){
        if(el[0]==SKUGenSheet.getRange(9,8).getValue()){
          SKUGenSheet.getRange(9,9,2,1).setValue(el[1]);
        }
      })
    }

    else if(SKUGenSheet.getRange(9,7).getValue()=="VENDOR NAME"){
      var VenCodeArr = CodeSheet.getRange(2,11,CodeSheet.getRange("K1").getDataRegion().getLastRow(),2).getValues();
      VenCodeArr.forEach(function(el){
        if(el[0]==SKUGenSheet.getRange(9,8).getValue()){
          SKUGenSheet.getRange(9,9,2,1).setValue(el[1]);
        }
      })
    }
  }


}


function UpdateCode(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var CodeSheet = ss.getSheetByName("Code");
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var CodesArr = CodeSheet.getRange(2,1,CodeSheet.getLastRow()-1,CodeSheet.getLastColumn()).getValues();
  var UpdateArr = SKUGenSheet.getRange("H9:I10").getValues();

  if (UpdateArr[0][0] != "" && UpdateArr[0][1] !== "" && UpdateArr[1][0] !== "" && UpdateArr[1][1] !== "") {

    CodesArr.forEach(function (Row, i) {

      Row.forEach(function (Value, j) {
        var PreVal = SKUGenSheet.getRange("H9").getValue();
        if (Value == PreVal) {
          CodesArr[i][j] = SKUGenSheet.getRange("H10").getValue().toLocaleString().toUpperCase();
          CodesArr[i][j + 1] = SKUGenSheet.getRange("I10").getValue().toLocaleString().toUpperCase();

        }
      })
    })
    CodeSheet.getRange(2, 1, CodesArr.length, CodeSheet.getLastColumn()).setValues(CodesArr)
    UpdateSKUList();
    ss.toast("Code Updated Successfully","Successfull!!",5);

  }
  else (ss.toast("Update Cells can not be empty Please Fill the details first","Warning!!",7))
}

function UpdateSKUList(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var SKUList = ss.getSheetByName("SKU- Master");
  var SKUListArr = SKUList.getRange(2,1,SKUList.getLastRow()-1,SKUList.getLastColumn()).getValues();
  var PreValArr = SKUGenSheet.getRange("H9:I10").getValues();
  // Logger.log(SKUListArr[1])
  // Logger.log(SKUListArr[1][9].replace(PreValArr[0][1],PreValArr[1][1]))
  var SKUVal = []
  SKUListArr.forEach(function (Row,i){
      // SKUVal.push([Row[9].replace(PreValArr[0][1],PreValArr[1][1])])
    Row.forEach(function(Value,j){
      if(PreValArr[0][0]== Value){
        SKUListArr[i][j]= PreValArr[1][0].toLocaleString().toUpperCase();
        // SKUListArr[i][9].replace(PreValArr[0][1],PreValArr[1][1])
      }
    })
  })
  SKUList.getRange(2,1,SKUListArr.length,SKUList.getLastColumn()).setValues(SKUListArr);
  UpdateSKULastCode()
  // SKUList.getRange(2,10,SKUVal.length,1).setValues(SKUVal);
}

function UpdateSKULastCode(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUList = ss.getSheetByName("SKU- Master");
  var CodeSheet = ss.getSheetByName("Code");
  
  var Formula = '=ArrayFormula(ifNa(VLOOKUP(E2:E,Code!A:B,2,0)&'+'"-"'+'& VLOOKUP(F2:F,Code!D:E,2,0)&'+'"-"'+'& VLOOKUP(G2:G,Code!G:H,2,0)&'+'"-"'+'& VLOOKUP(H2:H,Code!J:K,2,0)&'+'"-"'+'&I2:I,""))'
  SKUList.getRange(2,10,SKUList.getLastRow()-1,1).clearContent()
  SKUList.getRange(2,10).setValue(Formula); 
  SKUList.getRange(2,10,SKUList.getRange("A2").getDataRegion().getLastRow()-1,1).copyTo(SKUList.getRange(2,10,SKUList.getRange("A2").getDataRegion().getLastRow(),1),SpreadsheetApp.CopyPasteType.PASTE_VALUES,false);
  
  var PartNoArr = SKUList.getRange(2,4,SKUList.getLastRow()-1,1).getValues();
  var AlphaCodeObj = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G", 7: "H", 8: "I", 9: "J" }
  var PartNoNew = []

  PartNoArr.forEach(function (PartNo,i){
    var AlphaPartCode = []
    Array.from("000".slice(PartNo.toString().length)+PartNo.toLocaleString()).forEach(function (el){
      AlphaPartCode.push(Object.values(AlphaCodeObj[el]).toString())
    });
    AlphaPartCode= AlphaPartCode.join("")
    PartNoNew.push([AlphaPartCode])
    // Logger.log(AlphaPartCode)
  })
  
  var FormulaSKU = SKUList.getRange(2,10,SKUList.getLastRow()-1,1).getValues();
  var FullCode = []
  PartNoNew.forEach(function(el,i){
    // Logger.log(el)
    FullCode.push([el.toString()+"-"+FormulaSKU[i].toLocaleString()])
  })
  SKUList.getRange(2,10,FullCode.length,1).setValues(FullCode);

  ss.getSheetByName("SKU Generator").getRange("H9:I10").clearContent();

  ss.toast("Item Code Updated Successfully","Successfull",5)
}

function FatchSKUForUniqNo(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var SKUList = ss.getSheetByName("SKU- Master");
  var SKUToSearch = SKUGenSheet.getRange("M2").getValue();
  var SKUListArr = SKUList.getRange(2,2,SKUList.getLastRow()-1,SKUList.getLastColumn()-1).getValues();
  var SKURow = []
  if(SKUToSearch!=""){
  SKUListArr.forEach(function(row,i){
    if(row[7]==SKUToSearch){
      row.forEach(function(el){
        SKURow.push([el])
      })
    }
  })
  SKUGenSheet.getRange(3,13,SKURow.length,1).setValues(SKURow);
  }
  
  else if(SKUToSearch==""){
    SKUGenSheet.getRange(3,13,9,1).clearContent()
  }
}

function RefreshSKUUpdate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var CodeSheet = ss.getSheetByName("Code");

  
  
  var PartNo = SKUGenSheet.getRange("M5").getValue();
  var AlphaCodeObj = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G", 7: "H", 8: "I", 9: "J" }

  var PartNoArr = Array.from(PartNo.toString())
  var PartCode = []
  PartNoArr.forEach(function(el){
    PartCode.push(Object.values(AlphaCodeObj[el]).toString());
  })
  var PartCode = [PartCode.join("")]
  var SKUDisc = SKUGenSheet.getRange("M6:M9").getValues();
  var CatCodeArr = CodeSheet.getRange(2, 1, CodeSheet.getRange("A1").getDataRegion().getLastRow() - 1, 2).getValues();

  CatCodeArr.forEach(function (el) {
    if (el[0] == SKUDisc[0]) {
      PartCode.push(el[1])
    }
  })

  
  var QuaCodeArray = CodeSheet.getRange(2,5,CodeSheet.getRange("E2").getDataRegion().getLastRow()-1,2).getValues();

  QuaCodeArray.forEach(function(el){
    if(el[0]==SKUDisc[1]){
    PartCode.push(el[1]);
    }
  })

  var ColCodeArray = CodeSheet.getRange(2,8,CodeSheet.getRange("H2").getDataRegion().getLastRow()-1,2).getValues();

  ColCodeArray.forEach(function(el){
    if(el[0]==SKUDisc[2]){
    PartCode.push(el[1]);
    }
  })

  var VenCodeArray = CodeSheet.getRange(2,11,CodeSheet.getRange("K2").getDataRegion().getLastRow()-1,2).getValues();

  VenCodeArray.forEach(function(el){
    if(el[0]==SKUDisc[3]){
    PartCode.push(el[1]);
    }
  })

  // var SKUMaster = ss.getSheetByName("SKU- Master")
  var UniqNo = SKUGenSheet.getRange("M10").getValue();
  var UniqCode = "0000".slice(UniqNo.toString().length)+UniqNo.toString();
  // Logger.log(UniqCode.toString())
  
  PartCode.push(UniqCode.toString())
  
  // SKUGenSheet.getRange("C10").setValue(UniqCode.toString());
 if(PartCode.includes("")==false){
  SKUGenSheet.getRange("M11").setValue(PartCode.join("-"));
 }
 else{ss.toast("SKU Update cells can not be empty please enter the data in the empty cells","Warning!!",7)}
  
}

function updateOldSKU(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var SKUMaster = ss.getSheetByName("SKU- Master");

  var ItemDetailArr = SKUGenSheet.getRange("M3:M11").getValues();
  var ItemDetails = [ItemDetailArr[7].toString()];
  
    ItemDetailArr.forEach(function (el) {
      ItemDetails.push(el.toString().toUpperCase());
    })
    Logger.log(ItemDetails)
    if(ItemDetails.includes("")==false){
    var SKUListArr = SKUMaster.getRange(2,1,SKUMaster.getLastRow()-1,SKUMaster.getLastColumn()).getValues();
    SKUListArr.forEach(function(Row,i){
      if(Row[8]==ItemDetails[8]){
        ItemDetails.shift();
        SKUMaster.getRange(i+2,2,[ItemDetails].length,ItemDetails.length).setValues([ItemDetails]);
      }
    })

    SKUGenSheet.getRange("M2:M11").clearContent();
    ss.toast("New Item is successfully added","Successfull!!!",7);
    
    }
  

  else{ss.toast("SKU Update cells can not be empty please enter the data in the empty cells","Warning!!",7)}
}


// function inHouseCode(){
//   var ss = SpreadsheetApp.getActiveSpreadsheet();
//   var SKUList = ss.getSheetByName("SKU- Master");
//   var CodeSheet = ss.getSheetByName("Code");
//   var InhouseCode = SKUList.getRange(2,4,SKUList.getLastRow()-1,1).getValues();
//   var CorrectCode = []

//   InhouseCode.forEach(function(el){
//     CorrectCode.push(["000".slice(el.toLocaleString().length).toString()+el.toLocaleString()])
//   })
  
//   SKUList.getRange(2,4,CorrectCode.length,1).setValues(CorrectCode);

// }




