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


// key : otherTexts, MLTexts
function resetTexts(key, sentences) {
  var texts = [];
  for (var i=0; i<sentences.length; i++) {
    if (sentences[i] != "") {
      texts.push(sentences[i]);
    }
  }
  saveLocal(key, JSON.stringify(texts));
}


function saveTexts(key, sentence) {
  var texts = loadTexts(key);
  texts.push(sentence);
  saveLocal(key, JSON.stringify(texts));
}


function loadTexts(key) {
  var texts = [];
  texts = JSON.parse(loadLocal(key));
  if (texts == null) texts = [];
  return texts;
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
      // console.log(data);
      if (name == 'otherTextsNew') name = 'otherTexts';
      resetTexts(name, data);
    },
    error: function(xhr, status, error) {}
  };
  $.ajax(d);
}
