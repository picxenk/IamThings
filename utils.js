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
