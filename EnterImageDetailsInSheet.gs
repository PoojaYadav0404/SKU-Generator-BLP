function getFoldersSKU() {
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  //var ActiveSheet = SS.getActiveSheet().getName();
  var UserId = Session.getActiveUser().getEmail();

  if(UserId==="dmm@bajato.com" ){
    var FolderSheet = SS.getSheetByName("Folders");
    var FolderDetails = FolderSheet.getRange(2, 1, FolderSheet.getLastRow()-1, 3).getValues();

    FolderDetails.forEach(function(r){
      if(r[0]!=""){
        Logger.log("folder name- " + r[0] + ", folder id- " + r[2]);
        return getImageDetailsInSheet(r[2]);

      }
    })  

  } else{
    SS.toast("Either Wrong Sheet or Access Denied.", "Error :(");
  }
  
}


function getImageDetailsInSheet(folderId) {
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  var Sheet = SS.getSheetByName("SKU- Master");
  //var folderId = '1LgE1RwIyjkwigpWShwPUgbVxcUEA_NFu';
  var folderLink = "https://drive.google.com/drive/folders/" + folderId ;
  
  
  var destinationFolder = DriveApp.getFolderById(folderId);
  
  var files = destinationFolder.getFiles();
  
  // Loop through all the files
  while (files.hasNext()) {
    var file = files.next();
    
    // Check if the file is an image
    if (file.getMimeType().startsWith("image/")) {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      // Make a copy of the file
      var fileName = file.getName();
      var uniqueFileName = fileName.split(".")[0];
      SS.toast(fileName);
      //Logger.log(uniqueFileName);
      var fileId = file.getId();
      var fileLink = `https://drive.google.com/uc?export=view&id=` + fileId;
      var owner = file.getOwner().getEmail();
      
      var UniqueArr = (!Sheet.getLastRow() < 1) ? Sheet.getRange(2, 9, Sheet.getLastRow() - 1, 1).getValues().map(unique => { return unique.toString() }) : [];
      var Row = UniqueArr.indexOf(uniqueFileName.toString()) + 2;
      //Logger.log(Row)
      Sheet.getRange(Row, 11).setValue(folderLink);
      Sheet.getRange(Row, 12).setValue(`=image("${fileLink}")`);
      Sheet.getRange(Row, 13).setValue(fileLink); 
      Sheet.getRange(Row,14).setValue(fileName); 
      Sheet.getRange(Row, 15).setValue(owner);
      
      
    }
  }
  
  Logger.log("Images details added successfully.");
}













