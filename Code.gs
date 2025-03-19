
function whenEdit(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator")
  var row = ss.getActiveCell().getRow();
  var col = ss.getActiveCell().getColumn();
  if(ss.getActiveSheet().getName()=="SKU Generator" && col==3 && row ==9){
    SKUGenerate();
  }
  else if(ss.getActiveSheet().getName()=="SKU Generator" && col==3 && row >4 && row<9){
    SKUGenSheet.getRange("C11").clearContent();
  }

  else if(ss.getActiveSheet().getName()=="SKU Generator" && col==13 && row ==2){
    FatchSKUForUniqNo();
  }

  else if(ss.getActiveSheet().getName()=="SKU Generator" && col==13 && row >4 && row<10){
    SKUGenSheet.getRange("M11").clearContent();
  }
}

function SKUGenerate() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var CodeSheet = ss.getSheetByName("Code");
  
  var PartNo = SKUGenSheet.getRange("C5").getValue();
  var AlphaCodeObj = { 0: "A", 1: "B", 2: "C", 3: "D", 4: "E", 5: "F", 6: "G", 7: "H", 8: "I", 9: "J" }

  var PartNoArr = Array.from(PartNo.toString())
  var PartCode = []
  PartNoArr.forEach(function(el){
    PartCode.push(Object.values(AlphaCodeObj[el]).toString());
  })
  var PartCode = [PartCode.join("")]
  var SKUDisc = SKUGenSheet.getRange("C6:C9").getValues();
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

  var SKUMaster = ss.getSheetByName("SKU- Master")
  var UniqNo = []
  Logger.log(SKUMaster.getRange(SKUMaster.getLastRow(),9).getValue())
  if(SKUMaster.getRange(SKUMaster.getLastRow(),9).getValue()=="UNIQUE NO."){
    
    UniqNo.push([1])}
  else {UniqNo.push(parseInt(SKUMaster.getRange(SKUMaster.getLastRow(),9).getValue())+1)}

  

  var UniqCode = "0000".slice(UniqNo.toString().length)+UniqNo.toString();
  Logger.log(UniqCode.toString())
  
  PartCode.push(UniqCode.toString())

  if(PartCode.includes("")==false){
  SKUGenSheet.getRange("C10").setValue(UniqCode.toString());
  SKUGenSheet.getRange("C11").setValue(PartCode.join("-"));
  }

  else{ss.toast("SKU generator cells can not be empty please enter the data in the empty cells","Warning!!",7)}
  
}

function AddItem(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var SKUGenSheet = ss.getSheetByName("SKU Generator");
  var SKUMaster = ss.getSheetByName("SKU- Master");

  var ItemDetailArr = SKUGenSheet.getRange("C3:C11").getValues();
  var ItemDetails = [ItemDetailArr[7].toString()];
  
    ItemDetailArr.forEach(function (el) {
      ItemDetails.push(el.toString().toUpperCase());
    })
    Logger.log(ItemDetails.includes(""))
    if(ItemDetails.includes("")==false){
    SKUMaster.getRange(SKUMaster.getLastRow() + 1, 1, 1, ItemDetails.length).setValues([ItemDetails]).setBorder(true, true, true, true, true, true);
    ss.toast("New Item is successfully added","Successfull!!!",7);
    SKUGenSheet.getRange("C3:C11").clearContent();
    }
  

  else{ss.toast("SKU generator cells can not be empty please enter the data in the empty cells","Warning!!",7)}
// Logger.log(ItemDetails)
}







