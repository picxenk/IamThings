function isHangul(c) {
  if (Hangul.isHangul(c) || Hangul.isCho(c)) {
    return true;
  } else {
    return false;
  }
}


function checkWebStorage() {
  if (typeof(Storage) !== "undefined") {

  } else {
    alert("Error : No Web Storage");
  }
}


function saveLocal(key, value) {
  checkWebStorage();
  localStorage.setItem(key, value);
}


function loadLocal(key) {
  checkWebStorage();
  return localStorage.getItem(key);
}


function saveTexts(sentence) {
  var otherTexts = loadTexts();
  otherTexts.push(sentence);
  saveLocal('otherTexts', JSON.stringify(otherTexts));
}


function loadTexts() {
  var otherTexts = [];
  otherTexts = JSON.parse(loadLocal('otherTexts'));
  if (otherTexts == null) otherTexts = [];
  return otherTexts;
}


function saveGoogleSheet() {
  var text = loadLocal('otherTexts');
  var d = {
    url: "https://script.google.com/macros/s/AKfycbyj-rbOazO6HmsCbeBNPfiD6AO_6sDLMzUY92R6DkeH-DtByVsh/exec",
    data: {action: 'write', sheet: 'otherTexts', texts: text },
    type: "POST",
    success: function(r) { console.log(r) },
    error: function(xhr, status, error) {}
  };
  $.ajax(d);
}


function readGoogleSheet(name) {
  var d = {
    url: "https://script.google.com/macros/s/AKfycbyj-rbOazO6HmsCbeBNPfiD6AO_6sDLMzUY92R6DkeH-DtByVsh/exec",
    data: {action: 'read', sheet: name},
    type: "POST",
    success: function(r) {
      console.log(r);
      var data = JSON.parse(r['value']);
      console.log(data);
    },
    error: function(xhr, status, error) {}
  };
  $.ajax(d);
}
