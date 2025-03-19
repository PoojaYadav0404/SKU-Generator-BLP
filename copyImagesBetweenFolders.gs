function copyImagesBetweenFolders() {
  var UserId = Session.getActiveUser().getEmail();
  var SS = SpreadsheetApp.getActiveSpreadsheet();

  if(UserId==="dmm@bajato.com"){

    var Ui = SpreadsheetApp.getUi();
    var Destination = Ui.prompt("Destination Folder", "Enter Destination Folder id", Ui.ButtonSet.OK_CANCEL);
    if (Destination.getSelectedButton() === Ui.Button.OK) { 
      DResponse = Destination.getResponseText();
      var Source = Ui.prompt("Source Folder", "Enter Source Folder id", Ui.ButtonSet.OK_CANCEL);
      if (Source.getSelectedButton() === Ui.Button.OK) { 
      SResponse = Source.getResponseText();

        var sourceFolderId = SResponse;
        var destinationFolderId = DResponse;
        
        var sourceFolder = DriveApp.getFolderById(sourceFolderId);
        var destinationFolder = DriveApp.getFolderById(destinationFolderId);
        
        var files = sourceFolder.getFiles();
        
        // Loop through all the files
        while (files.hasNext()) {
          var file = files.next();
          
          // Check if the file is an image
          //if (file.getMimeType().startsWith("image/")) {
            // Make a copy of the file
            var copy = file.makeCopy(destinationFolder);
            
            // Rename the copied file in the destination folder
            copy.setName(file.getName());
          //}
        }
        SS.toast("Images copied successfully.");
      }else{SS.toast("Source folder id missing")}
    }else{SS.toast("Destination folder id missing")}
  }else{SS.toast("User Access Denied")}
  
  
}

