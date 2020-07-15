'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/kekstagram/data';

  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    var onError = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; color: black; width: 582px; vertical-align: middle; margin: 0 auto; padding: 20px;text-align: center; background-color: #fa8072;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '26px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.open('GET', URL);
    xhr.send();
  };
})();
