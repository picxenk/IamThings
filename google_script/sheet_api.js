// ref : https://mashe.hawksey.info/2014/07/google-sheets-as-a-database-insert-with-apps-script-using-postget-methods-with-ajax-example/
//

var SCRIPT_PROP = PropertiesService.getScriptProperties(); // new property service

function doGet(e){
  return handleResponse(e);
}

function doPost(e){
  return handleResponse(e);
}

function handleResponse(e) {
  var lock = LockService.getPublicLock();
  lock.waitLock(30000);  // wait 30 seconds before conceding defeat.

  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));

    var sheetName = e.parameter['sheet'];
    var action = e.parameter['action'];
    var sheet = doc.getSheetByName(sheetName);
    var returnValue = 0;



    if (action == 'write') {
      var data = [];
      var texts = JSON.parse(e.parameter['texts']);
      for (var i=0; i<texts.length; i++) {
        data.push([texts[i]]);
      }

      sheet.getRange(2, 1, data.length, 1).setValues(data);
    }


    if (action == 'read') {
      var data = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues();
      var texts = [];
      for (var i=0; i<data.length; i++) {
        texts.push(data[i][0]);
      }
      var returnValue = JSON.stringify(texts);
    }


    return ContentService
    .createTextOutput(JSON.stringify({"result":"success", "action": action, "value": returnValue}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(e){
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
