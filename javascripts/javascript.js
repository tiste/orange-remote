var ipTV = '',
    TV = {
  '0': '512',
  '1': '513',
  '2': '514',
  '3': '515',
  '4': '516',
  '5': '517',
  '6': '518',
  '7': '519',
  '8': '520',
  '9': '521',
  'info': '108',
  'ok': '352',
  'pMinus': '403',
  'pPlus': '402',
  'return': '158',
  'volMinus': '114',
  'volPlus': '115'
};

function setIpTV(i) {
  if (i !== undefined) {
    ipTV = i;

    if (localStorage) {
      localStorage['ipTV'] = ipTV;
    }
  }
}

$(function () {
  if ((localStorage && localStorage['ipTV'] === undefined) || (!localStorage)) {
    setIpTV('192.168.0.1');
  } else {
    setIpTV(localStorage['ipTV']);
  }

  $('#ipTV').val(ipTV);

  $(window).keypress(function (e) {
    var tag = e.target.tagName.toLowerCase();

    if (tag !== 'input') {
      switch (e.which) {
        case 13:
          performAction('ok');
          break;
        case 45:
          performAction('volMinus');
          break;
        case 48:
          performAction(0);
          break;
        case 49:
          performAction(1);
          break;
        case 50:
          performAction(2);
          break;
        case 51:
          performAction(3);
          break;
        case 52:
          performAction(4);
          break;
        case 53:
          performAction(5);
          break;
        case 54:
          performAction(6);
          break;
        case 55:
          performAction(7);
          break;
        case 56:
          performAction(8);
          break;
        case 57:
          performAction(9);
          break;
        case 63:
          performAction('volPlus');
          break;
        case 114:
          performAction('return');
          break;
      }
    }
  });
});

function createXHR(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  return xhr;
}

function performAction(code) {
  var xhr = createXHR('GET', 'http://' + ipTV + ':8080/remoteControl/cmd?operation=01&key=' + TV[code] + '&mode=0');
  xhr.send();
}
